import AdminField from '../AdminUI/AdminField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL, DEFAULT_APPROACH_TITLE, DEFAULT_APPROACH_ITEMS } from '../../utils/constants'
import { authFetch } from '../../utils/auth'

const MAX_TITLE_LENGTH = 200;
const MAX_ITEMS = 6;
const MAX_ITEM_TITLE_LENGTH = 120;
const MAX_ITEM_TEXT_LENGTH = 600;


function ApproachForm ({
    approachSettings,
    handleLoadApproachSettings,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const savedTitle = approachSettings?.title || '';
    const savedItems = approachSettings?.items || [];
    // Clé stable : on ne resynchronise les champs que si les textes enregistrés changent.
    const savedKey = JSON.stringify({ savedTitle, savedItems });

    const [title, setTitle] = useState(DEFAULT_APPROACH_TITLE);
    const [items, setItems] = useState(DEFAULT_APPROACH_ITEMS);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        setTitle(savedTitle || DEFAULT_APPROACH_TITLE);
        setItems(savedItems.length ? savedItems : DEFAULT_APPROACH_ITEMS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedKey]);

    function touch(updater) {
        updater();
        setStatusMessage('');
    }

    function updateItem(index, field, value) {
        touch(() => setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item))));
    }

    function moveItem(index, direction) {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;

        const reordered = [...items];
        [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
        touch(() => setItems(reordered));
    }

    function removeItem(index) {
        touch(() => setItems(items.filter((item, i) => i !== index)));
    }

    function addItem() {
        touch(() => setItems([...items, { title: '', text: '' }]));
    }

    function saveSettings(newTitle, newItems, successMessage) {
        setLoaderDisplay(true);
        setStatusMessage('');

        authFetch(`${API_URL}/api/approach-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: JSON.stringify({ title: newTitle, items: newItems }),
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
            handleLoadApproachSettings();
            setStatusMessage(successMessage);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setStatusMessage(`Erreur : ${error.message}`);
            setLoaderDisplay(false);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (items.length === 0) {
            setStatusMessage('Erreur : ajoutez au moins un bloc, ou rétablissez les textes par défaut.');
            return;
        }

        if (items.some((item) => item.title.trim() === '')) {
            setStatusMessage('Erreur : chaque bloc doit avoir un titre.');
            return;
        }

        saveSettings(title, items, 'Section enregistrée.');
    }

    function resetTexts() {
        saveSettings('', [], 'Textes par défaut rétablis.');
    }

    const hasCustomTexts = Boolean(savedTitle || savedItems.length);
    const isModified =
        title !== (savedTitle || DEFAULT_APPROACH_TITLE) ||
        JSON.stringify(items) !== JSON.stringify(savedItems.length ? savedItems : DEFAULT_APPROACH_ITEMS);

    return (
        <form className='adminForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='adminIntro'>
                Un titre et jusqu'à {MAX_ITEMS} blocs (titre + texte), affichés sur trois colonnes.
                Un titre vidé retrouve son texte par défaut.
            </p>

            <div className='adminCard'>
                <AdminField
                    id='inputApproachTitle'
                    label='Titre de la section'
                    value={title}
                    onChange={(value) => touch(() => setTitle(value))}
                    multiline
                    rows={2}
                    maxLength={MAX_TITLE_LENGTH}
                />
            </div>

            {items.map((item, index) => (
                <div className='adminCard' key={index}>
                    <div className='adminCard_header'>
                        <h4>Bloc {index + 1}</h4>

                        <div className='adminActions'>
                            <button
                                type='button'
                                className='adminButton adminButton--icon'
                                onClick={() => moveItem(index, -1)}
                                disabled={index === 0}
                                aria-label={`Monter le bloc ${index + 1}`}
                                title='Monter'
                            >
                                ↑
                            </button>
                            <button
                                type='button'
                                className='adminButton adminButton--icon'
                                onClick={() => moveItem(index, 1)}
                                disabled={index === items.length - 1}
                                aria-label={`Descendre le bloc ${index + 1}`}
                                title='Descendre'
                            >
                                ↓
                            </button>
                            <button
                                type='button'
                                className='adminButton adminButton--icon'
                                onClick={() => removeItem(index)}
                                aria-label={`Supprimer le bloc ${index + 1}`}
                                title='Supprimer'
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <AdminField
                        id={`inputApproachItemTitle${index}`}
                        label='Titre'
                        value={item.title}
                        onChange={(value) => updateItem(index, 'title', value.slice(0, MAX_ITEM_TITLE_LENGTH))}
                        maxLength={MAX_ITEM_TITLE_LENGTH}
                        required
                    />

                    <AdminField
                        id={`inputApproachItemText${index}`}
                        label='Texte'
                        value={item.text}
                        onChange={(value) => updateItem(index, 'text', value)}
                        multiline
                        rows={4}
                        maxLength={MAX_ITEM_TEXT_LENGTH}
                    />
                </div>
            ))}

            {items.length < MAX_ITEMS && (
                <div>
                    <button type='button' className='adminButton adminButton--secondary' onClick={addItem}>
                        + Ajouter un bloc
                    </button>
                </div>
            )}

            <div className='adminActions'>
                <button type='submit' className='adminButton' disabled={!isModified}>
                    Enregistrer
                </button>

                {hasCustomTexts && (
                    <button type='button' className='adminButton adminButton--text' onClick={resetTexts}>
                        Rétablir les textes par défaut
                    </button>
                )}

                {statusMessage && (
                    <p
                        className={statusMessage.startsWith('Erreur') ? 'adminStatus adminStatus--error' : 'adminStatus'}
                        role='status'
                    >
                        {statusMessage.replace(/^Erreur : /, '')}
                    </p>
                )}
            </div>
        </form>
    )
}

export default ApproachForm
