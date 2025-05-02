import './EditDrawingsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function EditDrawingsList ({
    drawings, 
    handleEditDrawing, 
    handleLoadDrawings, 
    loaderDisplay, 
    setLoaderDisplay
    }) {

    const [confirmBoxEPLState, setConfirmBoxEPLState] = useState(false);
    const [drawingToDelete, setDrawingToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxEPLState(false);
    }
    function openConfirmBox () {
        setConfirmBoxEPLState(true);
    }

    function deleteDrawing() {
        console.log(drawingToDelete)
        setLoaderDisplay(true)
        fetch(`${API_URL}/api/drawings/${drawingToDelete._id}`, {
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
            handleLoadDrawings();
            setDrawingToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editProjectList'>
            <ul className='editProjectList_list'>
                {drawings.map((drawing)=>(
                <li className='editProjectList_list_item' key={drawing._id}>
                    { drawing.drawings && drawing.drawings.length > 0 &&
                        <img src={drawing.drawings[drawing.mainImageIndex].imageUrl}/>
                    }
                    <p className='editProjectList_list_item_title'>{drawing.title}</p>
                    <div className='editProjectList_list_item_buttonsContainer'>
                        <button aria-label="Supprimer le voyage" onClick={() => {
                            setDrawingToDelete(drawing)
                            openConfirmBox()
                            }} 
                            type='button'>
                            Supprimer
                        </button>
                        <button aria-label="Modifier le carnet de dessin" onClick={() => {
                            handleEditDrawing(drawing);
                            }}>
                            Modifier
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxEPLState}
                affirmativeChoice={deleteDrawing}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditDrawingsList