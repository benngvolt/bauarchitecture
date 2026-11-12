import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState } from 'react'
import { API_URL } from '../../utils/constants'
import { authFetch } from '../../utils/auth'



function EditReassuranceItemsList ({
    reassuranceItems,
    handleEditReassuranceItem,
    handleLoadReassuranceItems,
    setLoaderDisplay
    }) {

    const [confirmBoxERIState, setConfirmBoxERIState] = useState(false);
    const [reassuranceItemToDelete, setReassuranceItemToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxERIState(false);
    }
    function openConfirmBox () {
        setConfirmBoxERIState(true);
    }

    function deleteReassuranceItem() {
        setLoaderDisplay(true)
        authFetch(`${API_URL}/api/reassurance-items/${reassuranceItemToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
              },
        })
        .then ((response) => {
            if(response.ok) {
                setLoaderDisplay(false)
            }
            setConfirmBoxERIState (false);
            handleLoadReassuranceItems();
            setReassuranceItemToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editReassuranceItemList'>
            {reassuranceItems.length === 0 && (
                <p className='adminIntro'>Aucun argument pour l'instant : le bloc n'est pas affiché sur la page d'accueil.</p>
            )}

            <ul className='adminCardList'>
                {reassuranceItems.map((reassuranceItem, index)=>(
                <li key={reassuranceItem._id}>
                    <p className='adminCardList_index'>Argument {index + 1}</p>
                    <p className='adminCardList_title' style={{ textTransform: 'none' }}>{reassuranceItem.title}</p>
                    {reassuranceItem.subtitle && (
                        <p className='adminCardList_text'>{reassuranceItem.subtitle}</p>
                    )}
                    <div className='adminCardList_actions'>
                        <button
                            type='button'
                            className='adminButton adminButton--secondary adminButton--small'
                            aria-label="Modifier l'élément de réassurance"
                            onClick={() => {
                                handleEditReassuranceItem(reassuranceItem);
                            }}
                        >
                            Modifier
                        </button>
                        <button
                            type='button'
                            className='adminButton adminButton--text adminButton--danger'
                            aria-label="Supprimer l'élément de réassurance"
                            onClick={() => {
                                setReassuranceItemToDelete (reassuranceItem)
                                openConfirmBox()
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxERIState}
                affirmativeChoice={deleteReassuranceItem}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditReassuranceItemsList
