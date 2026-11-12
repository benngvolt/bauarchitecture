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
            multiline = false,
            rows = 4,
            maxLength,
        },
        ref
    ) => {
        return (
            <div className={multiline ? 'formSimpleField formSimpleField--multiline' : 'formSimpleField'}>
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
                ) : multiline ? (
                    <textarea
                        id={id}
                        ref={ref}
                        rows={rows}
                        maxLength={maxLength}
                        value={value}
                        onChange={(e) =>
                            onChangeFunction(e.target.value)
                        }
                    />
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