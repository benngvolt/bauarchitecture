import './FormRichTextField.scss'
import '../../utils/trix.scss'
import 'trix';
import React, { forwardRef } from 'react'
// import React, { useContext } from 'react'
// import { ProjectsContext } from '../../utils/ProjectsContext'

const FormRichTextField = forwardRef(({htmlFor, label, type, id, name, value}, ref) => {
  
    return (
        <div className='formRichtextField'>
            <label htmlFor={htmlFor}>{label}</label>
            <input id='trix' type={type} name={name} defaultValue={value} ref={ref}></input>
            <trix-editor 
                id={id}
                input='trix'   
            />
        </div>
    )

})

export default FormRichTextField