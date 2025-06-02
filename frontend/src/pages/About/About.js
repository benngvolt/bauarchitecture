import './About.scss'
import React, { useContext, useState, useEffect } from 'react'
import CaptionBox from '../../components/CaptionBox/CaptionBox'
import portrait from '../../assets/portrait.webp'
import potes from '../../assets/potes.png'
import ensase from '../../assets/ensase.png'
import skyline from '../../assets/skyline.png'
import collaboratrice from '../../assets/collaboratrice.png'
import Introduction from '../../components/Introduction/Introduction'
import FriendsUrls from '../../components/FriendsUrls/FriendsUrls'
import Curriculum from '../../components/Curriculum/Curriculum'
import Collaborations from '../../components/Collaborations/Collaborations'
import Programs from '../../components/Programs/Programs'


function About () {

    const [selectedSketchIndex, setSelectedSketchIndex] = useState(0);
    const [handleDisplayCaptionBox, setHandleDisplayCaptionBox] = useState(false);
    const [tagSelected, setTagSelected] = useState('');
    
    const aboutObjects = [
        {
            "imageUrl": portrait,
            "tag": "introduction"
        },        
        {
            "imageUrl":potes,
            "tag": "friendsUrl"
        },
        {
            "imageUrl":ensase,
            "tag": "curriculum"
        },
        {
            "imageUrl":collaboratrice,
            "tag": "collaborations"
        },
        {
            "imageUrl":skyline,
            "tag": "programs"
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
                    <ul className='about_datasContainer_grid'> 
                        {aboutObjects.map((sketch, index)=>(
                            <li key={`objetApropos${index}`} className={`about_datasContainer_grid_image about_datasContainer_sketches_grid_image_${index}`}
                            onClick={() => {
                                setTagSelected(sketch.tag);
                                openCaptionBox(index);
                                // D'autres instructions si nécessaire
                            }}>
                                <img className={sketch.imageUrl.endsWith('.png')?'about_datasContainer_grid_image_png' : 'about_datasContainer_grid_image_other'} src={sketch.imageUrl}/>
                            </li>
                        ))}
                    </ul>
                    {handleDisplayCaptionBox===true &&
                        <CaptionBox setHandleDisplayCaptionBox={setHandleDisplayCaptionBox}>
                            {tagSelected === 'introduction' &&
                                <Introduction/>
                            }
                            {tagSelected === 'friendsUrl' &&
                                <FriendsUrls/>
                            }
                            {tagSelected === 'curriculum' &&
                                <Curriculum/>
                            }
                            {tagSelected === 'collaborations' &&
                                <Collaborations/>
                            }
                            {tagSelected === 'programs' &&
                                <Programs/>
                            }
                        </CaptionBox>
                    }
                </div>
                }
            </section>
        </main>
    )
}

export default About