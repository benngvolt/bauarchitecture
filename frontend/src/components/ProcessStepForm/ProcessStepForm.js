import './ProcessStepForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


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

        fetch(`${API_URL}/api/process-steps/${processStepEdit._id}`, {
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
            <form className='projectForm' onSubmit={processStepFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayProcessStepForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputProcessStepTitle'}
                        label={'TITRE*'}
                        type={'text'}
                        id={'inputProcessStepTitle'}
                        ref={inputProcessStepTitleRef}
                        value={processStepTitle}
                        onChangeFunction={setProcessStepTitle}
                    />
                    <FormSimpleField
                        htmlFor={'inputProcessStepTagline'}
                        label={"PHRASE D'ACCROCHE*"}
                        type={'text'}
                        id={'inputProcessStepTagline'}
                        ref={inputProcessStepTaglineRef}
                        value={processStepTagline}
                        onChangeFunction={setProcessStepTagline}
                    />
                    <FormRichTextField
                        htmlFor={'inputProcessStepRichText'}
                        label={'PARAGRAPHE COMPLÉMENTAIRE (optionnel, affiché dans un bloc dépliable)'}
                        type={'hidden'}
                        id={'inputProcessStepRichText'}
                        ref={inputProcessStepRichTextRef}
                        name={'processStepRichText'}
                        value={processStepRichText}
                    />
                </div>
                <div className='projectForm_submitButton'>
                    <button type='submit'>ENVOYER</button>
                </div>
            </form>
        </div>
    )
}

export default ProcessStepForm
