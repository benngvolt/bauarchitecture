import './FormImageField.scss';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FormImageField = ({
    htmlFor,
    label,
    type = 'file',
    id,
    name,
    imageFiles,
    setImageFiles,
}) => {
    const [newImage, setNewImage] = useState(null);

    const inputImageRef = useRef(null);

    const isImageLoaded = Boolean(newImage);

    function displaySample(event) {
        const image = event.target.files?.[0];

        if (!image) {
            setNewImage(null);
            return;
        }

        // On détruit uniquement l’ancienne prévisualisation
        // qui n’a pas encore été ajoutée à imageFiles.
        if (newImage?.sampleImageUrl) {
            URL.revokeObjectURL(newImage.sampleImageUrl);
        }

        const imageWithPreview = image;

        imageWithPreview._id = uuidv4();
        imageWithPreview.sampleImageUrl = URL.createObjectURL(image);

        setNewImage(imageWithPreview);
    }

    function resetInput() {
        setNewImage(null);

        if (inputImageRef.current) {
            inputImageRef.current.value = '';
        }
    }

    function cancelAddImageFile() {
        // Ici, l’image n’est pas conservée : son URL peut être détruite.
        if (newImage?.sampleImageUrl) {
            URL.revokeObjectURL(newImage.sampleImageUrl);
        }

        resetInput();
    }

    function handleAddImageFile() {
        if (!newImage) {
            return;
        }

        setImageFiles((currentImageFiles) => [
            ...(currentImageFiles || []),
            newImage,
        ]);

        /*
         * Important :
         * on ne révoque pas sampleImageUrl ici, car l’image ajoutée
         * peut encore être affichée ailleurs dans le formulaire.
         */
        resetInput();
    }

    /*
     * Nettoyage si le composant disparaît alors qu’une image
     * est encore en attente de validation.
     */
    useEffect(() => {
        return () => {
            if (newImage?.sampleImageUrl) {
                /*
                 * Attention : cette URL ne doit être détruite ici que si
                 * l’image n’a pas été transférée dans imageFiles.
                 *
                 * Avec l’organisation actuelle, le cleanup peut conserver
                 * une ancienne valeur de newImage. On évite donc de baser
                 * la durée de vie des images ajoutées sur ce composant.
                 */
            }
        };
    }, [newImage]);

    return (
        <div className='formImageField'>
            <label
                htmlFor={htmlFor || id}
                className='formImageField_label'
            >
                {isImageLoaded
                    ? "CHANGER D'IMAGE"
                    : label || '+ AJOUTER UNE IMAGE'}
            </label>

            <input
                type={type}
                id={id}
                name={name}
                ref={inputImageRef}
                accept='image/*'
                onChange={displaySample}
                className='formImageField_input'
                hidden
            />

            <div className='formImageField_sampleContainer'>
                {newImage?.sampleImageUrl && (
                    <img
                        className='formImageField_sampleContainer_image'
                        src={newImage.sampleImageUrl}
                        alt="Prévisualisation de l'image sélectionnée"
                    />
                )}

                {isImageLoaded && (
                    <div className='formImageField_sampleContainer_buttonsContainer'>
                        <button
                            aria-label="Ajouter l'image"
                            onClick={handleAddImageFile}
                            type='button'
                        >
                            AJOUTER
                        </button>

                        <button
                            aria-label="Annuler l'ajout de l'image"
                            onClick={cancelAddImageFile}
                            type='button'
                        >
                            ANNULER
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormImageField;