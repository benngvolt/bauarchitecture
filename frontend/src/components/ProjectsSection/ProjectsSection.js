import './ProjectsSection.scss';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

function ProjectsSection() {
    const { projects } = useContext(ProjectsContext);

    return (
        <section className='projects'>
            <h2>Projets architecturaux à Saint-Étienne et ses environs</h2>

            <div className='projects_descriptionContainer'>
                <p className='projects_descriptionContainer_description'>
                    Architecte à Saint-Étienne, j’accompagne particuliers et
                    professionnels dans la conception, la rénovation et
                    l’aménagement d’espaces sur mesure. Chaque projet est pensé
                    pour répondre aux usages, valoriser les lieux et créer des
                    environnements durables et harmonieux.
                </p>

                <div className='projects_descriptionContainer_buttonContainer'>
                    <Button
                        variant='link'
                        className='button_light'
                        link='https://benjamingibert.com'
                        target='_blank'
                        rel='noreferrer'
                        ariaLabel='Découvrir tous les projets'
                    >
                        TOUS LES PROJETS
                    </Button>
                </div>
            </div>

            <ul className='projects_list'>
                {projects.map((project) => {
                    const mainImage =
                        project.images?.[project.mainImageIndex];

                    return (
                        <li
                            className='projects_list_item'
                            key={project._id}
                        >
                            <Link
                                aria-label={`Accéder à la page du projet ${project.title}`}
                                to={
                                    project._id
                                        ? `/projets/${project._id}`
                                        : '*'
                                }
                            >
                                <figure className='projects_list_item_figure'>
                                    {mainImage?.imageUrl && (
                                        <img
                                            src={`${API_URL}${mainImage.imageUrl}`}
                                            alt={project.title}
                                        />
                                    )}

                                    <figcaption>
                                        <h3>{project.title}</h3>
                                    </figcaption>
                                </figure>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className='projects_lastButtonContainer'>
                <Button
                    variant='link'
                    className='button_dark'
                    link='https://benjamingibert.com'
                    target='_blank'
                    rel='noreferrer'
                    ariaLabel='Discuter de votre projet avec BAU Architecture'
                >
                    DISCUTONS DE VOTRE PROJET
                </Button>
            </div>
        </section>
    );
}

export default ProjectsSection;