import './AllProjects.scss'
import { Link, useSearchParams } from 'react-router-dom'
import { API_URL, PROJECT_TYPES } from '../../utils/constants'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useEffect, useMemo } from 'react'

function AllProjects () {

    const { projects, setDisplayNavSection } = useContext (ProjectsContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeType = searchParams.get('type') || '';

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);

    const availableTypes = useMemo(() => {
        const presentTypes = new Set(
            projects
                .map((project) => project.projectType?.trim())
                .filter(Boolean)
        );

        return PROJECT_TYPES.filter((type) => presentTypes.has(type));
    }, [projects]);

    const filteredProjects = activeType
        ? projects.filter((project) => project.projectType?.trim() === activeType)
        : projects;

    function handleFilterClick(type) {
        if (type) {
            setSearchParams({ type });
        } else {
            setSearchParams({});
        }
    }

    return (
        <main className='allProjects'>
            <h1 className='allProjects_title'>Tous les projets</h1>

            <div className='allProjects_filters'>
                <button
                    type='button'
                    aria-label='Afficher tous les projets'
                    className={
                        activeType === ''
                            ? 'allProjects_filters_button allProjects_filters_button--active'
                            : 'allProjects_filters_button'
                    }
                    onClick={() => handleFilterClick('')}
                >
                    TOUS
                </button>

                {availableTypes.map((type) => (
                    <button
                        key={type}
                        type='button'
                        aria-label={`Filtrer les projets de type ${type}`}
                        className={
                            activeType === type
                                ? 'allProjects_filters_button allProjects_filters_button--active'
                                : 'allProjects_filters_button'
                        }
                        onClick={() => handleFilterClick(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <ul className='allProjects_list'>
                {filteredProjects.map((project) => {
                    const mainImage = project.images?.[project.mainImageIndex];

                    return (
                        <li
                            className='allProjects_list_item'
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
                                <figure className='allProjects_list_item_figure'>
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
        </main>
    )
}

export default AllProjects
