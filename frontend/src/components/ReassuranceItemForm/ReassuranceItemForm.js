import AdminField from '../AdminUI/AdminField'
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
            <form className='adminModal' onSubmit={reassuranceItemFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }

                <div className='adminModal_header'>
                    <h3>{reassuranceItemFormMode === 'add' ? 'Nouvel argument' : "Modifier l'argument"}</h3>
                    <button
                        type='button'
                        className='adminButton adminButton--icon'
                        onClick={() => setDisplayReassuranceItemForm(false)}
                        aria-label='Fermer'
                        title='Fermer'
                    >
                        ✕
                    </button>
                </div>

                <AdminField
                    id='inputReassuranceItemTitle'
                    ref={inputReassuranceItemTitleRef}
                    label='Phrase titre'
                    hint='Courte et en gras, par exemple « Un accompagnement sur-mesure ».'
                    value={reassuranceItemTitle}
                    onChange={setReassuranceItemTitle}
                    maxLength={120}
                    required
                />

                <AdminField
                    id='inputReassuranceItemSubtitle'
                    ref={inputReassuranceItemSubtitleRef}
                    label='Phrase secondaire (sous-titre)'
                    hint='Une à trois phrases qui précisent le titre. Facultatif.'
                    value={reassuranceItemSubtitle}
                    onChange={setReassuranceItemSubtitle}
                    multiline
                    rows={4}
                    maxLength={400}
                />

                <div className='adminActions'>
                    <button type='submit' className='adminButton'>Enregistrer</button>
                    <button type='button' className='adminButton adminButton--text' onClick={() => setDisplayReassuranceItemForm(false)}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReassuranceItemForm
