import './ApproachForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL, DEFAULT_APPROACH_TITLE, DEFAULT_APPROACH_ITEMS } from '../../utils/constants'

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

    function updateItem(index, field, value) {
        setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    }

    function moveItem(index, direction) {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;

        const reordered = [...items];
        [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
        setItems(reordered);
    }

    function removeItem(index) {
        setItems(items.filter((item, i) => i !== index));
    }

    function addItem() {
        setItems([...items, { title: '', text: '' }]);
    }

    function saveSettings(newTitle, newItems, successMessage) {
        setLoaderDisplay(true);
        setStatusMessage('');

        fetch(`${API_URL}/api/approach-settings`, {
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
            setStatusMessage('Ajoutez au moins un bloc, ou rétablissez les textes par défaut.');
            return;
        }

        if (items.some((item) => item.title.trim() === '')) {
            setStatusMessage('Chaque bloc doit avoir un titre.');
            return;
        }

        saveSettings(title, items, 'Section enregistrée.');
    }

    function resetTexts() {
        saveSettings('', [], 'Textes par défaut rétablis.');
    }

    const hasCustomTexts = Boolean(savedTitle || savedItems.length);

    return (
        <form className='approachForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='approachForm_text'>
                <em>
                    Section sombre de la page d'accueil, située sous les projets à la une :
                    un titre et jusqu'à {MAX_ITEMS} blocs (titre + texte), affichés sur trois colonnes.
                    Un titre laissé vide retrouve son texte par défaut.
                </em>
            </p>

            <FormSimpleField
                htmlFor='inputApproachTitle'
                label='TITRE'
                id='inputApproachTitle'
                value={title}
                onChangeFunction={setTitle}
                multiline
                rows={2}
                maxLength={MAX_TITLE_LENGTH}
            />

            <ol className='approachForm_items'>
                {items.map((item, index) => (
                    <li className='approachForm_items_item' key={index}>
                        <div className='approachForm_items_item_header'>
                            <span>BLOC {index + 1}</span>

                            <div className='approachForm_items_item_header_actions'>
                                <button
                                    type='button'
                                    onClick={() => moveItem(index, -1)}
                                    disabled={index === 0}
                                    aria-label={`Monter le bloc ${index + 1}`}
                                >
                                    ↑
                                </button>
                                <button
                                    type='button'
                                    onClick={() => moveItem(index, 1)}
                                    disabled={index === items.length - 1}
                                    aria-label={`Descendre le bloc ${index + 1}`}
                                >
                                    ↓
                                </button>
                                <button
                                    type='button'
                                    onClick={() => removeItem(index)}
                                    aria-label={`Supprimer le bloc ${index + 1}`}
                                >
                                    SUPPRIMER
                                </button>
                            </div>
                        </div>

                        <FormSimpleField
                            htmlFor={`inputApproachItemTitle${index}`}
                            label='TITRE'
                            id={`inputApproachItemTitle${index}`}
                            value={item.title}
                            onChangeFunction={(value) => updateItem(index, 'title', value.slice(0, MAX_ITEM_TITLE_LENGTH))}
                        />

                        <FormSimpleField
                            htmlFor={`inputApproachItemText${index}`}
                            label='TEXTE'
                            id={`inputApproachItemText${index}`}
                            value={item.text}
                            onChangeFunction={(value) => updateItem(index, 'text', value)}
                            multiline
                            rows={3}
                            maxLength={MAX_ITEM_TEXT_LENGTH}
                        />
                    </li>
                ))}
            </ol>

            <div className='approachForm_buttonsContainer'>
                {items.length < MAX_ITEMS && (
                    <button type='button' onClick={addItem}>+ AJOUTER UN BLOC +</button>
                )}
            </div>

            <div className='approachForm_buttonsContainer'>
                <button type='submit'>ENREGISTRER</button>

                {hasCustomTexts && (
                    <button type='button' onClick={resetTexts}>
                        RÉTABLIR LES TEXTES PAR DÉFAUT
                    </button>
                )}
            </div>

            {statusMessage && (
                <p className='approachForm_status' role='status'>{statusMessage}</p>
            )}
        </form>
    )
}

export default ApproachForm
