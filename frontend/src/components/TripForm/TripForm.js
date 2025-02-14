import './TripForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import FormCaptionField from '../FormCaptionField/FormCaptionField'
import Loader from '../Loader/Loader'
import React, { useState, useRef, useEffect} from 'react'
import FormSelectionField from '../FormSelectionField/FormSelectionField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import FormImageField from '../FormImageField/FormImageField'
import DNDGallery from '../DNDGallery/DNDGallery'
import { API_URL } from '../../utils/constants'


function TripForm ({
        handleLoadTrips, 
        tripFormMode, 
        tripEdit, 
        setTripEdit,
        setDisplayTripForm, 
        loaderDisplay, 
        setLoaderDisplay
    }) {

    
    const [tripTitle, setTripTitle] = useState('')
    const [tripDescription, setTripDescription] = useState('')
    const [imageFiles, setImageFiles] = useState ([])
    const [caption, setCaption] = useState ('')
    const [mainImageIndex, setMainImageIndex] = useState(0)
    const [captionIndex, setCaptionIndex] = useState(null)
    const [captionModalDisplay, setCaptionModalDisplay] = useState(false)

    const inputTripTitleRef = useRef(null);
    const inputTripDescriptionRef = useRef(null)
    const inputTripCaptionRef = useRef(null);

    useEffect(() => {
        formatFields()
    }, [tripFormMode]);

    function formatFields() {
        
        if (tripFormMode === 'add') {
            setTripTitle('');
            setTripDescription('');
            setMainImageIndex(0);
            setImageFiles([]);
        } else {
            setTripTitle(tripEdit.title);
            console.log(tripEdit)
            setTripDescription(tripEdit.description);
            setMainImageIndex(tripEdit.mainImageIndex ?? 0);
            setImageFiles(tripEdit.trips ?? []);
        }
    }



    useEffect(() => {
        const element = document.getElementById("inputTripDescription");
        if (element) {
            element.editor.setSelectedRange([0, 0]);
            element.editor.loadHTML(tripDescription); 
        }
    }, [tripDescription, tripFormMode]);

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

    function tripFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);
        // const token = window.sessionStorage.getItem('1');
        const tripFormData = new FormData();
        tripFormData.append('title', inputTripTitleRef.current.value);
        tripFormData.append('description', inputTripDescriptionRef.current.value);
        tripFormData.append('mainImageIndex', mainImageIndex);

        const newImageFiles = Array.from(imageFiles);
        
        const imagesWithIndex = newImageFiles.map((image, index) => ({
            index,
            image
        }));

        console.log(imagesWithIndex)

        imagesWithIndex.forEach(({ index, image }) => {
            if (image instanceof File) {
                tripFormData.append('trips', image);
                tripFormData.append('fileIndexes', index)
            } else {
                tripFormData.append(`existingTrips[${index}]`, JSON.stringify(image));
            }
        });

        if (
            !inputTripTitleRef.current.value 
        ) {
            setLoaderDisplay(false);
            // setDisplayError(true);
            return;
        }
        else {
            if (tripFormMode==='add') {
                fetch(`${API_URL}/api/trips`, {
                    method: "POST",
                    headers: {
                        //'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + token,
                    },
                    body: tripFormData,
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
                        handleLoadTrips();
                        setDisplayTripForm(false);
                        setLoaderDisplay(false);
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la requête :", error);
                        setLoaderDisplay(false);
                    });
            } else if (tripFormMode==='edit') {
                fetch(`${API_URL}/api/trips/${tripEdit._id}`, {
                    method: "PUT",
                    headers: {
                        // 'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + token,
                    },
                    body: tripFormData,
                    })
                    .then((response) => {
                        if (response.ok) {
                            return response;
                        } else {
                            // setDisplayServerError(true);
                            throw new Error('La requête a échoué');
                        }
                    })
                    .then(()=> {
                        handleLoadTrips();
                        setDisplayTripForm(false)
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
            <form className='projectForm' onSubmit={(event) => tripFormSubmit(event)} method="post">
                {loaderDisplay===true &&
                    <Loader/>
                }
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayTripForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputTripTitle'}
                        label={'TITRE*'}
                        type={'text'}
                        id={'inputTripTitle'}
                        ref={inputTripTitleRef}
                        value={tripTitle}
                        onChangeFunction={setTripTitle}
                    /> 
                    <FormRichTextField
                        htmlFor={'inputTripDescription'}
                        label={'DESCRIPTION DU VOYAGE'}
                        type={'hidden'}
                        id={'inputTripDescription'}
                        ref={inputTripDescriptionRef}
                        name={'tripDescription'}
                        value={tripDescription}
                    />
                    <div>
                        <p className='projectForm_form_title'><strong>GALLERIE DE PHOTOS DE VOYAGES</strong></p>
                        <p className='projectForm_form_text'>
                            <em>Ici tu peux uploader les belles photos de voyages, en haute définition, en ne dépassant pas 1900px pour le côté le plus long. <br/>
                            Il est recommandé d'uploader un format <strong>.webp</strong> pour optimiser les performances d'affichage du site. <br/>
                            Tu peux également intervertir les positions des photos dans la colonne, et choisir quelle sera la photo de couverture du voyage.</em> 
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
                        ref={inputTripCaptionRef}
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

export default TripForm