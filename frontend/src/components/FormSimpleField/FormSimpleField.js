import './FormSimpleField.scss'
import React, { forwardRef } from 'react'
// import React, { useContext } from 'react'
// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormSimpleField = forwardRef(({htmlFor, label, type, id, value, onChangeFunction}, ref) => {
    
    return (
        <div className='formSimpleField'>
            <label htmlFor={htmlFor}>{label}</label>
            {/* <input
                type={type}
                id={id}
                ref={ref}
                value={value}
                onChange={(e) => onChangeFunction(e)} // Pass the event, not just the value
            /> */}
            <input type={type} id={id} ref={ref} value={value} onChange={(e) => onChangeFunction(e.target.value)}></input>
            
        </div>
    )
})

export default FormSimpleField