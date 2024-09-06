import './SingleProject.scss'
// import React, { useContext } from 'react'
import logo from "../../assets/bau_logo.png"
import { ProjectsContext } from '../../utils/ProjectsContext'
import { useParams } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import { API_URL } from '../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft , faChevronRight} from '@fortawesome/free-solid-svg-icons'
import DOMPurify from 'dompurify';

function SingleProject () {

    const { displayNavSection, setDisplayNavSection } = useContext(ProjectsContext);
    const [singleProject, setSingleProject] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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

    function nextImageDisplay() {
        if (selectedImageIndex < singleProject.images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1)
        } else {
            setSelectedImageIndex(0)
        }
    }

    function previousImageDisplay() {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1)
        } else {
            setSelectedImageIndex(singleProject.images.length - 1)
        }
    }

    const cleanedDescription = DOMPurify.sanitize(singleProject?.description);



    return (
        <main>
            {singleProject &&
            <div className='singleProject'>
                <section className='singleProject_datasContainer'> 
                    <article className='singleProject_datasContainer_datasBox'>
                        <h3 className='singleProject_datasContainer_datasBox_title'>{singleProject.title}</h3>
                        <div className='singleProject_datasContainer_datasBox_maindatas'>
                            {singleProject.projectType &&
                            <p className='singleProject_datasContainer_datasBox_maindatas_type'>Type de projet : {singleProject.projectType}</p>
                            }
                            {singleProject.projectState &&
                            <p className='singleProject_datasContainer_datasBox_maindatas_state'>État du projet : {singleProject.projectState}</p>
                            }
                            {singleProject.creationDate &&
                            <p className='singleProject_datasContainer_datasBox_maindatas_date'>Date de fin des travaux : {singleProject.creationDate}</p>
                            }
                            {singleProject.price &&
                            <p className='singleProject_datasContainer_datasBox_maindatas_price'>Montant des travaux : {singleProject.price}</p>
                            }
                            {singleProject.surface &&
                            <p className='singleProject_datasContainer_datasBox_maindatas_surface'>Surface : {singleProject.surface}</p>
                            }
                        </div>
                        <div className='singleProject_datasContainer_datasBox_description'>
                            {cleanedDescription &&
                            <p dangerouslySetInnerHTML={{__html:cleanedDescription}}></p>
                            }
                        </div>
                    </article>
                    {singleProject.sketches.length > 1 &&
                    <div className='singleProject_datasContainer_sketches'>  
                        <div className='singleProject_datasContainer_sketches_grid'> 
                            {singleProject.sketches.map((sketch, index)=>(
                                <div className={`singleProject_datasContainer_sketches_grid_image singleProject_datasContainer_sketches_grid_image_${index}`}>
                                    <img className={sketch.imageUrl.endsWith('.png')?'singleProject_datasContainer_sketches_grid_image_png' : 'singleProject_datasContainer_sketches_grid_image_other'} src={sketch.imageUrl}/>
                                    <p className='singleProject_datasContainer_sketches_grid_index'>#{index+1}</p>
                                </div>
                            ))}
                        </div> 
                        <div className='singleProject_datasContainer_sketches_captionsBox'> 
                            {singleProject.sketches.map((sketch, index)=>(
                                (sketch.sketchCaption &&
                                <div className="singleProject_datasContainer_sketches_captionsBox_item">
                                    <p>#{index+1}</p>
                                    <p>{sketch.sketchCaption}</p>
                                </div>
                                )
                            ))}
                        </div>        
                    </div>
                    }
                    <div className='singleProject_datasContainer_imagesWowColumn'>
                        {singleProject.images.length > 1 &&
                            <div className='singleProject_datasContainer_imagesWowColumn_column'> 
                                {singleProject.images.map((image, index)=>(
                                    <img className='singleProject_datasContainer_imagesWowColumn_image' src={image.imageUrl}/>
                                ))}
                            </div>
                        }   
                    </div>
                </section>
                
            </div>
            }
        </main>
    )
}

export default SingleProject