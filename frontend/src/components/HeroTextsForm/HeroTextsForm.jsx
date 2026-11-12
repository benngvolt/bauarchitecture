import AdminField from '../AdminUI/AdminField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL, DEFAULT_HERO_TITLE, DEFAULT_HERO_DESCRIPTION } from '../../utils/constants'
import { authFetch } from '../../utils/auth'

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

        authFetch(`${API_URL}/api/hero-settings/texts`, {
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
        // Un texte resté identique au texte par défaut n'est pas enregistré : il suivra les futures évolutions du site.
        saveTexts(
            heroTitle.trim() === DEFAULT_HERO_TITLE ? '' : heroTitle,
            heroDescription.trim() === DEFAULT_HERO_DESCRIPTION ? '' : heroDescription,
            'Textes enregistrés.'
        );
    }

    function resetTexts() {
        saveTexts('', '', 'Textes par défaut rétablis.');
    }

    const hasCustomTexts = Boolean(savedTitle || savedDescription);
    const isModified =
        heroTitle !== (savedTitle || DEFAULT_HERO_TITLE) ||
        heroDescription !== (savedDescription || DEFAULT_HERO_DESCRIPTION);

    return (
        <form className='adminForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='adminIntro'>
                Textes du bloc de présentation du hero, en haut de la page d'accueil.
                Un champ vidé retrouve son texte par défaut.
            </p>

            <div className='adminCard'>
                <AdminField
                    id='inputHeroTitle'
                    label='Titre principal (H1)'
                    hint='Une à deux phrases courtes, affichées en gras.'
                    value={heroTitle}
                    onChange={(value) => { setHeroTitle(value); setStatusMessage(''); }}
                    multiline
                    rows={3}
                    maxLength={MAX_TITLE_LENGTH}
                />

                <AdminField
                    id='inputHeroDescription'
                    label="Texte d'accroche"
                    hint='Paragraphe sous le titre : à qui vous vous adressez, ce que vous proposez, où.'
                    value={heroDescription}
                    onChange={(value) => { setHeroDescription(value); setStatusMessage(''); }}
                    multiline
                    rows={9}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                />
            </div>

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
                        {statusMessage}
                    </p>
                )}
            </div>
        </form>
    )
}

export default HeroTextsForm
