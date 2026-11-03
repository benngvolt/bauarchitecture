/*
Migration ponctuelle : reprend le CV (texte de la page À propos) et les liens amis, et en fait deux « objets »
du cabinet de curiosités, chacun avec une photo prise dans les assets du front.

Utilisation (Node 18 ou plus), une fois le backend déployé :
    node scripts/seedCuriosities.js https://bauapi.bengibert.com
    node scripts/seedCuriosities.js http://localhost:4000

Passe par l'API publique (comme le tableau de bord) : l'image est donc traitée et rangée par le serveur.
Sans danger si on le relance : un objet qui existe déjà (même nom) n'est pas recréé. Rien n'est supprimé
(le texte du CV et les liens amis restent en base).
*/

const fs = require('fs');
const path = require('path');

const API_URL = (process.argv[2] || 'http://localhost:4000').replace(/\/$/, '');
const ASSETS = path.join(__dirname, '../../frontend/src/assets');

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Le CV a été écrit avec une ancienne barre d'outils (titres h5/h6, paragraphes) ; l'éditeur du tableau de bord ne connaît
// que gras, italique, titre (h1), liste et lien. On convertit pour que le texte reste intact après une modification.
function cvToEditorHtml(html) {
  return html
    .replace(/<h5>([\s\S]*?)<\/h5>/g, '<h1>$1</h1>')
    .replace(/<h6>([\s\S]*?)<\/h6>\s*<p>([\s\S]*?)<\/p>/g, '<strong>$1</strong><br>$2')
    .replace(/<h6>([\s\S]*?)<\/h6>/g, '<strong>$1</strong>')
    .replace(/<a[^>]*href=""[^>]*>([\s\S]*?)<\/a>/g, '$1')
    .replace(/<a[^>]*>\s*<p>([\s\S]*?)<\/p>\s*<\/a>/g, (match) => {
      const href = match.match(/href="([^"]*)"/)?.[1];
      const label = match.replace(/<[^>]*>/g, (tag) => (tag === '<strong>' || tag === '</strong>' ? tag : '')).trim();
      return href ? `<br><a href="${href}">${label}</a>` : label;
    })
    .replace(/<a[^>]*href="([^"]+)"[^>]*>/g, '<a href="$1">')
    .replace(/<p>([\s\S]*?)<\/p>/g, '<div>$1</div>')
    .replace(/>\s*\n\s*</g, '><')
    .trim();
}

function friendUrlsToEditorHtml(friendUrls) {
  const items = friendUrls
    .map((friendUrl) => `<li><a href="${escapeHtml(friendUrl.itemUrl)}">${escapeHtml(friendUrl.itemName)}</a></li>`)
    .join('');

  return `<h1>Liens amis</h1><ul>${items}</ul>`;
}

async function getJson(route) {
  const response = await fetch(`${API_URL}${route}`);
  if (!response.ok) {
    throw new Error(`GET ${route} : erreur ${response.status}`);
  }
  return response.json();
}

async function createObject({ name, richText, imageFile }) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('richText', richText);
  formData.append('object', new Blob([fs.readFileSync(path.join(ASSETS, imageFile))], { type: 'image/png' }), imageFile);

  const response = await fetch(`${API_URL}/api/curiosity-items`, { method: 'POST', body: formData });
  if (!response.ok) {
    throw new Error(`Création de « ${name} » : erreur ${response.status} ${await response.text()}`);
  }
  console.log(`Objet créé : ${name}`);
}

async function main() {
  console.log(`API : ${API_URL}`);

  const existingItems = await getJson('/api/curiosity-items');
  const existingNames = existingItems.map((item) => item.name);

  if (!existingNames.includes('CV')) {
    const aboutPageContent = await getJson('/api/about-page-content');

    if (aboutPageContent.curriculumText) {
      await createObject({
        name: 'CV',
        richText: cvToEditorHtml(aboutPageContent.curriculumText),
        imageFile: 'collaboratrice.png',
      });
    } else {
      console.log('Pas de texte de CV en base : objet « CV » non créé.');
    }
  } else {
    console.log('Objet « CV » déjà présent : ignoré.');
  }

  if (!existingNames.includes('Liens amis')) {
    const friendUrls = await getJson('/api/friend-urls');

    if (friendUrls.length > 0) {
      await createObject({
        name: 'Liens amis',
        richText: friendUrlsToEditorHtml(friendUrls),
        imageFile: 'potes.png',
      });
    } else {
      console.log('Aucun lien ami en base : objet « Liens amis » non créé.');
    }
  } else {
    console.log('Objet « Liens amis » déjà présent : ignoré.');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
