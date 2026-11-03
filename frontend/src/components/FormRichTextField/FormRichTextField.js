import './FormRichTextField.scss';
import '../../utils/trix.scss';
import 'trix';
import React, { forwardRef } from 'react';

// variant='admin' : libellé au-dessus et aide, dans le style des champs du tableau de bord.
// withLinks : la barre d'outils propose aussi le lien hypertexte, le titre et la liste à puces.
const FormRichTextField = forwardRef(
  ({ htmlFor, label, hint, type, id, name, value, variant, withLinks }, ref) => {
    const isAdmin = variant === 'admin';

    return (
      <div
        className={[
          'formRichtextField',
          isAdmin && 'formRichtextField--admin adminField',
          withLinks && 'formRichtextField--rich',
        ].filter(Boolean).join(' ')}
      >
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
