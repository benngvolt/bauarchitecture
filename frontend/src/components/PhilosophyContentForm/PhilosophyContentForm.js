import './PhilosophyContentForm.scss'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function PhilosophyContentForm ({
    philosophyContent,
    defaultImageUrl,
    handleLoadPhilosophyContent,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const [text, setText] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const inputTextRef = useRef(null);
    const inputImageRef = useRef(null);

    useEffect(() => {
        setText(philosophyContent?.text || '');
    }, [philosophyContent]);

    useEffect(() => {
        const editor = document.querySelector(
            'trix-editor[input="inputPhilosophyText"]'
        );

        if (editor?.editor) {
            editor.editor.setSelectedRange([0, 0]);
            editor.editor.loadHTML(text || '');
        }
    }, [text]);

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

    function resetImage() {
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/philosophy-content/image`, {
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
            handleLoadPhilosophyContent();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error(error);
            setLoaderDisplay(false);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);

        const richTextHtml = inputTextRef.current?.value || '';

        if (richTextHtml.replace(/<[^>]*>/g, '').trim().length === 0) {
            setLoaderDisplay(false);
            return;
        }

        const philosophyFormData = new FormData();
        philosophyFormData.append('text', richTextHtml);

        if (newImageFile) {
            philosophyFormData.append('philosophy', newImageFile);
        }

        fetch(`${API_URL}/api/philosophy-content`, {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: philosophyFormData,
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
            handleLoadPhilosophyContent();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    const displayedImageUrl = previewUrl
        || (philosophyContent?.imageUrl ? `${API_URL}${philosophyContent.imageUrl}` : null)
        || defaultImageUrl;

    return (
        <div className='philosophyContentForm'>
            {loaderDisplay === true &&
                <Loader />
            }

            <form className='projectForm' onSubmit={handleSubmit} method='post'>
                <div className='projectForm_form'>
                    <FormRichTextField
                        htmlFor='inputPhilosophyText'
                        label='TEXTE DE LA SECTION'
                        type='hidden'
                        id='inputPhilosophyText'
                        ref={inputTextRef}
                        name='philosophyText'
                        value={text}
                    />

                    <div className='philosophyContentForm_imageField'>
                        <p className='philosophyContentForm_imageField_text'>
                            <em>
                                {philosophyContent?.imageUrl
                                    ? "Cette image remplace la photo par défaut."
                                    : "Aucune image personnalisée : la photo par défaut est utilisée."}
                            </em>
                        </p>

                        <div className='philosophyContentForm_imageField_sampleContainer'>
                            {displayedImageUrl && (
                                <img
                                    className='philosophyContentForm_imageField_sampleContainer_image'
                                    src={displayedImageUrl}
                                    alt="Prévisualisation de l'image de la section"
                                />
                            )}
                        </div>

                        <div className='philosophyContentForm_imageField_buttonsContainer'>
                            <label
                                htmlFor='inputPhilosophyImage'
                                className='philosophyContentForm_imageField_buttonsContainer_uploadLabel'
                            >
                                {newImageFile ? "CHANGER D'IMAGE" : '+ CHOISIR UNE IMAGE'}
                            </label>
                            <input
                                type='file'
                                id='inputPhilosophyImage'
                                ref={inputImageRef}
                                accept='image/*'
                                onChange={handleFileChange}
                                hidden
                            />

                            {newImageFile && (
                                <button aria-label="Annuler la nouvelle image" type='button' onClick={cancelNewImageFile}>
                                    ANNULER LA NOUVELLE IMAGE
                                </button>
                            )}

                            {!newImageFile && philosophyContent?.imageUrl && (
                                <button aria-label="Réinitialiser l'image par défaut" type='button' onClick={resetImage}>
                                    RÉINITIALISER L'IMAGE PAR DÉFAUT
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='projectForm_submitButton'>
                    <button type='submit'>ENREGISTRER</button>
                </div>
            </form>
        </div>
    )
}

export default PhilosophyContentForm
