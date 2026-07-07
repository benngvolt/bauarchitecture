import './FormRichTextField.scss';
import '../../utils/trix.scss';
import 'trix';
import React, { forwardRef } from 'react';

const FormRichTextField = forwardRef(
  ({ htmlFor, label, type, id, name, value }, ref) => {
    return (
      <div className='formRichtextField'>
        <label htmlFor={htmlFor}>{label}</label>

        <input
          id={id}
          type={type}
          name={name}
          defaultValue={value || ''}
          ref={ref}
        />

        <trix-editor input={id} />
      </div>
    );
  }
);

export default FormRichTextField;