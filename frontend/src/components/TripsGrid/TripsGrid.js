import './TripsGrid.scss'
// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'
// import DOMPurify from 'dompurify';


function TripsGrid ({trip}) {

    
    return (
        <ul className='tripsGrid'>
            {trip?.trips?.map((trip, index)=>(
            <li>
                <img className='tripsGrid_img' 
                src={trip.imageUrl}/>
            </li>
            ))}
        </ul>
    )
}

export default TripsGrid