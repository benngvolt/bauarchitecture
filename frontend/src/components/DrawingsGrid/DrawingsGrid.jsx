// import './DrawingsGrid.scss'
// // import React, { useContext } from 'react'
// // import { Link } from 'react-router-dom'
// // import { ProjectsContext } from '../../utils/ProjectsContext'
// import React, { useContext, useState, useEffect } from 'react'
// // import DOMPurify from 'dompurify';


// function DrawingsGrid ({drawing}) {

//     const [displayedImageIndex, setDisplayedImageIndex]= useState(drawing?.mainImageIndex ?? 0);
//     useEffect(() => {
//         if (drawing?.mainImageIndex !== undefined) {
//           setDisplayedImageIndex(drawing.mainImageIndex);
//         }
//       }, [drawing]);

//     return (
//         <div className='drawingsColumnContainer'>
//             <ul className='drawingsColumn'>
//                 {drawing?.drawings?.map((drawing, index)=>(
//                 <li className='drawingsColumn_item' key={`drawing_${index}`}>
//                     <img className='drawingsColumn_item_img' 
//                     src={drawing.imageUrl}
//                     onClick={()=>setDisplayedImageIndex(index)}/>
//                 </li>
//                 ))}
//             </ul>
//             {drawing?.drawings?.length > 0 && (
//             <div className='drawingImage'>
//                 <img className='drawingImage_img' 
//                     src={drawing?.drawings[displayedImageIndex]?.imageUrl}/>
//             </div>
//             )}
//         </div>
//     )
// }

// export default DrawingsGrid

import './DrawingsGrid.scss';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../utils/constants';

function DrawingsGrid({ drawing }) {
    const [displayedImageIndex, setDisplayedImageIndex] = useState(
        drawing?.mainImageIndex ?? 0
    );

    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    useEffect(() => {
        if (drawing?.mainImageIndex !== undefined) {
            setDisplayedImageIndex(drawing.mainImageIndex);
        }
    }, [drawing]);

    return (
        <div className='drawingsColumnContainer'>
            <ul className='drawingsColumn'>
                {drawing?.drawings?.map((drawingItem, index) => (
                    <li className='drawingsColumn_item' key={`drawing_${index}`}>
                        <img
                            className='drawingsColumn_item_img'
                            src={getMediaUrl(drawingItem.imageUrl)}
                            alt={`drawing ${index}`}
                            onClick={() => setDisplayedImageIndex(index)}
                        />
                    </li>
                ))}
            </ul>

            {drawing?.drawings?.length > 0 && (
                <div className='drawingImage'>
                    <img
                        className='drawingImage_img'
                        src={getMediaUrl(drawing?.drawings?.[displayedImageIndex]?.imageUrl)}
                        alt={`drawing ${displayedImageIndex}`}
                    />
                </div>
            )}
        </div>
    );
}

export default DrawingsGrid;