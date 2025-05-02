import './DrawingForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import FormCaptionField from '../FormCaptionField/FormCaptionField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect} from 'react'
import FormSelectionField from '../FormSelectionField/FormSelectionField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import FormImageField from '../FormImageField/FormImageField'
import DNDGallery from '../DNDGallery/DNDGallery'
import { API_URL } from '../../utils/constants'


function DrawingForm ({
        handleLoadDrawings, 
        drawingFormMode, 
        drawingEdit, 
        setDrawingEdit,
        setDisplayDrawingForm, 
        loaderDisplay, 
        setLoaderDisplay
    }) {

    
    const [drawingTitle, setDrawingTitle] = useState('')
    const [drawingDescription, setDrawingDescription] = useState('')
    const [imageFiles, setImageFiles] = useState ([])
    const [caption, setCaption] = useState ('')
    const [mainImageIndex, setMainImageIndex] = useState(0)
    const [captionIndex, setCaptionIndex] = useState(null)
    const [captionModalDisplay, setCaptionModalDisplay] = useState(false)

    const inputDrawingTitleRef = useRef(null);
    const inputDrawingDescriptionRef = useRef(null)
    const inputDrawingCaptionRef = useRef(null);

    useEffect(() => {
        formatFields()
    }, [drawingFormMode]);

    function formatFields() {
        
        if (drawingFormMode === 'add') {
            setDrawingTitle('');
            setDrawingDescription('');
            setMainImageIndex(0);
            setImageFiles([]);
        } else {
            setDrawingTitle(drawingEdit.title);
            setDrawingDescription(drawingEdit.description);
            setMainImageIndex(drawingEdit.mainImageIndex ?? 0);
            setImageFiles(drawingEdit.drawings ?? []);
        }
    }



    useEffect(() => {
        const element = document.getElementById("inputDrawingDescription");
        if (element) {
            element.editor.setSelectedRange([0, 0]);
            element.editor.loadHTML(drawingDescription); 
        }
    }, [drawingDescription, drawingFormMode]);

    function handleCaptionChange(index, newCaption) {

        console.log(index)
        setCaption(newCaption)
        // const updatedCaptions = [...sketchCaptions];
        // updatedCaptions[index] = newCaption;
        // setSketchCaptions(updatedCaptions);
    }

    function openCaptionModal(index) {
        setCaptionIndex(index);
        setCaption(imageFiles[index].caption);
        setCaptionModalDisplay(true);
    }

    function closeCaptionModal() {
        setCaptionIndex(null);
        setCaption('');
        setCaptionModalDisplay(false);
    }

    function captionSubmit(index, value) {
        const updatedImages = [...imageFiles];
        updatedImages[index].caption = value;
        setImageFiles(updatedImages);
        closeCaptionModal()
    }

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function drawingFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);
        // const token = window.sessionStorage.getItem('1');
        const drawingFormData = new FormData();
        drawingFormData.append('title', inputDrawingTitleRef.current.value);
        drawingFormData.append('description', inputDrawingDescriptionRef.current.value);
        drawingFormData.append('mainImageIndex', mainImageIndex);

        const newImageFiles = Array.from(imageFiles);
        
        const imagesWithIndex = newImageFiles.map((image, index) => ({
            index,
            image
        }));

        imagesWithIndex.forEach(({ index, image }) => {
            if (image instanceof File) {
                drawingFormData.append('drawings', image);
                drawingFormData.append('fileIndexes', index)
            } else {
                drawingFormData.append(`existingDrawings[${index}]`, JSON.stringify(image));
            }
        });

        if (
            !inputDrawingTitleRef.current.value 
        ) {
            setLoaderDisplay(false);
            // setDisplayError(true);
            return;
        }
        else {
            if (drawingFormMode==='add') {
                fetch(`${API_URL}/api/drawings`, {
                    method: "POST",
                    headers: {
                        //'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + token,
                    },
                    body: drawingFormData,
                    })
                    .then((response) => {
                        console.log("Réponse brute :", response); // Affiche toute la réponse HTTP
                        if (!response.ok) {
                            return response.text().then(text => { 
                                throw new Error(`Erreur ${response.status}: ${text}`); 
                            });
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Réponse JSON :", data); // Afficher la réponse JSON si elle existe
                        handleLoadDrawings();
                        setDisplayDrawingForm(false);
                        setLoaderDisplay(false);
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la requête :", error);
                        setLoaderDisplay(false);
                    });
            } else if (drawingFormMode==='edit') {
                fetch(`${API_URL}/api/drawings/${drawingEdit._id}`, {
                    method: "PUT",
                    headers: {
                        // 'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + token,
                    },
                    body: drawingFormData,
                    })
                    .then((response) => {
                        if (response.ok) {
                            return response;
                        } else {
                            // Lire le corps de la réponse pour obtenir plus de détails
                            return response.text().then((errorText) => {
                                // Ou response.json() si la réponse est en JSON
                                throw new Error(`La requête a échoué : ${errorText}`);
                            });
                        }
                    })
                    .then(()=> {
                        handleLoadDrawings();
                        setDisplayDrawingForm(false)
                        setLoaderDisplay(false);
                        // openValidBox();
                    })
                    .catch((error) => {
                        console.error(error);
                        // setDisplayServerError(true);
                        setLoaderDisplay(false);
                });
            }
        }
    }

    return (
        <div className='projectFormContainer'>
            <form className='projectForm' onSubmit={(event) => drawingFormSubmit(event)} method="post">
                {loaderDisplay===true &&
                    <Loader/>
                }
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayDrawingForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputDrawingTitle'}
                        label={'TITRE*'}
                        type={'text'}
                        id={'inputDrawingTitle'}
                        ref={inputDrawingTitleRef}
                        value={drawingTitle}
                        onChangeFunction={setDrawingTitle}
                    /> 
                    <FormRichTextField
                        htmlFor={'inputDrawingDescription'}
                        label={'DESCRIPTION DES DESSINS'}
                        type={'hidden'}
                        id={'inputDrawingDescription'}
                        ref={inputDrawingDescriptionRef}
                        name={'drawingDescription'}
                        value={drawingDescription}
                    />
                    <div>
                        <p className='projectForm_form_title'><strong>GALLERIE DE DESSINS</strong></p>
                        <p className='projectForm_form_text'>
                            <em>Ici tu peux uploader les dessins, en haute définition, en ne dépassant pas 1900px pour le côté le plus long. <br/>
                            Il est recommandé d'uploader un format <strong>.webp</strong> pour optimiser les performances d'affichage du site. <br/>
                            Tu peux également intervertir les positions des images dans la colonne, et choisir quelle sera l'image de couverture du carnet de dessins.</em> 
                        </p>
                    </div>
                    <DNDGallery
                        isCaptionFormAvailable={false}
                        imageFiles={imageFiles} 
                        setImageFiles={setImageFiles} 
                        mainImageIndex={mainImageIndex} 
                        setMainImageIndex={setMainImageIndex} 
                        displayClass={'column'}
                        />
                    <FormImageField
                        htmlFor={'inputImage'}
                        label={'TÉLÉCHARGER UNE IMAGE'}
                        type={'file'}
                        id={'inputImage'}
                        name={'image'}
                        imageFiles={imageFiles}
                        setImageFiles={setImageFiles}
                    />
                </div>
                <div className='projectForm_submitButton'>
                    <button type='submit'>ENVOYER</button>
                    {/* <button type='button' onClick={() => setConfirmBoxState(true)}>SORTIR</button> */}
                </div>
                {captionModalDisplay===true &&
                <div className='projectForm_imageCaptionFormModal'>
                    <FormCaptionField
                        htmlFor={'inputSketchCaption'}
                        label={'LÉGENDE'}
                        type={'text'}
                        id={'inputSketchCaption'}
                        ref={inputDrawingCaptionRef}
                        value={caption}
                        onChangeFunction={handleCaptionChange}
                        index={captionIndex}
                        closeModal={closeCaptionModal}
                        captionSubmit={captionSubmit}
                        imageFiles={imageFiles}
                    />
                </div>
                }
            </form>
        </div>
    )
}

export default DrawingForm