import './HeroTextsForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL, DEFAULT_HERO_TITLE, DEFAULT_HERO_DESCRIPTION } from '../../utils/constants'

const MAX_TITLE_LENGTH = 300;
const MAX_DESCRIPTION_LENGTH = 1500;


function HeroTextsForm ({
    heroSettings,
    handleLoadHeroSettings,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const savedTitle = heroSettings?.title || '';
    const savedDescription = heroSettings?.description || '';

    const [heroTitle, setHeroTitle] = useState(DEFAULT_HERO_TITLE);
    const [heroDescription, setHeroDescription] = useState(DEFAULT_HERO_DESCRIPTION);
    const [statusMessage, setStatusMessage] = useState('');

    // Resynchronise les champs uniquement quand les textes enregistrés changent
    // (et non à chaque rechargement des images du hero, pour ne pas perdre une saisie en cours).
    useEffect(() => {
        setHeroTitle(savedTitle || DEFAULT_HERO_TITLE);
        setHeroDescription(savedDescription || DEFAULT_HERO_DESCRIPTION);
    }, [savedTitle, savedDescription]);

    function saveTexts(title, description, successMessage) {
        setLoaderDisplay(true);
        setStatusMessage('');

        fetch(`${API_URL}/api/hero-settings/texts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: JSON.stringify({ title, description }),
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
            handleLoadHeroSettings();
            setStatusMessage(successMessage);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setStatusMessage("Erreur : les textes n'ont pas pu être enregistrés.");
            setLoaderDisplay(false);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        saveTexts(heroTitle, heroDescription, 'Textes enregistrés.');
    }

    function resetTexts() {
        saveTexts('', '', 'Textes par défaut rétablis.');
    }

    const hasCustomTexts = Boolean(savedTitle || savedDescription);

    return (
        <form className='heroTextsForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='heroTextsForm_text'>
                <em>
                    Titre principal (H1) et texte d'accroche affichés dans le bloc du hero, sur la page d'accueil.
                    Un champ laissé vide retrouve son texte par défaut.
                </em>
            </p>

            <FormSimpleField
                htmlFor='inputHeroTitle'
                label='TITRE (H1)'
                id='inputHeroTitle'
                value={heroTitle}
                onChangeFunction={setHeroTitle}
                multiline
                rows={2}
                maxLength={MAX_TITLE_LENGTH}
            />

            <FormSimpleField
                htmlFor='inputHeroDescription'
                label="TEXTE D'ACCROCHE"
                id='inputHeroDescription'
                value={heroDescription}
                onChangeFunction={setHeroDescription}
                multiline
                rows={6}
                maxLength={MAX_DESCRIPTION_LENGTH}
            />

            <div className='heroTextsForm_buttonsContainer'>
                <button type='submit'>ENREGISTRER</button>

                {hasCustomTexts && (
                    <button type='button' onClick={resetTexts}>
                        RÉTABLIR LES TEXTES PAR DÉFAUT
                    </button>
                )}
            </div>

            {statusMessage && (
                <p className='heroTextsForm_status' role='status'>{statusMessage}</p>
            )}
        </form>
    )
}

export default HeroTextsForm
