import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

// Champ de formulaire du tableau de bord : libellé au-dessus, aide facultative, compteur de caractères.
// - multiline : vrai champ de texte, qui grandit avec son contenu (au moins `rows` lignes) ;
// - as='select' : liste déroulante (les <option> sont passées en children).
const AdminField = forwardRef(function AdminField(
    {
        id,
        label,
        hint,
        value,
        onChange,
        as,
        multiline = false,
        rows = 3,
        maxLength,
        type = 'text',
        placeholder,
        required = false,
        children,
    },
    forwardedRef
) {
    const localRef = useRef(null);
    const ref = forwardedRef || localRef;

    const autoGrow = useCallback(() => {
        const textarea = ref.current;
        if (!multiline || !textarea) return;

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [multiline, ref]);

    useEffect(() => {
        autoGrow();
    }, [value, autoGrow]);

    const hintId = hint ? `${id}Hint` : undefined;
    const length = (value ?? '').length;
    const showCounter = maxLength && (multiline || length > maxLength * 0.8);

    let control;
    if (as === 'select') {
        control = (
            <select
                id={id}
                ref={ref}
                className='adminField_control'
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-describedby={hintId}
            >
                {children}
            </select>
        );
    } else if (multiline) {
        control = (
            <textarea
                id={id}
                ref={ref}
                className='adminField_control adminField_control--multiline'
                rows={rows}
                value={value ?? ''}
                maxLength={maxLength}
                placeholder={placeholder}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                aria-describedby={hintId}
            />
        );
    } else {
        control = (
            <input
                id={id}
                ref={ref}
                className='adminField_control'
                type={type}
                value={value ?? ''}
                maxLength={maxLength}
                placeholder={placeholder}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                aria-describedby={hintId}
            />
        );
    }

    return (
        <div className='adminField'>
            {label && (
                <label className='adminField_label' htmlFor={id}>
                    {label}
                    {required && <span className='adminField_required' aria-hidden='true'> *</span>}
                </label>
            )}

            {hint && <p className='adminField_hint' id={hintId}>{hint}</p>}

            {control}

            {showCounter && (
                <p className='adminField_counter' aria-live='off'>
                    {length} / {maxLength}
                </p>
            )}
        </div>
    );
});

export default AdminField;
