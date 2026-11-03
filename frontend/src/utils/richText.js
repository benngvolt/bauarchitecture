import DOMPurify from 'dompurify';

// Vrai si le HTML d'un éditeur de texte riche contient du texte (et pas seulement des balises vides).
export function hasRichTextContent(richText) {
    if (!richText) {
        return false;
    }

    return richText.replace(/<[^>]*>/g, '').trim().length > 0;
}

// Nettoie le HTML d'un éditeur de texte riche pour l'afficher, en ouvrant les liens dans un nouvel onglet.
export function sanitizeRichTextWithLinks(richText) {
    const openLinksInNewTab = (node) => {
        if (node.tagName === 'A' && node.getAttribute('href')) {
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
        }
    };

    DOMPurify.addHook('afterSanitizeAttributes', openLinksInNewTab);
    try {
        return DOMPurify.sanitize(richText || '', { ADD_ATTR: ['target'] });
    } finally {
        DOMPurify.removeHook('afterSanitizeAttributes', openLinksInNewTab);
    }
}
