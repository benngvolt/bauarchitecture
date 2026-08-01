import './FaqItemForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function FaqItemForm ({
        handleLoadFaqItems,
        faqItemFormMode,
        faqItemEdit,
        setDisplayFaqItemForm,
        loaderDisplay,
        setLoaderDisplay
    }) {

    const [faqQuestion, setFaqQuestion] = useState('')
    const [faqAnswer, setFaqAnswer] = useState('')

    const inputFaqQuestionRef = useRef(null);
    const inputFaqAnswerRef = useRef(null);

    useEffect(() => {
        formatFields()
    }, [faqItemFormMode]);

    function formatFields() {
        if (faqItemFormMode === 'add') {
            setFaqQuestion('');
            setFaqAnswer('');
        } else {
            setFaqQuestion(faqItemEdit.question);
            setFaqAnswer(faqItemEdit.answer);
        }
    }

    useEffect(() => {
        const editor = document.querySelector(
            'trix-editor[input="inputFaqAnswer"]'
        );

        if (editor?.editor) {
            editor.editor.setSelectedRange([0, 0]);
            editor.editor.loadHTML(faqAnswer || '');
        }
    }, [faqAnswer, faqItemFormMode]);

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function faqItemFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);

        const answerHtml = inputFaqAnswerRef.current?.value || '';

        if (!inputFaqQuestionRef.current.value || !answerHtml) {
            setLoaderDisplay(false);
            return;
        }

        const faqItemData = {
            question: inputFaqQuestionRef.current.value,
            answer: answerHtml,
        };

        if (faqItemFormMode === 'add') {
            fetch(`${API_URL}/api/faq-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faqItemData),
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
                handleLoadFaqItems();
                setDisplayFaqItemForm(false);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la requête :', error);
                setLoaderDisplay(false);
            });
        } else if (faqItemFormMode === 'edit') {
            fetch(`${API_URL}/api/faq-items/${faqItemEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faqItemData),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || `Erreur ${response.status}`);
                    });
                }
                return response;
            })
            .then(() => {
                handleLoadFaqItems();
                setDisplayFaqItemForm(false);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.error(error);
                setLoaderDisplay(false);
            });
        }
    }

    return (
        <div className='projectFormContainer'>
            <form className='projectForm' onSubmit={faqItemFormSubmit} method='post'>
                {loaderDisplay === true &&
                    <Loader />
                }
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayFaqItemForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputFaqQuestion'}
                        label={'QUESTION*'}
                        type={'text'}
                        id={'inputFaqQuestion'}
                        ref={inputFaqQuestionRef}
                        value={faqQuestion}
                        onChangeFunction={setFaqQuestion}
                    />
                    <FormRichTextField
                        htmlFor={'inputFaqAnswer'}
                        label={'RÉPONSE*'}
                        type={'hidden'}
                        id={'inputFaqAnswer'}
                        ref={inputFaqAnswerRef}
                        name={'faqAnswer'}
                        value={faqAnswer}
                    />
                </div>
                <div className='projectForm_submitButton'>
                    <button type='submit'>ENVOYER</button>
                </div>
            </form>
        </div>
    )
}

export default FaqItemForm
