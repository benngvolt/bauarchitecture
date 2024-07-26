import './FormImageField.scss'
import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormImageField = (({htmlFor, label, type, id, name, imageFiles, setImageFiles}) => {
  
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [newImage, setNewImage] = useState(null);

    const inputImageRef = useRef(null);
    const inputSampleImageRef = useRef(null);

    //CHARGEMENT DE L'IMAGE
    function displaySample() {
        const image = inputImageRef.current.files[0];
        if (image) {
            setNewImage (image);
            const id = uuidv4(); 
            // Générez un identifiant unique
            image._id = id;
            image.sampleImageUrl= URL.createObjectURL(image);
            inputSampleImageRef.current.setAttribute("src", image.sampleImageUrl);
            inputSampleImageRef.current.setAttribute("alt", "");
            setIsImageLoaded(true);
        } else {
            setIsImageLoaded(false);
        }
    }
    function cancelAddImageFile() {
        setNewImage (null);
        setIsImageLoaded(false);
        inputSampleImageRef.current.setAttribute("src", "");
        inputSampleImageRef.current.setAttribute("alt", "");
    }
    function handleAddImageFile() {
        if (newImage) {
            const updatedImageFiles = [...imageFiles, newImage];
            setImageFiles(updatedImageFiles);
        }
        //ON SE RETROUVE AVEC UN TABLEAU IMAGEFILES COMPRENANT DES IMAGES EN INSTANCES DE FILES ET DES IMAGES AVEC URL
        setIsImageLoaded(false);
        cancelAddImageFile();
    }

    return (
        <div>
            <p>{label}</p>
            <label htmlFor={htmlFor}>
                { isImageLoaded ? 'CHANGER D\'IMAGE' : '+ AJOUTER UNE IMAGE' }
            </label>
            <input type={type} id={id} name={name} ref={inputImageRef} onChange={displaySample} style={{ display: 'none' }}></input>
            <div>
                <img ref={inputSampleImageRef} id='sample' src='' alt=''/>
                <div 
                className={isImageLoaded ? "projectForm_projectImageField_imageFile_sampleContainer_buttonsSystem--displayOn" :  "projectForm_projectImageField_imageFile_sampleContainer_buttonsSystem--displayOff"}
                >
                    <button aria-label="Ajouter l'image" onClick={handleAddImageFile} type="button">AJOUTER</button>
                    <button aria-label="Annuler" onClick={cancelAddImageFile} type="button">ANNULER</button>
                </div>
            </div>
        </div>
    )

})

export default FormImageField