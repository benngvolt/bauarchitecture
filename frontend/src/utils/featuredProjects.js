// Nombre de projets mis en avant sur la page d'accueil.
export const FEATURED_PROJECTS_COUNT = 3;

// Projets affichés sur la page d'accueil : ceux choisis en backoffice (dans l'ordre choisi),
// complétés au besoin par les premiers projets de la liste (un projet supprimé ne laisse pas de trou).
export function getDisplayedFeaturedProjects(projects, featuredProjects) {
    const chosenProjects = (featuredProjects?.projectIds || [])
        .map((projectId) => projects.find((project) => project._id === projectId))
        .filter(Boolean);

    const remainingProjects = projects.filter(
        (project) => !chosenProjects.includes(project)
    );

    return [...chosenProjects, ...remainingProjects].slice(0, FEATURED_PROJECTS_COUNT);
}
