import './AboutPhotoForm.scss'
import Loader from '../Loader/Loader'
import React, { useState, useRef } from 'react'
import { API_URL } from '../../utils/constants'


function AboutPhotoForm ({
    label,
    fieldName,
    currentImageUrl,
    defaultImageUrl,
    onUpdated,
    // Par défaut, le formulaire gère une photo de la page À propos ; ces propriétés le rendent réutilisable
    // pour une autre image (même principe : un champ fichier envoyé en PUT, et une route DELETE pour réinitialiser).
    uploadUrl = `${API_URL}/api/about-page-content`,
    resetUrl = `${API_URL}/api/about-page-content/${fieldName}`,
    hint,
    previewAspectRatio,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const [newImageFile, setNewImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const inputImageRef = useRef(null);

    function handleFileChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            setNewImageFile(null);
            setPreviewUrl(null);
            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setNewImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    function cancelNewImageFile() {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setNewImageFile(null);
        setPreviewUrl(null);
        if (inputImageRef.current) {
            inputImageRef.current.value = '';
        }
    }

    function submitImage() {
        if (!newImageFile) {
            return;
        }

        setLoaderDisplay(true);

        const formData = new FormData();
        formData.append(fieldName, newImageFile);

        fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: formData,
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
            cancelNewImageFile();
            onUpdated();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    function resetImage() {
        setLoaderDisplay(true);

        fetch(resetUrl, {
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
            onUpdated();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error(error);
            setLoaderDisplay(false);
        });
    }

    const displayedImageUrl = previewUrl
        || (currentImageUrl ? `${API_URL}${currentImageUrl}` : null)
        || defaultImageUrl;

    return (
        <div className='aboutPhotoForm'>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='aboutPhotoForm_text'>
                <em>
                    {currentImageUrl
                        ? "Cette image remplace la photo par défaut."
                        : "Aucune image personnalisée : la photo par défaut est utilisée."}
                    {hint && ` ${hint}`}
                </em>
            </p>

            <div className='aboutPhotoForm_sampleContainer'>
                {displayedImageUrl && (
                    <img
                        className='aboutPhotoForm_sampleContainer_image'
                        style={previewAspectRatio ? { aspectRatio: previewAspectRatio } : undefined}
                        src={displayedImageUrl}
                        alt={`Prévisualisation de ${label}`}
                    />
                )}
            </div>

            <div className='aboutPhotoForm_buttonsContainer'>
                <label
                    htmlFor={`input${fieldName}`}
                    className='aboutPhotoForm_buttonsContainer_uploadLabel'
                >
                    {newImageFile ? "CHANGER D'IMAGE" : '+ CHOISIR UNE IMAGE'}
                </label>
                <input
                    type='file'
                    id={`input${fieldName}`}
                    ref={inputImageRef}
                    accept='image/*'
                    onChange={handleFileChange}
                    hidden
                />

                {newImageFile && (
                    <>
                        <button aria-label={`Enregistrer ${label}`} type='button' onClick={submitImage}>
                            ENREGISTRER
                        </button>
                        <button aria-label="Annuler la nouvelle image" type='button' onClick={cancelNewImageFile}>
                            ANNULER
                        </button>
                    </>
                )}

                {!newImageFile && currentImageUrl && (
                    <button aria-label={`Réinitialiser ${label} par défaut`} type='button' onClick={resetImage}>
                        RÉINITIALISER PAR DÉFAUT
                    </button>
                )}
            </div>
        </div>
    )
}

export default AboutPhotoForm
