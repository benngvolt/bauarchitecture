import './FormImageField.scss';
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../../utils/constants';

const FormImageField = ({ htmlFor, label, type, id, name, imageFiles, setImageFiles }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [newImage, setNewImage] = useState(null);

    const inputImageRef = useRef(null);
    const inputSampleImageRef = useRef(null);

    function displaySample() {
        const image = inputImageRef.current.files[0];

        if (image) {
            const imageId = uuidv4();

            image._id = imageId;
            image.sampleImageUrl = URL.createObjectURL(image);

            setNewImage(image);
            setIsImageLoaded(true);

            
            inputSampleImageRef.current.src = image.sampleImageUrl;
            inputSampleImageRef.current.alt = '';
        } else {
            setIsImageLoaded(false);
        }
    }

    function cancelAddImageFile() {
        if (newImage?.sampleImageUrl) {
            URL.revokeObjectURL(newImage.sampleImageUrl);
        }

        setNewImage(null);
        setIsImageLoaded(false);

        if (inputImageRef.current) {
            inputImageRef.current.value = '';
        }

        if (inputSampleImageRef.current) {
            inputSampleImageRef.current.src = '';
            inputSampleImageRef.current.alt = '';
        }
    }

    function handleAddImageFile() {
        if (newImage) {
            setImageFiles([...(imageFiles || []), newImage]);
        }

        setIsImageLoaded(false);
        cancelAddImageFile();
    }

    return (
        <div className='formImageField'>
            <label
                htmlFor={htmlFor}
                className='formImageField_label'
            >
                {isImageLoaded ? "CHANGER D'IMAGE" : '+ AJOUTER UNE IMAGE'}
            </label>

            <input
                type={type}
                id={id}
                name={name}
                ref={inputImageRef}
                onChange={displaySample}
                style={{ display: 'none' }}
                className='formImageField_input'
            />

            <div className='formImageField_sampleContainer'>
                <img
                    className='formImageField_sampleContainer_image'
                    ref={inputSampleImageRef}
                    id='sample'
                    src=''
                    alt=''
                />

                {isImageLoaded === true && (
                    <div className='formImageField_sampleContainer_buttonsContainer'>
                        <button
                            aria-label="Ajouter l'image"
                            onClick={handleAddImageFile}
                            type='button'
                        >
                            AJOUTER
                        </button>

                        <button
                            aria-label='Annuler'
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