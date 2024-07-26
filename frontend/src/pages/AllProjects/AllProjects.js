import './AllProjects.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'

function AllProjects () {

    const { projects } = useContext (ProjectsContext);
    const [projectsList, setProjectsList] = useState(projects);

    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);

    return (
        <main>
            <nav>
                <ul>
                    {projectsList.map((project)=>(
                        <Link aria-label={`Accéder à la page du projet ${project.title}`} to={project._id?`/projets/${project._id}`:'*'}>
                            <figure>
                                <img src={project.images[project.mainImageIndex].imageUrl}/>
                                <figcaption>{project.title}</figcaption>
                            </figure>
                        </Link>
                    ))}
                </ul>
            </nav>
        </main>
    )
}

export default AllProjects