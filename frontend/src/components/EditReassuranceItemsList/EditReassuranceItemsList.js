import './EditReassuranceItemsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState } from 'react'
import { API_URL } from '../../utils/constants'



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
        fetch(`${API_URL}/api/reassurance-items/${reassuranceItemToDelete._id}`, {
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
            <ul className='editReassuranceItemList_list'>
                {reassuranceItems.map((reassuranceItem)=>(
                <li className='editReassuranceItemList_list_item' key={reassuranceItem._id}>
                    <p className='editReassuranceItemList_list_item_title'>{reassuranceItem.title}</p>
                    {reassuranceItem.subtitle && (
                        <p className='editReassuranceItemList_list_item_subtitle'>{reassuranceItem.subtitle}</p>
                    )}
                    <div className='editReassuranceItemList_list_item_buttonsContainer'>
                        <button aria-label="Supprimer l'élément de réassurance" onClick={() => {
                            setReassuranceItemToDelete (reassuranceItem)
                            openConfirmBox()
                            }}
                            type='button'>
                            Supprimer
                        </button>
                        <button aria-label="Modifier l'élément de réassurance" onClick={() => {
                            handleEditReassuranceItem(reassuranceItem);
                            }}>
                            Modifier
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
