import './ScalesSection.scss';

import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faHospital,
    faBuilding,
    faSchool,
    faHotel,
    faGears,
    faLandmark,
    faCity,
    faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button/Button';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

// Correspondance type de projet -> icône FontAwesome.
// Les clés doivent matcher EXACTEMENT (casse, accents) la valeur
// de projectType telle qu'elle vient de tes données (probablement
// pas en majuscules — l'affichage en capitales vient sans doute du CSS).
// Clés déjà normalisées (minuscules, sans accents).
const PROJECT_TYPE_ICONS = {
    'logements individuels': faHouse,
    'etablissements de sante': faHospital,
    'logements collectifs': faBuilding,
    'etablissements scolaires': faSchool,
    'residences de tourisme': faHotel,
    'equipements techniques': faGears,
    'equipements culturels et sportifs': faLandmark,
    'urbanisme et territoire': faCity,
};
const DEFAULT_ICON = faLayerGroup;
// Normalise une chaîne pour la comparaison : minuscules, sans accents,
    // espaces multiples réduits à un seul.
    function normalize(str) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

function getIconForType(projectType) {
    if (!projectType) {
        return DEFAULT_ICON;
    }

    return PROJECT_TYPE_ICONS[normalize(projectType)] ?? DEFAULT_ICON;
}

function ScalesSection() {
    const { projects } = useContext(ProjectsContext);

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
                    De l'habitat individuel aux équipements publics, chaque
                    typologie révèle une manière différente de lire un lieu,
                    d'en comprendre les usages et d'accompagner sa
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
                        console.log('Valeur exacte:', JSON.stringify(projectType));
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
                                        <figcaption>
                                            <FontAwesomeIcon
                                                icon={getIconForType(
                                                    projectType
                                                )}
                                                className='scales_list_item_icon'
                                                aria-hidden='true'
                                            />
                                            <h3>{projectType}</h3>
                                        </figcaption>
                                        {/* {mainImage?.imageUrl && (
                                            <img
                                                src={`${API_URL}${mainImage.imageUrl}`}
                                                alt={`${projectType} — projet ${featuredProject.title}`}
                                            />
                                        )} */}
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