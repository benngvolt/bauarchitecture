import './CurriculumContentForm.scss'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function CurriculumContentForm ({
    aboutPageContent,
    handleLoadAboutPageContent,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const [text, setText] = useState('');

    const inputTextRef = useRef(null);

    useEffect(() => {
        setText(aboutPageContent?.curriculumText || '');
    }, [aboutPageContent]);

    useEffect(() => {
        const editor = document.querySelector(
            'trix-editor[input="inputCurriculumText"]'
        );

        if (editor?.editor) {
            editor.editor.setSelectedRange([0, 0]);
            editor.editor.loadHTML(text || '');
        }
    }, [text]);

    function handleSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);

        const richTextHtml = inputTextRef.current?.value || '';

        if (richTextHtml.replace(/<[^>]*>/g, '').trim().length === 0) {
            setLoaderDisplay(false);
            return;
        }

        const formData = new FormData();
        formData.append('curriculumText', richTextHtml);

        fetch(`${API_URL}/api/about-page-content`, {
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
            handleLoadAboutPageContent();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    return (
        <div className='curriculumContentForm'>
            {loaderDisplay === true &&
                <Loader />
            }

            <form className='projectForm' onSubmit={handleSubmit} method='post'>
                <div className='projectForm_form'>
                    <FormRichTextField
                        htmlFor='inputCurriculumText'
                        label='TEXTE DU CV'
                        type='hidden'
                        id='inputCurriculumText'
                        ref={inputTextRef}
                        name='curriculumText'
                        value={text}
                    />
                </div>

                <div className='projectForm_submitButton'>
                    <button type='submit'>ENREGISTRER</button>
                </div>
            </form>
        </div>
    )
}

export default CurriculumContentForm
