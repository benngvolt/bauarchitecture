import './FormSelectionField.scss'
import React, { forwardRef } from 'react'
// import React, { useContext } from 'react'
// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormSelectionField = forwardRef(({htmlFor, label, id, value, onChangeFunction, selectionArray}, ref) =>{
    
    return (
        <div className='formSelectionField'>
            <label htmlFor={htmlFor}>{label}</label>
            <select id={id} 
                    ref={ref} 
                    name={label}
                    value={value} 
                    onChange={(e) => onChangeFunction(e.target.value)}>
                <option value=""></option>
                {selectionArray.map((selectionItem, index)=>(
                    <option key={selectionItem + index} value={selectionItem}>{selectionItem}</option>
                ))}
            </select>
        </div>
        
    )
})

export default FormSelectionField