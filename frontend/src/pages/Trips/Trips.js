import './Trips.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import carteFictive from '../../assets/carteFictive.webp'
import { ProjectsContext } from '../../utils/ProjectsContext'
import TripsGrid from '../../components/TripsGrid/TripsGrid'
import React, { useContext, useState, useEffect } from 'react'
import DOMPurify from 'dompurify';


function Trips () {

    const { 
        trips,
        loaderDisplay, 
        setLoaderDisplay, 
        } = useContext(ProjectsContext);

    const [tripDisplayed, setTripDisplayed] = useState({})
    useEffect(() => {
        window.scrollTo(0, 0);
        setTripDisplayed({});
    }, []);

    return (
        <main>
            <section className='trips'>
                <div className='trips_listTextContainer'>
                    <ul className='trips_listTextContainer_list'>
                    {trips.map((trip)=>(
                        <li className='trips_listTextContainer_list_item' onClick={()=>setTripDisplayed(trip)}>
                            <h5 className={trip.title === tripDisplayed.title ? 'trips_listTextContainer_list_item_name trips_listTextContainer_list_item_name--selected':'trips_listTextContainer_list_item_name trips_listTextContainer_list_item_name--notSelected'}>{trip.title}</h5>
                        </li>
                    ))}
                    </ul>
                    {Object.keys(tripDisplayed).length !== 0 &&
                    <div className='trips_listTextContainer_text'>
                        <p dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(tripDisplayed?.description)}}></p>
                    </div>
                    }
                    {Object.keys(tripDisplayed).length === 0 &&
                    <div className='trips_listTextContainer_img'>
                        <img src={carteFictive} />
                    </div>
                    }
                </div>
                {Object.keys(tripDisplayed).length !== 0 &&
                <div className="trips_gridContainer">
                    <TripsGrid trip={tripDisplayed}/>
                </div>
                }
            </section>
        </main>
    )
}
export default Trips