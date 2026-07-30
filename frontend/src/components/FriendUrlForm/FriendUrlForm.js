import './FriendUrlForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function FriendUrlForm ({
        handleLoadFriendUrls,
        friendUrlFormMode,
        friendUrlEdit,
        setDisplayFriendUrlForm,
        loaderDisplay,
        setLoaderDisplay
    }) {

    const [itemName, setItemName] = useState('')
    const [itemUrl, setItemUrl] = useState('')

    const inputItemNameRef = useRef(null);
    const inputItemUrlRef = useRef(null);

    useEffect(() => {
        formatFields()
    }, [friendUrlFormMode]);

    function formatFields() {
        if (friendUrlFormMode === 'add') {
            setItemName('');
            setItemUrl('');
        } else {
            setItemName(friendUrlEdit.itemName);
            setItemUrl(friendUrlEdit.itemUrl);
        }
    }

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function friendUrlFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);

        if (!inputItemNameRef.current.value || !inputItemUrlRef.current.value) {
            setLoaderDisplay(false);
            return;
        }

        const friendUrlData = {
            itemName: inputItemNameRef.current.value,
            itemUrl: inputItemUrlRef.current.value,
        };

        if (friendUrlFormMode === 'add') {
            fetch(`${API_URL}/api/friend-urls`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(friendUrlData),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || `Erreur ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(() => {
                handleLoadFriendUrls();
                setDisplayFriendUrlForm(false);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la requête :', error);
                setLoaderDisplay(false);
            });
        } else if (friendUrlFormMode === 'edit') {
            fetch(`${API_URL}/api/friend-urls/${friendUrlEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(friendUrlData),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || `Erreur ${response.status}`);
                    });
                }
                return response;
            })
            .then(() => {
                handleLoadFriendUrls();
                setDisplayFriendUrlForm(false);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.error(error);
                setLoaderDisplay(false);
            });
        }
    }

    return (
        <div className='projectFormContainer'>
            <form className='projectForm' onSubmit={friendUrlFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayFriendUrlForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputItemName'}
                        label={'NOM DU LIEN*'}
                        type={'text'}
                        id={'inputItemName'}
                        ref={inputItemNameRef}
                        value={itemName}
                        onChangeFunction={setItemName}
                    />
                    <FormSimpleField
                        htmlFor={'inputItemUrl'}
                        label={'URL*'}
                        type={'text'}
                        id={'inputItemUrl'}
                        ref={inputItemUrlRef}
                        value={itemUrl}
                        onChangeFunction={setItemUrl}
                    />
                </div>
                <div className='projectForm_submitButton'>
                    <button type='submit'>ENVOYER</button>
                </div>
            </form>
        </div>
    )
}

export default FriendUrlForm
