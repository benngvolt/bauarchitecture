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
                <section className='singleProject_firstImageContainer'>
                    <img src={singleProject.images[singleProject.mainImageIndex]?.imageUrl}/>
                </section>
                <section className='singleProject_datasContainer'>
                    <div className='singleProject_datasContainer_imagesCarousel'>
                        <img className='singleProject_datasContainer_imagesCarousel_image' src={singleProject.images[selectedImageIndex]?.imageUrl}/>
                        {singleProject.images.length > 1 &&
                        <div className='singleProject_datasContainer_imagesCarousel_selectBox'>
                            <FontAwesomeIcon 
                                className='singleProject_datasContainer_imagesCarousel_selectBox_icon'
                                icon={faChevronLeft}
                                onClick={()=>previousImageDisplay()}
                                    />
                            {singleProject.images.map((image, index)=>(
                                <p className={index===selectedImageIndex? 'singleProject_datasContainer_imagesCarousel_selectBox_indexBar singleProject_datasContainer_imagesCarousel_selectBox_indexBar--bold':'singleProject_datasContainer_imagesCarousel_selectBox_indexBar'}>|</p>
                            ))}
                            <FontAwesomeIcon 
                                className='singleProject_datasContainer_imagesCarousel_selectBox_icon'
                                icon={faChevronRight}
                                onClick={()=>nextImageDisplay()} 
                                />
                        </div>
                        }   
                    </div>
                    <article className='singleProject_datasContainer_datasBox'>
                        <div className='singleProject_datasContainer_datasBox_maindatas'>
                            <p className='singleProject_datasContainer_datasBox_maindatas_type'>{singleProject.projectType}</p>
                            <h3 className='singleProject_datasContainer_datasBox_maindatas_title'>{singleProject.title}</h3>
                            <p className='singleProject_datasContainer_datasBox_maindatas_date'>{singleProject.creationDate}</p>
                        </div>
                        {cleanedDescription &&
                            <p className='singleProject_datasContainer_datasBox_description' dangerouslySetInnerHTML={{__html:cleanedDescription}}></p>
                            }
                        <div className='singleProject_datasContainer_datasBox_details'>
                            <div className='singleProject_datasContainer_datasBox_details_priceBox'>
                                <p className='singleProject_datasContainer_datasBox_details_priceBox_label'>montant des travaux</p>
                                <p className='singleProject_datasContainer_datasBox_details_priceBox_price'>{singleProject.price}</p>
                            </div>
                            <div>
                                <p className='singleProject_datasContainer_datasBox_details_surfaceBox_label'>surface</p>
                                <p className='singleProject_datasContainer_datasBox_details_surfaceBox_surface'>{singleProject.surface}</p>
                            </div>
                        </div>
                    </article>
                    
                </section>
                
            </div>
            }
        </main>
    )
}

export default SingleProject