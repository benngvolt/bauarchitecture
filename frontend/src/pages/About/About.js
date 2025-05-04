import './About.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'
import CaptionBox from '../../components/CaptionBox/CaptionBox'
import portrait from '../../assets/portrait.webp'
import potes from '../../assets/potes.png'
import diplome from '../../assets/diplome.png'
import trousseau from '../../assets/trousseau.png'
import crayons from '../../assets/crayons.png'
import fleur from '../../assets/fleurblanche.png'


function About () {

    const [selectedSketchIndex, setSelectedSketchIndex] = useState(0);
    const [handleDisplayCaptionBox, setHandleDisplayCaptionBox] = useState(false);
    
    const aboutObjects = [
        {
            "sketchCaption": "Là je parle de moi un peu perso, genre où j’habite, le fait que j’ai un gamin, là où j’ai grandi, d’où je viens,... Il m’était venu un jour l’idée, peut-être un peu conne, je faire défiler des images de moi y compris petite, histoire de me rendre un peu humaine et pas trop « employée du mois »",
            "imageUrl":portrait
        },
        {
            "sketchCaption": "Liens vers les amis",
            "list": [
                {
                    "itemName":"Benjamin Gibert",
                    "itemUrl":"https://bengibert.com"
                }
            ],
            "imageUrl":potes,
            "isPictureDisplayed":false
        },
        {
            "sketchCaption": "Diplôme de l'ENSASE",
            "imageUrl":diplome,
            "isPictureDisplayed":false
        },
        {
            "sketchCaption": "Je travaille dans les locaux de SoCo",
            "imageUrl":trousseau,
            "isPictureDisplayed":false
        },
        {
            "sketchCaption": "Mes anciens projets",
            "imageUrl":crayons,
            "isPictureDisplayed":false
        },
        {
            "sketchCaption": "Mon actualité",
            "imageUrl":fleur,
            "isPictureDisplayed":false
        }
    ]
    
    function openCaptionBox(index){
        setHandleDisplayCaptionBox(true);
        setSelectedSketchIndex(index);
    }

    return (
        <main>
            <section className='about'>
                {/* <h2 className='about_title'>À PROPOS</h2> */}
                {aboutObjects.length > 0 &&
                <div className='about_datasContainer'>  
                    <div className='about_datasContainer_grid'> 
                        {aboutObjects.map((sketch, index)=>(
                            <div key={`objetApropos${index}`} className={`about_datasContainer_grid_image singleProject_datasContainer_sketches_grid_image_${index}`}
                            onClick={() => {
                                openCaptionBox(index);
                                // D'autres instructions si nécessaire
                            }}>
                                <img className={sketch.imageUrl.endsWith('.png')?'about_datasContainer_grid_image_png' : 'about_datasContainer_grid_image_other'} src={sketch.imageUrl}/>
                            </div>
                        ))}
                    </div>
                    {handleDisplayCaptionBox===true &&
                        <CaptionBox sketches={aboutObjects} index={selectedSketchIndex} setHandleDisplayCaptionBox={setHandleDisplayCaptionBox} isPictureDisplayed={aboutObjects[selectedSketchIndex]?.isPictureDisplayed ?? true}/>
                    }
                </div>
                }
            </section>
        </main>
    )
}

export default About