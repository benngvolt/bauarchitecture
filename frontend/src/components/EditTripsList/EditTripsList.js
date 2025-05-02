import './EditTripsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function EditTripsList ({
    trips, 
    handleEditTrip, 
    handleLoadTrips, 
    loaderDisplay, 
    setLoaderDisplay
    }) {

    const [confirmBoxEPLState, setConfirmBoxEPLState] = useState(false);
    const [tripToDelete, setTripToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxEPLState(false);
    }
    function openConfirmBox () {
        setConfirmBoxEPLState(true);
    }

    function deleteTrip() {
        console.log(tripToDelete)
        setLoaderDisplay(true)
        fetch(`${API_URL}/api/trips/${tripToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
              },
        })
        .then ((response) => {
            if(response.ok) {
                setLoaderDisplay(false)
            }
            // setHandleDisplayProjectForm(false);
            setConfirmBoxEPLState (false);
            handleLoadTrips();
            setTripToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editProjectList'>
            <ul className='editProjectList_list editTripsList_list'>
                {trips.map((trip)=>(
                <li className='editProjectList_list_item' key={trip._id}>
                    { trip.trips && trip.trips.length > 0 &&
                        <img src={trip.trips[trip.mainImageIndex].imageUrl}/>
                    }
                    <p className='editProjectList_list_item_title'>{trip.title}</p>
                    <div className='editProjectList_list_item_buttonsContainer'>
                        <button aria-label="Supprimer le voyage" onClick={() => {
                            setTripToDelete(trip)
                            openConfirmBox()
                            }} 
                            type='button'>
                            Supprimer
                        </button>
                        <button aria-label="Modifier le voyage" onClick={() => {
                            handleEditTrip(trip);
                            }}>
                            Modifier
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxEPLState}
                affirmativeChoice={deleteTrip}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditTripsList