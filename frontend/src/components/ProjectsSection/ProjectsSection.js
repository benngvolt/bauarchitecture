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
            <h2>Quelques réalisations</h2>

            <div className='projects_descriptionContainer'>
                <p className='projects_descriptionContainer_description'>
                Chaque projet est une réponse singulière à un lieu, à un programme
    et à des usages. En voici un aperçu.
                </p>
            </div>

            <ul className='projects_list'>
                {projects.slice(0, 3).map((project) => {
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
                    link=''
                    target='_blank'
                    rel='noreferrer'
                    ariaLabel='Discuter de votre projet avec BAU Architecture'
                >
                    TOUS LES PROJETS
                </Button>
            </div>
        </section>
    );
}

export default ProjectsSection;