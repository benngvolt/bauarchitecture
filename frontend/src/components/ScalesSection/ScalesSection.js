import './ScalesSection.scss';

import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

function ScalesSection() {
    const { projects } = useContext(ProjectsContext);
    const PROJECT_TYPES = [
        'LOGEMENTS INDIVIDUELS',
        'LOGEMENTS COLLECTIFS',
        'RÉSIDENCES DE TOURISME',
        'ÉQUIPEMENTS TECHNIQUES',
        'ÉTABLISSEMENTS SCOLAIRES',
        'ÉTABLISSEMENTS DE SANTÉ',
        'ÉQUIPEMENTS CULTURELS ET SPORTIFS',
        'BUREAUX ET LOCAUX ASSOCIATIFS',
        'URBANISME ET TERRITOIRE',
    ];
    const projectsByType = useMemo(() => {
        const groupedProjects = projects.reduce((groups, project) => {
            const type = project.projectType?.trim();

            if (!type) {
                return groups;
            }

            if (!groups[type]) {
                groups[type] = [];
            }

            groups[type].push(project);

            return groups;
        }, {});

        return Object.entries(groupedProjects).map(
            ([projectType, typeProjects]) => ({
                projectType,
                projects: typeProjects,
                featuredProject: typeProjects[0],
            })
        );
    }, [projects]);

    return (
        <section className='scales'>
            <h2>Une expérience à toutes les échelles</h2>

            <div className='scales_descriptionContainer'>
                <p className='scales_descriptionContainer_description'>
                    De l’habitat individuel aux équipements publics, chaque
                    typologie révèle une manière différente de lire un lieu,
                    d’en comprendre les usages et d’accompagner sa
                    transformation.
                </p>
            </div>

            <ul className='scales_list'>
                {projectsByType.map(
                    ({
                        projectType,
                        projects: typeProjects,
                        featuredProject,
                    }) => {
                        const mainImage =
                            featuredProject.images?.[
                                featuredProject.mainImageIndex
                            ];

                        return (
                            <li
                                className='scales_list_item'
                                key={projectType}
                            >
                                <Link
                                    to={`/projets?type=${encodeURIComponent(
                                        projectType
                                    )}`}
                                    aria-label={`Découvrir les projets de type ${projectType}`}
                                >
                                    <figure className='scales_list_item_figure'>
                                        {mainImage?.imageUrl && (
                                            <img
                                                src={`${API_URL}${mainImage.imageUrl}`}
                                                alt={`${projectType} — projet ${featuredProject.title}`}
                                            />
                                        )}

                                        <figcaption>
                                            <h3>{projectType}</h3>
                                        </figcaption>
                                    </figure>
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul>

            <div className='scales_lastButtonContainer'>
                <Button
                    variant='link'
                    className='button_dark'
                    link='/contact'
                    ariaLabel='Discuter de votre projet avec BAU Architecture'
                >
                    DISCUTONS DE VOTRE PROJET
                </Button>
            </div>
        </section>
    );
}

export default ScalesSection;