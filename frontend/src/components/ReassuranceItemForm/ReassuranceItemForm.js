import './ReassuranceItemForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function ReassuranceItemForm ({
        handleLoadReassuranceItems,
        reassuranceItemFormMode,
        reassuranceItemEdit,
        setDisplayReassuranceItemForm,
        loaderDisplay,
        setLoaderDisplay
    }) {

    const [reassuranceItemTitle, setReassuranceItemTitle] = useState('')
    const [reassuranceItemSubtitle, setReassuranceItemSubtitle] = useState('')

    const inputReassuranceItemTitleRef = useRef(null);
    const inputReassuranceItemSubtitleRef = useRef(null);

    useEffect(() => {
        formatFields()
    }, [reassuranceItemFormMode]);

    function formatFields() {
        if (reassuranceItemFormMode === 'add') {
            setReassuranceItemTitle('');
            setReassuranceItemSubtitle('');
        } else {
            setReassuranceItemTitle(reassuranceItemEdit.title);
            setReassuranceItemSubtitle(reassuranceItemEdit.subtitle ?? '');
        }
    }

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function reassuranceItemFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);

        if (!inputReassuranceItemTitleRef.current.value) {
            setLoaderDisplay(false);
            return;
        }

        const reassuranceItemData = {
            title: inputReassuranceItemTitleRef.current.value,
            subtitle: inputReassuranceItemSubtitleRef.current.value,
        };

        if (reassuranceItemFormMode === 'add') {
            fetch(`${API_URL}/api/reassurance-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reassuranceItemData),
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
                handleLoadReassuranceItems();
                setDisplayReassuranceItemForm(false);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la requête :', error);
                setLoaderDisplay(false);
            });
        } else if (reassuranceItemFormMode === 'edit') {
            fetch(`${API_URL}/api/reassurance-items/${reassuranceItemEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reassuranceItemData),
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
                handleLoadReassuranceItems();
                setDisplayReassuranceItemForm(false);
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
            <form className='projectForm' onSubmit={reassuranceItemFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayReassuranceItemForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputReassuranceItemTitle'}
                        label={'PHRASE TITRE*'}
                        type={'text'}
                        id={'inputReassuranceItemTitle'}
                        ref={inputReassuranceItemTitleRef}
                        value={reassuranceItemTitle}
                        onChangeFunction={setReassuranceItemTitle}
                    />
                    <FormSimpleField
                        htmlFor={'inputReassuranceItemSubtitle'}
                        label={'PHRASE SECONDAIRE (SOUS-TITRE)'}
                        type={'text'}
                        id={'inputReassuranceItemSubtitle'}
                        ref={inputReassuranceItemSubtitleRef}
                        value={reassuranceItemSubtitle}
                        onChangeFunction={setReassuranceItemSubtitle}
                    />
                </div>
                <div className='projectForm_submitButton'>
                    <button type='submit'>ENVOYER</button>
                </div>
            </form>
        </div>
    )
}

export default ReassuranceItemForm
