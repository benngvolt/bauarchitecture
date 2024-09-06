import './FormCaptionField.scss'
import React, { forwardRef, useEffect } from 'react'

// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormCaptionField = forwardRef(({htmlFor, label, type, id, value, onChangeFunction, index, closeModal, captionSubmit, imageFiles}, ref) => {
    
    

    // useEffect(() => {
    //     console.log(imageFiles[index].imageUrl)
    // }, []);

    return (
        <div className='formCaptionField'>
            <img
                src={imageFiles[index].imageUrl}
                alt={`image ${index}`}/>
            {/* <label htmlFor={htmlFor}>{label}</label> */}
            <textarea type={type} id={id} ref={ref} value={value} onChange={(e) => onChangeFunction(index, e.target.value)}></textarea>  
            <button type='button' onClick={() => captionSubmit(index, value)}>VALIDER</button>
            <button type='button' onClick={() => closeModal()}>FERMER</button>    
        </div>
    )
})

export default FormCaptionField