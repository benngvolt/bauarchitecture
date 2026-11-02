import './FormRichTextField.scss';
import '../../utils/trix.scss';
import 'trix';
import React, { forwardRef } from 'react';

// variant='admin' : libellé au-dessus et aide, dans le style des champs du tableau de bord.
const FormRichTextField = forwardRef(
  ({ htmlFor, label, hint, type, id, name, value, variant }, ref) => {
    const isAdmin = variant === 'admin';

    return (
      <div className={isAdmin ? 'formRichtextField formRichtextField--admin adminField' : 'formRichtextField'}>
        <label className={isAdmin ? 'adminField_label' : undefined} htmlFor={htmlFor}>{label}</label>

        {isAdmin && hint && <p className='adminField_hint'>{hint}</p>}

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
