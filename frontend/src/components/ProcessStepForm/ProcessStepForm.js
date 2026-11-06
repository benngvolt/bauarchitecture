import AdminField from '../AdminUI/AdminField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'
import { authFetch } from '../../utils/auth'


function ProcessStepForm ({
        handleLoadProcessSteps,
        processStepEdit,
        setDisplayProcessStepForm,
        loaderDisplay,
        setLoaderDisplay
    }) {

    const [processStepTitle, setProcessStepTitle] = useState('')
    const [processStepTagline, setProcessStepTagline] = useState('')
    const [processStepRichText, setProcessStepRichText] = useState('')

    const inputProcessStepTitleRef = useRef(null);
    const inputProcessStepTaglineRef = useRef(null);
    const inputProcessStepRichTextRef = useRef(null);

    useEffect(() => {
        if (processStepEdit) {
            setProcessStepTitle(processStepEdit.title);
            setProcessStepTagline(processStepEdit.tagline);
            setProcessStepRichText(processStepEdit.richText || '');
        }
    }, [processStepEdit]);

    useEffect(() => {
        const editor = document.querySelector(
            'trix-editor[input="inputProcessStepRichText"]'
        );

        if (editor?.editor) {
            editor.editor.setSelectedRange([0, 0]);
            editor.editor.loadHTML(processStepRichText || '');
        }
    }, [processStepRichText]);

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function processStepFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);

        const richTextHtml = inputProcessStepRichTextRef.current?.value || '';

        if (
            !inputProcessStepTitleRef.current.value ||
            !inputProcessStepTaglineRef.current.value
        ) {
            setLoaderDisplay(false);
            return;
        }

        const processStepData = {
            title: inputProcessStepTitleRef.current.value,
            tagline: inputProcessStepTaglineRef.current.value,
            richText: richTextHtml,
        };

        authFetch(`${API_URL}/api/process-steps/${processStepEdit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(processStepData),
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
            handleLoadProcessSteps();
            setDisplayProcessStepForm(false);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    return (
        <div className='projectFormContainer'>
            <form className='adminModal adminModal--wide' onSubmit={processStepFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }

                <div className='adminModal_header'>
                    <h3>Modifier l'étape</h3>
                    <button
                        type='button'
                        className='adminButton adminButton--icon'
                        onClick={() => setDisplayProcessStepForm(false)}
                        aria-label='Fermer'
                        title='Fermer'
                    >
                        ✕
                    </button>
                </div>

                <AdminField
                    id='inputProcessStepTitle'
                    ref={inputProcessStepTitleRef}
                    label='Titre'
                    hint='Le mot-concept affiché en grand (Conseiller, Concevoir...).'
                    value={processStepTitle}
                    onChange={setProcessStepTitle}
                    maxLength={40}
                    required
                />

                <AdminField
                    id='inputProcessStepTagline'
                    ref={inputProcessStepTaglineRef}
                    label="Phrase d'accroche"
                    hint="Résumé de l'étape, toujours visible."
                    value={processStepTagline}
                    onChange={setProcessStepTagline}
                    multiline
                    rows={3}
                    maxLength={400}
                    required
                />

                <FormRichTextField
                    variant='admin'
                    htmlFor='inputProcessStepRichText'
                    label='Texte détaillé'
                    hint="Facultatif : s'ouvre dans une fenêtre pop-up quand on clique sur « + de détails ». Vide, le texte par défaut du site est utilisé."
                    type='hidden'
                    id='inputProcessStepRichText'
                    ref={inputProcessStepRichTextRef}
                    name='processStepRichText'
                    value={processStepRichText}
                />

                <div className='adminActions'>
                    <button type='submit' className='adminButton'>Enregistrer</button>
                    <button type='button' className='adminButton adminButton--text' onClick={() => setDisplayProcessStepForm(false)}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProcessStepForm
