import './FormRichTextField.scss'
import 'trix';
import React, { forwardRef } from 'react'
// import React, { useContext } from 'react'
// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormRichTextField = forwardRef(({htmlFor, label, type, id, name, value}, ref) => {
  
    return (
        <div>
            <label htmlFor={htmlFor}>{label}</label>
            <input id={id} type={type} name={name} defaultValue={value} ></input>
            <trix-editor 
                id={htmlFor}
                input={id}
                ref={ref}
            />
        </div>
    )

})

export default FormRichTextField