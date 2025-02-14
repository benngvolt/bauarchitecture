import './Trips.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'
import DOMPurify from 'dompurify';


function Trips () {

    const { 
        trips,
        loaderDisplay, 
        setLoaderDisplay, 
        } = useContext(ProjectsContext);

    return (
        <main>
            <section className='trips'>
                <ul className='trips_list'>
                {trips.map((trip)=>(
                    <li className='trips_list_item'>
                        <h5 className='trips_list_item_name'>{trip.title}</h5>
                        {/* <div>
                            <img src={trip.trips[trip.mainImageIndex].imageUrl} alt={`image${trip.title}`}/>
                        </div> */}
                        <p dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(trip.description)}}></p>
                        <ul className='trips_list_item_list'>
                            {trip.trips.map((trip, index)=>(
                            <img className='trips_list_item_list_item' 
                                style={{
                                    left: `calc(${index} * 40px)`
                                }}
                                src={trip.imageUrl}/>
                            ))}
                        </ul>
                    </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Trips