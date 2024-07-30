import './SingleProject.scss'
// import React, { useContext } from 'react'
import logo from "../../assets/bau_logo.png"
import { ProjectsContext } from '../../utils/ProjectsContext'
import { useParams } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import { API_URL } from '../../utils/constants'

function SingleProject () {

    const { displayNavSection, setDisplayNavSection } = useContext(ProjectsContext);
    const [singleProject, setSingleProject] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/projects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // setDisplayHeader(true);
                window.scrollTo(0, 0);
                setSingleProject(data);
            })
            .catch((error) => console.log(error.message));
    }, [id]);

    return (
        <main>
            <section>
                {singleProject &&
                    <figure>
                        <img src={singleProject.images[singleProject.mainImageIndex]?.imageUrl}/>
                        <figcaption>
                        {singleProject.title}
                        </figcaption>
                        <p>{singleProject.projectState}</p>
                    </figure>
                }
            </section>
        </main>
    )
}

export default SingleProject