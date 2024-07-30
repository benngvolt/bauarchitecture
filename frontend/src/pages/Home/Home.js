import './Home.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/bau_logo.png"
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'

function Home () {

    const { projects, loaderDisplay, welcomeDisplay, setDisplayNavSection } = useContext(ProjectsContext);
    const [projectsList, setProjectsList] = useState(projects);

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);

    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);

    return (
        <main>
            <section className='home'>
                {welcomeDisplay===true &&
                <div className='home_logoContainer'>
                    <img src={logo}/>
                </div>
                }
                {projectsList.map((project, index)=>(
                <Link aria-label={`Accéder à la page du projet ${project.title}`} to={project._id?`/projets/${project._id}`:'*'}>
                    <figure className='home_figure'>
                        <img src={project.images[project.mainImageIndex]?.imageUrl}/>
                        <figcaption>
                            <p>{project.title}</p>
                            <p>{project.creationDate}</p>
                        </figcaption>
                        
                    </figure>
                </Link>
            ))}
            </section>
        </main>
    )
}

export default Home