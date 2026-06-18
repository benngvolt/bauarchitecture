// import './TripsGrid.scss'
// // import React, { useContext } from 'react'
// // import { Link } from 'react-router-dom'
// // import { ProjectsContext } from '../../utils/ProjectsContext'
// import React, { useContext, useState, useEffect } from 'react'
// // import DOMPurify from 'dompurify';


// function TripsGrid ({trip}) {

    
//     return (
//         <ul className='tripsGrid'>
//             {trip?.trips?.map((trip, index)=>(
//             <li>
//                 <img className='tripsGrid_img' 
//                 src={trip.imageUrl}/>
//             </li>
//             ))}
//         </ul>
//     )
// }

// export default TripsGrid

import './TripsGrid.scss';
import React from 'react';
import { API_URL } from '../../utils/constants';

function TripsGrid({ trip }) {
    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    return (
        <ul className='tripsGrid'>
            {trip?.trips?.map((tripImage, index) => (
                <li key={`trip_${index}`}>
                    <img
                        className='tripsGrid_img'
                        src={getMediaUrl(tripImage.imageUrl)}
                        alt={`trip ${index}`}
                    />
                </li>
            ))}
        </ul>
    );
}

export default TripsGrid;