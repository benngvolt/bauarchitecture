import AdminField from '../AdminUI/AdminField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'
import { authFetch } from '../../utils/auth'
import { hasRichTextContent } from '../../utils/richText'

const ACCEPTED_IMAGE_TYPES = 'image/png,image/webp,image/jpeg';

// Création ou modification d'un objet du cabinet de curiosités : un nom, une photo et un texte enrichi (liens possibles).
// curiosityItemEdit : l'objet à modifier, ou null pour en créer un.
function CuriosityItemForm ({
        handleLoadCuriosityItems,
        curiosityItemEdit,
        setDisplayCuriosityItemForm,
        loaderDisplay,
        setLoaderDisplay
    }) {

    const isEdit = Boolean(curiosityItemEdit);

    const [name, setName] = useState(curiosityItemEdit?.name || '')
    const [newImageFile, setNewImageFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const inputNameRef = useRef(null);
    const inputImageRef = useRef(null);
    const inputRichTextRef = useRef(null);

    // Libère l'aperçu de la photo choisie quand elle change ou que le formulaire se ferme.
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    function handleFileChange(event) {
        const file = event.target.files?.[0];

        setErrorMessage('');
        setNewImageFile(file || null);
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    }

    function cancelNewImageFile() {
        setNewImageFile(null);
        setPreviewUrl(null);
        if (inputImageRef.current) {
            inputImageRef.current.value = '';
        }
    }

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function curiosityItemFormSubmit(event) {
        event.preventDefault();

        const richTextHtml = inputRichTextRef.current?.value || '';

        if (!name.trim()) {
            setErrorMessage("Le nom de l'objet est obligatoire.");
            return;
        }

        if (!isEdit && !newImageFile) {
            setErrorMessage("Choisis une photo pour l'objet.");
            return;
        }

        if (!hasRichTextContent(richTextHtml)) {
            setErrorMessage("Le texte de l'objet est obligatoire : c'est ce qui s'affiche quand on clique sur la photo.");
            return;
        }

        setErrorMessage('');
        setLoaderDisplay(true);

        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('richText', richTextHtml);
        if (newImageFile) {
            formData.append('object', newImageFile);
        }

        authFetch(isEdit ? `${API_URL}/api/curiosity-items/${curiosityItemEdit._id}` : `${API_URL}/api/curiosity-items`, {
            method: isEdit ? 'PUT' : 'POST',
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
            handleLoadCuriosityItems();
            setDisplayCuriosityItemForm(false);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setErrorMessage(error.message);
            setLoaderDisplay(false);
        });
    }

    const displayedImageUrl = previewUrl
        || (curiosityItemEdit?.imageUrl ? `${API_URL}${curiosityItemEdit.imageUrl}` : null);

    return (
        <div className='projectFormContainer'>
            <form className='adminModal adminModal--wide' onSubmit={curiosityItemFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }

                <div className='adminModal_header'>
                    <h3>{isEdit ? "Modifier l'objet" : 'Nouvel objet'}</h3>
                    <button
                        type='button'
                        className='adminButton adminButton--icon'
                        onClick={() => setDisplayCuriosityItemForm(false)}
                        aria-label='Fermer'
                        title='Fermer'
                    >
                        ✕
                    </button>
                </div>

                <AdminField
                    id='inputCuriosityItemName'
                    ref={inputNameRef}
                    label="Nom de l'objet"
                    hint="Non affiché : il décrit la photo (accessibilité, référencement) et sert à repérer l'objet dans la liste."
                    value={name}
                    onChange={setName}
                    maxLength={80}
                    required
                />

                <div className='adminField'>
                    <p className='adminField_label'>Photo<span className='adminField_required' aria-hidden='true'> *</span></p>
                    <p className='adminField_hint'>
                        PNG, WebP ou JPEG. Les PNG et WebP à fond transparent gardent leur transparence : la photo apparaît « posée » sur la page.
                    </p>

                    {displayedImageUrl && (
                        <div className='adminPreview adminPreview--transparent' style={{ maxWidth: 360 }}>
                            <img src={displayedImageUrl} alt={`Aperçu de la photo de l'objet ${name}`} />
                        </div>
                    )}

                    <div className='adminActions'>
                        <label
                            htmlFor='inputCuriosityItemImage'
                            className='adminButton adminButton--secondary adminUpload'
                        >
                            {displayedImageUrl ? 'Changer de photo' : '+ Choisir une photo'}
                        </label>
                        <input
                            type='file'
                            id='inputCuriosityItemImage'
                            ref={inputImageRef}
                            accept={ACCEPTED_IMAGE_TYPES}
                            onChange={handleFileChange}
                            hidden
                        />

                        {newImageFile && (
                            <button type='button' className='adminButton adminButton--text' onClick={cancelNewImageFile}>
                                Annuler la nouvelle photo
                            </button>
                        )}
                    </div>
                </div>

                <FormRichTextField
                    variant='admin'
                    withLinks
                    htmlFor='inputCuriosityItemRichText'
                    label='Texte'
                    hint="S'ouvre dans une fenêtre pop-up quand on clique sur la photo. La barre d'outils permet le gras, l'italique, un titre, une liste à puces et des liens hypertextes (sélectionner le texte, puis le bouton lien)."
                    type='hidden'
                    id='inputCuriosityItemRichText'
                    ref={inputRichTextRef}
                    name='richText'
                    value={curiosityItemEdit?.richText || ''}
                />

                {errorMessage && <p className='adminStatus adminStatus--error' role='alert'>{errorMessage}</p>}

                <div className='adminActions'>
                    <button type='submit' className='adminButton'>Enregistrer</button>
                    <button type='button' className='adminButton adminButton--text' onClick={() => setDisplayCuriosityItemForm(false)}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CuriosityItemForm
