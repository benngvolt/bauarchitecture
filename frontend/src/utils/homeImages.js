// Image pleine largeur de la page d'accueil : tant qu'aucune image n'est choisie en backoffice,
// on affiche une autre photo du projet « Rue de la Ré » que celle du hero (qui prend l'image principale).
const DEFAULT_BANNER_PROJECT = /rue de la r[ée]/i;

export function getDefaultBannerImage(projects) {
    const project = projects?.find((candidate) => DEFAULT_BANNER_PROJECT.test(candidate.title || ''))
        || projects?.[0];

    const images = project?.images || [];
    const image = images.find((_, index) => index !== project.mainImageIndex) || images[0];

    return image?.imageUrl
        ? { imageUrl: image.imageUrl, projectTitle: project.title }
        : null;
}
