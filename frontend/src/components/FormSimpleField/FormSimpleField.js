import './FormSimpleField.scss';
import React, { forwardRef } from 'react';

const FormSimpleField = forwardRef(
    (
        {
            htmlFor,
            label,
            type = 'text',
            id,
            value,
            onChangeFunction,
            options,
        },
        ref
    ) => {
        return (
            <div className='formSimpleField'>
                <label htmlFor={htmlFor}>{label}</label>

                {options ? (
                    <select
                        id={id}
                        ref={ref}
                        value={value}
                        onChange={(e) =>
                            onChangeFunction(e.target.value)
                        }
                    >
                        <option value=''>
                            Sélectionner...
                        </option>

                        {options.map((option) => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        id={id}
                        ref={ref}
                        value={value}
                        onChange={(e) =>
                            onChangeFunction(e.target.value)
                        }
                    />
                )}
            </div>
        );
    }
);

export default FormSimpleField;