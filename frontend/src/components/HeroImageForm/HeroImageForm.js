import './HeroImageForm.scss'
import Loader from '../Loader/Loader'
import ConfirmBox from '../ConfirmBox/ConfirmBox'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function HeroImageForm ({
    heroSettings,
    defaultHeroImageUrl,
    handleLoadHeroSettings,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const [newHeroFiles, setNewHeroFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [confirmBoxState, setConfirmBoxState] = useState(false);
    const [pendingDeletion, setPendingDeletion] = useState(null);

    const inputHeroImagesRef = useRef(null);

    const heroImages = heroSettings?.images ?? [];

    // Libère les aperçus locaux dès qu'ils sont remplacés ou que le composant disparaît.
    useEffect(() => {
        return () => {
            previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
        };
    }, [previewUrls]);

    function handleFilesChange(event) {
        const files = Array.from(event.target.files || []);

        setNewHeroFiles(files);
        setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    }

    function cancelNewHeroFiles() {
        setNewHeroFiles([]);
        setPreviewUrls([]);
        if (inputHeroImagesRef.current) {
            inputHeroImagesRef.current.value = '';
        }
    }

    function sendRequest(url, options, onSuccess) {
        setLoaderDisplay(true);

        // Authorization: `Bearer ${sessionStorage.getItem('1')}` à ajouter aux headers quand l'authentification sera réactivée
        fetch(`${API_URL}/api/hero-settings${url}`, options)
        .then((response) => {
            if (!response.ok) {
                return response.text().then((text) => {
                    throw new Error(`Erreur ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then(() => {
            if (onSuccess) {
                onSuccess();
            }
            handleLoadHeroSettings();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    function submitHeroImages() {
        if (newHeroFiles.length === 0) {
            return;
        }

        const heroFormData = new FormData();
        newHeroFiles.forEach((file) => heroFormData.append('hero', file));

        sendRequest('/images', { method: 'POST', body: heroFormData }, cancelNewHeroFiles);
    }

    function moveHeroImage(index, direction) {
        const newOrder = heroImages.map((image) => image._id);
        const targetIndex = index + direction;

        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];

        sendRequest('/images/order', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: newOrder }),
        });
    }

    function askDeletion(deletion) {
        setPendingDeletion(deletion);
        setConfirmBoxState(true);
    }

    function closeConfirmBox() {
        setConfirmBoxState(false);
    }

    function confirmDeletion() {
        if (pendingDeletion?.type === 'one') {
            sendRequest(`/images/${pendingDeletion.imageId}`, { method: 'DELETE' });
        } else if (pendingDeletion?.type === 'all') {
            sendRequest('', { method: 'DELETE' });
        }
        setPendingDeletion(null);
    }

    const defaultImagePreviewUrl = defaultHeroImageUrl ? `${API_URL}${defaultHeroImageUrl}` : null;

    return (
        <div className='heroImageForm'>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='heroImageForm_text'>
                <em>
                    {heroImages.length > 0
                        ? "Ces images remplacent l'image du premier projet en fond du hero. Si vous en mettez plusieurs, elles défilent automatiquement dans l'ordre ci-dessous. Conseil : 3 à 5 images maximum pour garder une page d'accueil rapide."
                        : "Aucune image personnalisée : l'image principale du premier projet est utilisée par défaut."}
                </em>
            </p>

            {heroImages.length > 0 ? (
                <ul className='heroImageForm_list'>
                    {heroImages.map((heroImage, index) => (
                        <li className='heroImageForm_list_item' key={heroImage._id}>
                            <img
                                className='heroImageForm_list_item_image'
                                src={`${API_URL}${heroImage.imageUrl}`}
                                alt={`Image ${index + 1} du hero`}
                            />
                            <p className='heroImageForm_list_item_index'>{index + 1} / {heroImages.length}</p>
                            <div className='heroImageForm_list_item_buttonsContainer'>
                                <button
                                    type='button'
                                    aria-label={`Déplacer l'image ${index + 1} vers le début`}
                                    disabled={index === 0}
                                    onClick={() => moveHeroImage(index, -1)}
                                >
                                    ←
                                </button>
                                <button
                                    type='button'
                                    aria-label={`Déplacer l'image ${index + 1} vers la fin`}
                                    disabled={index === heroImages.length - 1}
                                    onClick={() => moveHeroImage(index, 1)}
                                >
                                    →
                                </button>
                                <button
                                    type='button'
                                    aria-label={`Supprimer l'image ${index + 1}`}
                                    onClick={() => askDeletion({ type: 'one', imageId: heroImage._id })}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                defaultImagePreviewUrl && (
                    <div className='heroImageForm_sampleContainer'>
                        <img
                            className='heroImageForm_sampleContainer_image'
                            src={defaultImagePreviewUrl}
                            alt="Image du hero utilisée par défaut"
                        />
                    </div>
                )
            )}

            {previewUrls.length > 0 && (
                <>
                    <p className='heroImageForm_text'>
                        <em>Images sélectionnées, pas encore enregistrées :</em>
                    </p>
                    <ul className='heroImageForm_list'>
                        {previewUrls.map((previewUrl, index) => (
                            <li className='heroImageForm_list_item' key={previewUrl}>
                                <img
                                    className='heroImageForm_list_item_image'
                                    src={previewUrl}
                                    alt={`Aperçu de l'image sélectionnée ${index + 1}`}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <div className='heroImageForm_buttonsContainer'>
                <label
                    htmlFor='inputHeroImages'
                    className='heroImageForm_buttonsContainer_uploadLabel'
                >
                    {newHeroFiles.length > 0 ? 'CHANGER LA SÉLECTION' : '+ AJOUTER DES IMAGES'}
                </label>
                <input
                    type='file'
                    id='inputHeroImages'
                    ref={inputHeroImagesRef}
                    accept='image/*'
                    multiple
                    onChange={handleFilesChange}
                    hidden
                />

                {newHeroFiles.length > 0 && (
                    <>
                        <button aria-label="Enregistrer les images du hero" type='button' onClick={submitHeroImages}>
                            ENREGISTRER
                        </button>
                        <button aria-label="Annuler la sélection d'images du hero" type='button' onClick={cancelNewHeroFiles}>
                            ANNULER
                        </button>
                    </>
                )}

                {newHeroFiles.length === 0 && heroImages.length > 0 && (
                    <button
                        aria-label="Supprimer toutes les images du hero et revenir à l'image par défaut"
                        type='button'
                        onClick={() => askDeletion({ type: 'all' })}
                    >
                        RÉINITIALISER PAR DÉFAUT
                    </button>
                )}
            </div>

            <ConfirmBox
                confirmBoxState={confirmBoxState}
                affirmativeChoice={confirmDeletion}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default HeroImageForm
