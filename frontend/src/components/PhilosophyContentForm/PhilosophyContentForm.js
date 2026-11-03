import FormRichTextField from '../FormRichTextField/FormRichTextField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'
import { hasRichTextContent } from '../../utils/richText'


// Texte de présentation de la page À propos (les portraits ont leur propre panneau).
function PhilosophyContentForm ({
    aboutPageContent,
    handleLoadAboutPageContent,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const [text, setText] = useState('');

    const inputTextRef = useRef(null);

    useEffect(() => {
        setText(aboutPageContent?.philosophyText || '');
    }, [aboutPageContent]);

    useEffect(() => {
        const editor = document.querySelector(
            'trix-editor[input="inputPhilosophyText"]'
        );

        if (editor?.editor) {
            editor.editor.setSelectedRange([0, 0]);
            editor.editor.loadHTML(text || '');
        }
    }, [text]);

    function handleSubmit(event) {
        event.preventDefault();

        const richTextHtml = inputTextRef.current?.value || '';

        if (!hasRichTextContent(richTextHtml)) {
            return;
        }

        setLoaderDisplay(true);

        const philosophyFormData = new FormData();
        philosophyFormData.append('philosophyText', richTextHtml);

        fetch(`${API_URL}/api/about-page-content`, {
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
            handleLoadAboutPageContent();
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setLoaderDisplay(false);
        });
    }

    return (
        <form className='adminForm' onSubmit={handleSubmit} method='post'>
            {loaderDisplay === true &&
                <Loader />
            }

            <FormRichTextField
                variant='admin'
                htmlFor='inputPhilosophyText'
                label='Texte de présentation'
                hint="Affiché à droite des portraits, en haut de la page À propos."
                type='hidden'
                id='inputPhilosophyText'
                ref={inputTextRef}
                name='philosophyText'
                value={text}
            />

            <div className='adminActions'>
                <button type='submit' className='adminButton'>Enregistrer</button>
            </div>
        </form>
    )
}

export default PhilosophyContentForm
