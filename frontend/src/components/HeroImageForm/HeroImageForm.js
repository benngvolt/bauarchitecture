import './HeroImageForm.scss'
import Loader from '../Loader/Loader'
import React, { useState, useRef } from 'react'
import { API_URL } from '../../utils/constants'


function HeroImageForm ({
    heroSettings,
    defaultHeroImageUrl,
    handleLoadHeroSettings,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const [newHeroFile, setNewHeroFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const inputHeroImageRef = useRef(null);

    function handleFileChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            setNewHeroFile(null);
            setPreviewUrl(null);
            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setNewHeroFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    function cancelNewHeroFile() {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setNewHeroFile(null);
        setPreviewUrl(null);
        if (inputHeroImageRef.current) {
            inputHeroImageRef.current.value = '';
        }
    }

    function submitHeroImage() {
        if (!newHeroFile) {
            return;
        }

        setLoaderDisplay(true);

        const heroFormData = new FormData();
        heroFormData.append('hero', newHeroFile);

        fetch(`${API_URL}/api/hero-settings`, {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: heroFormData,
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then((text) => {
                    throw new Error(`Erreur ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then(() => {
            cancelNewHeroFile();
            handleLoadHeroSettings();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    function resetHeroImage() {
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/hero-settings`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La requête a échoué');
            }
            return response.json();
        })
        .then(() => {
            handleLoadHeroSettings();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error(error);
            setLoaderDisplay(false);
        });
    }

    const displayedImageUrl = previewUrl
        || (heroSettings?.imageUrl ? `${API_URL}${heroSettings.imageUrl}` : null)
        || (defaultHeroImageUrl ? `${API_URL}${defaultHeroImageUrl}` : null);

    return (
        <div className='heroImageForm'>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='heroImageForm_text'>
                <em>
                    {heroSettings?.imageUrl
                        ? "Cette image remplace l'image du premier projet en fond du hero."
                        : "Aucune image personnalisée : l'image principale du premier projet est utilisée par défaut."}
                </em>
            </p>

            <div className='heroImageForm_sampleContainer'>
                {displayedImageUrl && (
                    <img
                        className='heroImageForm_sampleContainer_image'
                        src={displayedImageUrl}
                        alt="Prévisualisation de l'image du hero"
                    />
                )}
            </div>

            <div className='heroImageForm_buttonsContainer'>
                <label
                    htmlFor='inputHeroImage'
                    className='heroImageForm_buttonsContainer_uploadLabel'
                >
                    {newHeroFile ? "CHANGER D'IMAGE" : '+ CHOISIR UNE IMAGE'}
                </label>
                <input
                    type='file'
                    id='inputHeroImage'
                    ref={inputHeroImageRef}
                    accept='image/*'
                    onChange={handleFileChange}
                    hidden
                />

                {newHeroFile && (
                    <>
                        <button aria-label="Enregistrer l'image du hero" type='button' onClick={submitHeroImage}>
                            ENREGISTRER
                        </button>
                        <button aria-label="Annuler la nouvelle image du hero" type='button' onClick={cancelNewHeroFile}>
                            ANNULER
                        </button>
                    </>
                )}

                {!newHeroFile && heroSettings?.imageUrl && (
                    <button aria-label="Réinitialiser l'image du hero par défaut" type='button' onClick={resetHeroImage}>
                        RÉINITIALISER PAR DÉFAUT
                    </button>
                )}
            </div>
        </div>
    )
}

export default HeroImageForm
