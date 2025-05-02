import './Drawings.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import DrawingsGrid from '../../components/DrawingsGrid/DrawingsGrid'
import React, { useContext, useState, useEffect } from 'react'
import DOMPurify from 'dompurify';


function Drawings () {

    const { 
        drawings,
        loaderDisplay, 
        setLoaderDisplay, 
        } = useContext(ProjectsContext);

    const [drawingDisplayed, setDrawingDisplayed] = useState({})
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <section className='drawings'>
                <div className='drawings_listTextContainer'>
                    <ul className='drawings_listTextContainer_list'>
                    {drawings.map((drawing)=>(
                        <li className='drawings_listTextContainer_list_item' onClick={()=>setDrawingDisplayed(drawing)}>
                            <h5 className={drawing.title === drawingDisplayed.title ? 'drawings_listTextContainer_list_item_name drawings_listTextContainer_list_item_name--selected' : 'drawings_listTextContainer_list_item_name drawings_listTextContainer_list_item_name--notSelected'} >{drawing.title}</h5>
                        </li>
                    ))}
                    </ul>
                    {drawingDisplayed !== {} &&
                    <div className='drawings_listTextContainer_text'>
                        <p dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(drawingDisplayed?.description)}}></p>
                    </div>
                    }
                </div>
                {drawingDisplayed !== {} &&
                <div>
                    <DrawingsGrid drawing={drawingDisplayed}/>
                </div>
                }
            </section>
        </main>
    )
}
export default Drawings