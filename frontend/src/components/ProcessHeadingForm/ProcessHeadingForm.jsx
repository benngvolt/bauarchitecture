import AdminField from '../AdminUI/AdminField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL, DEFAULT_PROCESS_TITLE } from '../../utils/constants'
import { authFetch } from '../../utils/auth'

const MAX_TITLE_LENGTH = 200;


function ProcessHeadingForm ({
    processSettings,
    handleLoadProcessSettings,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const savedTitle = processSettings?.title || '';

    const [title, setTitle] = useState(DEFAULT_PROCESS_TITLE);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        setTitle(savedTitle || DEFAULT_PROCESS_TITLE);
    }, [savedTitle]);

    function saveTitle(newTitle, successMessage) {
        setLoaderDisplay(true);
        setStatusMessage('');

        authFetch(`${API_URL}/api/process-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: JSON.stringify({ title: newTitle }),
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
            handleLoadProcessSettings();
            setStatusMessage(successMessage);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setStatusMessage("Erreur : la phrase n'a pas pu être enregistrée.");
            setLoaderDisplay(false);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        saveTitle(title.trim() === DEFAULT_PROCESS_TITLE ? '' : title, 'Phrase enregistrée.');
    }

    function resetTitle() {
        saveTitle('', 'Phrase par défaut rétablie.');
    }

    const isModified = title !== (savedTitle || DEFAULT_PROCESS_TITLE);

    return (
        <form className='adminForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <div className='adminCard'>
                <AdminField
                    id='inputProcessTitle'
                    label="Phrase d'accroche"
                    hint="Affichée au-dessus des quatre étapes. Un champ vidé retrouve la phrase par défaut."
                    value={title}
                    onChange={(value) => { setTitle(value); setStatusMessage(''); }}
                    multiline
                    rows={2}
                    maxLength={MAX_TITLE_LENGTH}
                />
            </div>

            <div className='adminActions'>
                <button type='submit' className='adminButton' disabled={!isModified}>
                    Enregistrer
                </button>

                {savedTitle && (
                    <button type='button' className='adminButton adminButton--text' onClick={resetTitle}>
                        Rétablir la phrase par défaut
                    </button>
                )}

                {statusMessage && (
                    <p
                        className={statusMessage.startsWith('Erreur') ? 'adminStatus adminStatus--error' : 'adminStatus'}
                        role='status'
                    >
                        {statusMessage}
                    </p>
                )}
            </div>
        </form>
    )
}

export default ProcessHeadingForm
