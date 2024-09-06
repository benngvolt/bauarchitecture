import './ProjectForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
import FormCaptionField from '../FormCaptionField/FormCaptionField'
import React, { useState, useRef, useEffect } from 'react'
import FormSelectionField from '../FormSelectionField/FormSelectionField'
import FormRichTextField from '../FormRichTextField/FormRichTextField'
import FormImageField from '../FormImageField/FormImageField'
import DNDGallery from '../DNDGallery/DNDGallery'
import { API_URL } from '../../utils/constants'


function ProjectForm ({
        handleLoadProjects, 
        projectFormMode, 
        projectEdit, 
        setProjectEdit, 
        setDisplayProjectForm, 
        loaderDisplay, 
        setLoaderDisplay
    }) {

    
    const [projectTitle, setProjectTitle] = useState('')
    const [projectSubtitle, setProjectSubtitle] = useState('')
    const [projectType, setProjectType] = useState('')
    const [projectState, setProjectState] = useState('')
    const [projectDate, setProjectDate] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectPrice, setProjectPrice] = useState('')
    const [projectSurface, setProjectSurface] = useState('')
    const [imageFiles, setImageFiles] = useState ([])
    const [sketchFiles, setSketchFiles] = useState ([])
    const [caption, setCaption] = useState ('')
    const [mainImageIndex, setMainImageIndex] = useState(0)
    const [mainSketchIndex, setMainSketchIndex] = useState(0)
    const [captionIndex, setCaptionIndex] = useState(null)
    const [captionModalDisplay, setCaptionModalDisplay] = useState(false)

    const inputProjectTitleRef = useRef('');
    const inputProjectSubtitleRef = useRef(null);
    const inputProjectTypeRef = useRef(null);
    const inputProjectStateRef = useRef(null);
    const inputProjectDateRef = useRef(null);
    const inputProjectDescriptionRef = useRef(null)
    const inputProjectPriceRef = useRef(null)
    const inputProjectSurfaceRef = useRef(null)
    const inputImageCaptionRef = useRef(null);

    const projectTypes = ['réhabilitation', 'construction neuve', 'extension']
    const projectStates = ['en chantier', 'construit', 'esquisse']

    useEffect(() => {
        formatFields()
    }, [projectFormMode]);

    function formatFields() {
        
        if (projectFormMode === 'add') {
            setProjectTitle('');
            setProjectSubtitle('');
            setProjectDate('');
            setProjectType('');
            setProjectState('');
            setProjectDescription('');
            setProjectPrice('');
            setProjectSurface('');
            setMainImageIndex(0);
            setImageFiles([]);
            setSketchFiles([])
        } else {
            setProjectTitle(projectEdit.title);
            setProjectSubtitle(projectEdit.subtitle);
            setProjectDate(projectEdit.creationDate);
            setProjectType(projectEdit.projectType);
            setProjectState(projectEdit.projectState);
            setProjectDescription(projectEdit.description);
            setProjectPrice(projectEdit.price);
            setProjectSurface(projectEdit.surface);
            setMainImageIndex(projectEdit.mainImageIndex ?? 0);
            setImageFiles(projectEdit.images ?? []);
            setSketchFiles(projectEdit.sketches ?? []);
        }
    }



    useEffect(() => {
        const element = document.getElementById("inputProjectDescription");
        if (element) {
            element.editor.setSelectedRange([0, 0]);
            element.editor.loadHTML(projectDescription); 
        }
    }, [projectDescription, projectFormMode]);

    function handleCaptionChange(index, newCaption) {

        console.log(index)
        setCaption(newCaption)
        // const updatedCaptions = [...sketchCaptions];
        // updatedCaptions[index] = newCaption;
        // setSketchCaptions(updatedCaptions);
    }

    function openCaptionModal(index) {
        setCaptionIndex(index);
        setCaption(sketchFiles[index].sketchCaption);
        setCaptionModalDisplay(true);
    }

    function closeCaptionModal() {
        setCaptionIndex(null);
        setCaption('');
        setCaptionModalDisplay(false);
    }

    function captionSubmit(index, value) {
        const updatedSketches = [...sketchFiles];
        updatedSketches[index].sketchCaption = value;
        setSketchFiles(updatedSketches);
        closeCaptionModal()
    }

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function projectFormSubmit(event) {
        event.preventDefault();
        setLoaderDisplay(true);
        // const token = window.sessionStorage.getItem('1');
        const projectFormData = new FormData();
        projectFormData.append('title', inputProjectTitleRef.current.value);
        projectFormData.append('subtitle', inputProjectSubtitleRef.current.value);
        projectFormData.append('creationDate', inputProjectDateRef.current.value);
        projectFormData.append('projectType', inputProjectTypeRef.current.value);
        projectFormData.append('projectState', inputProjectStateRef.current.value);
        projectFormData.append('description', inputProjectDescriptionRef.current.value);
        projectFormData.append('price', inputProjectPriceRef.current.value);
        projectFormData.append('surface', inputProjectSurfaceRef.current.value);
        projectFormData.append('mainImageIndex', mainImageIndex);

        const newImageFiles = Array.from(imageFiles);
        const newSketchFiles = Array.from(sketchFiles);
        
        const imagesWithIndex = newImageFiles.map((image, index) => ({
            index,
            image
        }));
        
        const sketchesWithIndex = newSketchFiles.map((sketch, index) => ({
            index,
            sketch
        }));

        imagesWithIndex.forEach(({ index, image }) => {
            if (image instanceof File) {
                projectFormData.append('images', image);
                projectFormData.append('fileIndexes', index)
            } else {
                projectFormData.append(`existingImages[${index}]`, JSON.stringify(image));
            }
        });

        sketchesWithIndex.forEach(({ index, sketch }) => {
            if (sketch instanceof File) {
                projectFormData.append('sketches', sketch);
                projectFormData.append('sketchFileIndexes', index)
            } else {
                projectFormData.append(`existingSketches[${index}]`, JSON.stringify(sketch));
            }
        });

        if (
            !inputProjectTitleRef.current.value ||
            !inputProjectTypeRef.current.value ||
            !inputProjectDateRef.current.value
        ) {
            setLoaderDisplay(false);
            // setDisplayError(true);
            return;
        }
        else {
            if (projectFormMode==='add') {
                fetch(`${API_URL}/api/projects`, {
                    method: "POST",
                    headers: {
                        //'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + token,
                    },
                    body: projectFormData,
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
                        handleLoadProjects();
                        setDisplayProjectForm(false)
                        setLoaderDisplay(false);
                        // openValidBox();
                    })
                    .catch((error) => {
                        console.error(error);
                        // setDisplayServerError(true);
                });
            } else if (projectFormMode==='edit') {
                console.log('edit')
                fetch(`${API_URL}/api/projects/${projectEdit._id}`, {
                    method: "PUT",
                    headers: {
                        // 'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + token,
                    },
                    body: projectFormData,
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
                        handleLoadProjects();
                        setDisplayProjectForm(false)
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
            <form className='projectForm' onSubmit={(event) => projectFormSubmit(event)} method="post">
                <div className='projectForm_closeButton'>
                    <button type='button' onClick={() => setDisplayProjectForm(false)}>X FERMER</button>
                </div>
                <div className='projectForm_form'>
                    <FormSimpleField
                        htmlFor={'inputProjectTitle'}
                        label={'TITRE*'}
                        type={'text'}
                        id={'inputProjectTitle'}
                        ref={inputProjectTitleRef}
                        value={projectTitle}
                        onChangeFunction={setProjectTitle}
                    /> 
                    <FormSimpleField
                        htmlFor={'inputProjectSubtitle'}
                        label={'SOUS-TITRE*'}
                        type={'text'}
                        id={'inputProjectSubtitle'}
                        ref={inputProjectSubtitleRef}
                        value={projectSubtitle}
                        onChangeFunction={setProjectSubtitle}
                    />
                    <FormSimpleField
                        htmlFor={'inputDate'}
                        label={'DATE DE LIVRAISON'}
                        type={'date'}
                        id={'inputDate'}
                        ref={inputProjectDateRef}
                        value={projectDate}
                        onChangeFunction={setProjectDate}
                    />
                    <FormSimpleField
                        htmlFor={'inputProjectPrice'}
                        label={'MONTANT DES TRAVAUX'}
                        type={'text'}
                        id={'inputProjectPrice'}
                        ref={inputProjectPriceRef}
                        value={projectPrice}
                        onChangeFunction={setProjectPrice}
                    />
                    <FormSimpleField
                        htmlFor={'inputProjectSurface'}
                        label={'SURFACE'}
                        type={'text'}
                        id={'inputProjectSurface'}
                        ref={inputProjectSurfaceRef}
                        value={projectSurface}
                        onChangeFunction={setProjectSurface}
                    />
                    <FormSelectionField
                        htmlFor={'inputProjectType'}
                        label={'TYPE DE PROJET*'}
                        type={'text'}
                        id={'inputProjectType'}
                        ref={inputProjectTypeRef}
                        value={projectType}
                        onChangeFunction={setProjectType}
                        selectionArray={projectTypes}
                    />
                    <FormSelectionField
                        htmlFor={'inputProjectState'}
                        label={'ÉTAT DU PROJET*'}
                        type={'text'}
                        id={'inputProjectState'}
                        ref={inputProjectStateRef}
                        value={projectState}
                        onChangeFunction={setProjectState}
                        selectionArray={projectStates}
                    />
                    <FormRichTextField
                        htmlFor={'inputProjectDescription'}
                        label={'DESCRIPTION DU PROJET'}
                        type={'hidden'}
                        id={'inputProjectDescription'}
                        ref={inputProjectDescriptionRef}
                        name={'projectDescription'}
                        value={projectDescription}
                    />
                    <div>
                        <p className='projectForm_form_title'><strong>GALLERIE D'OBJETS</strong></p>
                        <p className='projectForm_form_text'>
                            <em>C'est à cet endroit que tu crées ton cabinet de curiosités lié au projet. <br/>
                            Pense-le comme une table d'objets. Chaque objet peut-être un plan, un échantillon de matériaux, une esquisse... Part juste du principe qu'il est possible d'uploader une image en .png afin de donner la sensation de flottement de l'objet, c'est à dire avec fond transparent.<br/> 
                            Si tu uploades un autre format que le .png, alors l'image aura un fond blanc, pour donner l'idée d'un graphisme posé sur du papier. <br/>
                            Tu as la possiblité d'assigner un texte à chaque objet. Cela peut-être une brève description, une légende, ou un mot-clé.<br/>
                            Aussi tu peux changer, intervertir l'emplacement des images, avec un cliquer-glisser. <br/><br/>
                            <strong>N'oublies pas de réduire la taille des images, à 1500px maximum pour le côté le plus large. </strong></em> 
                        </p>
                    </div>
                    <DNDGallery
                        isCaptionFormAvailable={true}
                        imageFiles={sketchFiles} 
                        setImageFiles={setSketchFiles} 
                        mainImageIndex={mainSketchIndex} 
                        setMainImageIndex={setMainSketchIndex} 
                        displayClass={'grid'}
                        openCaptionModal={openCaptionModal}/>
                    <FormImageField
                        htmlFor={'inputSketch'}
                        label={'TÉLÉCHARGER UN CROQUIS'}
                        type={'file'}
                        id={'inputSketch'}
                        name={'sketch'}
                        imageFiles={sketchFiles}
                        setImageFiles={setSketchFiles}
                    />
                    <div>
                        <p className='projectForm_form_title'><strong>GALLERIE DE PHOTOS</strong></p>
                        <p className='projectForm_form_text'>
                            <em>Ici tu peux uploader les belles photos de réalisations, en haute définition, en ne dépassant pas 1900px pour le côté le plus long. <br/>
                            Il est recommandé d'uploader un format <strong>.webp</strong> pour optimiser les performances d'affichage du site. <br/>
                            Tu peux également intervertir les positions des photos dans la colonne, et choisir quelle sera la photo de couverture du projet pour la page d'accueil.</em> 
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
                        ref={inputImageCaptionRef}
                        value={caption}
                        onChangeFunction={handleCaptionChange}
                        index={captionIndex}
                        closeModal={closeCaptionModal}
                        captionSubmit={captionSubmit}
                        imageFiles={sketchFiles}
                    />
                </div>
                }
            </form>
        </div>
    )
}

export default ProjectForm