// Vrai si le HTML d'un éditeur de texte riche contient du texte (et pas seulement des balises vides).
export function hasRichTextContent(richText) {
    if (!richText) {
        return false;
    }

    return richText.replace(/<[^>]*>/g, '').trim().length > 0;
}
