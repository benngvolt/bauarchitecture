import './FormCaptionField.scss'
import React, { forwardRef } from 'react'
// import React, { useContext } from 'react'
// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormCaptionField = forwardRef(({htmlFor, label, type, id, value, onChangeFunction, index, closeModal, captionSubmit}, ref) => {
    
    return (
        <div className='formSimpleField'>
            <label htmlFor={htmlFor}>{label}</label>
            <input type={type} id={id} ref={ref} value={value} onChange={(e) => onChangeFunction(index, e.target.value)}></input>  
            <button type='button' onClick={() => captionSubmit(index, value)}>VALIDER</button>
            <button type='button' onClick={() => closeModal()}>FERMER</button>    
        </div>
    )
})

export default FormCaptionField