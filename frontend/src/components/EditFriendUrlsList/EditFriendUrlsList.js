import './EditFriendUrlsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState } from 'react'
import { API_URL } from '../../utils/constants'



function EditFriendUrlsList ({
    friendUrls,
    handleEditFriendUrl,
    handleLoadFriendUrls,
    setLoaderDisplay
    }) {

    const [confirmBoxFUState, setConfirmBoxFUState] = useState(false);
    const [friendUrlToDelete, setFriendUrlToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxFUState(false);
    }
    function openConfirmBox () {
        setConfirmBoxFUState(true);
    }

    function deleteFriendUrl() {
        setLoaderDisplay(true)
        fetch(`${API_URL}/api/friend-urls/${friendUrlToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
              },
        })
        .then ((response) => {
            if(response.ok) {
                setLoaderDisplay(false)
            }
            setConfirmBoxFUState (false);
            handleLoadFriendUrls();
            setFriendUrlToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editFriendUrlsList'>
            <ul className='editFriendUrlsList_list'>
                {friendUrls.map((friendUrl)=>(
                <li className='editFriendUrlsList_list_item' key={friendUrl._id}>
                    <p className='editFriendUrlsList_list_item_name'>{friendUrl.itemName}</p>
                    <p className='editFriendUrlsList_list_item_url'>{friendUrl.itemUrl}</p>
                    <div className='editFriendUrlsList_list_item_buttonsContainer'>
                        <button aria-label={`Supprimer le lien ${friendUrl.itemName}`} onClick={() => {
                            setFriendUrlToDelete (friendUrl)
                            openConfirmBox()
                            }}
                            type='button'>
                            Supprimer
                        </button>
                        <button aria-label={`Modifier le lien ${friendUrl.itemName}`} onClick={() => {
                            handleEditFriendUrl(friendUrl);
                            }}>
                            Modifier
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxFUState}
                affirmativeChoice={deleteFriendUrl}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditFriendUrlsList
