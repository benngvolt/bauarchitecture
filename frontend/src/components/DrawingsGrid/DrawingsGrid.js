import './DrawingsGrid.scss'
// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'
// import DOMPurify from 'dompurify';


function DrawingsGrid ({drawing}) {

    const [displayedImageIndex, setDisplayedImageIndex]= useState(drawing?.mainImageIndex ?? 0);
    useEffect(() => {
        if (drawing?.mainImageIndex !== undefined) {
          setDisplayedImageIndex(drawing.mainImageIndex);
        }
      }, [drawing]);

    return (
        <div className='drawingsColumnContainer'>
            <ul className='drawingsColumn'>
                {drawing?.drawings?.map((drawing, index)=>(
                <li className='drawingsColumn_item' key={`drawing_${index}`}>
                    <img className='drawingsColumn_item_img' 
                    src={drawing.imageUrl}
                    onClick={()=>setDisplayedImageIndex(index)}/>
                </li>
                ))}
            </ul>
            {drawing?.drawings?.length > 0 && (
            <div className='drawingImage'>
                <img className='drawingImage_img' 
                    src={drawing?.drawings[displayedImageIndex]?.imageUrl}/>
            </div>
            )}
        </div>
    )
}

export default DrawingsGrid