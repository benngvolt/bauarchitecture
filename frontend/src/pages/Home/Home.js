import './Home.scss'
// import React, { useContext } from 'react'
import logo from "../../assets/bau_logo.png"
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'

function Home () {

    const { projects } = useContext(ProjectsContext);
    const [projectsList, setProjectsList] = useState(projects);

    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);

    return (
        <main>
            <section>
                <div>
                    <img src={logo}/>
                </div>
            {projectsList.map((project, index)=>(
                <figure>
                    <img src={project.images[project.mainImageIndex].imageUrl}/>
                    <figcaption>
                    {project.title}
                    </figcaption>
                    <p>{project.description}</p>
                    <p>{project.creationDate}</p>
                </figure>
            ))}
            </section>
        </main>
    )
}

export default Home