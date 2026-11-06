import Loader from '../Loader/Loader'
import React, { useState, useRef } from 'react'
import { API_URL } from '../../utils/constants'
import { authFetch } from '../../utils/auth'


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
    previewMaxWidth,
    // Sans image par défaut (ex. second portrait), « réinitialiser » devient « supprimer ».
    emptyText,
    resetLabel = 'Réinitialiser par défaut',
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

        authFetch(uploadUrl, {
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

        authFetch(resetUrl, {
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
        <div className='adminForm'>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='adminIntro'>
                {currentImageUrl
                    ? (emptyText ? "Image en place." : "Cette image remplace l'image par défaut.")
                    : (emptyText || "Aucune image personnalisée : l'image par défaut est utilisée.")}
                {hint && ` ${hint}`}
            </p>

            {displayedImageUrl && (
                <div className='adminPreview' style={previewMaxWidth ? { maxWidth: previewMaxWidth } : undefined}>
                    <img
                        style={previewAspectRatio ? { aspectRatio: previewAspectRatio } : undefined}
                        src={displayedImageUrl}
                        alt={`Prévisualisation de ${label}`}
                    />
                </div>
            )}

            <div className='adminActions'>
                <label
                    htmlFor={`input${fieldName}`}
                    className='adminButton adminButton--secondary adminUpload'
                >
                    {newImageFile ? "Changer d'image" : '+ Choisir une image'}
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
                        <button aria-label={`Enregistrer ${label}`} type='button' className='adminButton' onClick={submitImage}>
                            Enregistrer
                        </button>
                        <button aria-label="Annuler la nouvelle image" type='button' className='adminButton adminButton--text' onClick={cancelNewImageFile}>
                            Annuler
                        </button>
                    </>
                )}

                {!newImageFile && currentImageUrl && (
                    <button aria-label={`${resetLabel} : ${label}`} type='button' className='adminButton adminButton--text' onClick={resetImage}>
                        {resetLabel}
                    </button>
                )}
            </div>
        </div>
    )
}

export default AboutPhotoForm
