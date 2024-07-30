import './AllProjects.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'

function AllProjects () {

    const { projects, displayNavSection, setDisplayNavSection } = useContext (ProjectsContext);
    const [projectsList, setProjectsList] = useState(projects);

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);

    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);

    return (
        <main>
            <nav className='allProjects'>
                <ul className='allProjects_list'>
                    {projectsList.map((project)=>(
                        <Link className='allProjects_list_link' aria-label={`Accéder à la page du projet ${project.title}`} to={project._id?`/projets/${project._id}`:'*'}>
                            <figure>
                                <img src={project.images[project.mainImageIndex]?.imageUrl}/>
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