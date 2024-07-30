import './ProjectForm.scss'
import FormSimpleField from '../FormSimpleField/FormSimpleField'
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
    const [mainImageIndex, setMainImageIndex] = useState(0)

    

    const inputProjectTitleRef = useRef('');
    const inputProjectSubtitleRef = useRef(null);
    const inputProjectTypeRef = useRef(null);
    const inputProjectStateRef = useRef(null);
    const inputProjectDateRef = useRef(null);
    const inputProjectDescriptionRef = useRef(null)
    const inputProjectPriceRef = useRef(null)
    const inputProjectSurfaceRef = useRef(null)

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
        }
    }


    useEffect(() => {
        const element = document.getElementById("inputProjectDescription");
        if (element) {
            element.editor.setSelectedRange([0, 0]);
            element.editor.loadHTML(projectDescription); 
        }
    }, [projectDescription, projectFormMode]);

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
        
        const imagesWithIndex = newImageFiles.map((image, index) => ({
            index,
            image
        }));

        imagesWithIndex.forEach(({ index, image }) => {
            if (image instanceof File) {
                projectFormData.append('images', image);
                projectFormData.append('fileIndexes', index)
            } else {
                projectFormData.append(`existingImages[${index}]`, JSON.stringify(image));
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
                <div>
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
                    <DNDGallery
                        imageFiles={imageFiles} 
                        setImageFiles={setImageFiles} 
                        mainImageIndex={mainImageIndex} 
                        setMainImageIndex={setMainImageIndex} 
                        displayClass={'grid'}/>
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
            </form>
        </div>
    )
}

export default ProjectForm