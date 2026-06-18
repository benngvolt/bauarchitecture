// import './FormCaptionField.scss'
// import React, { forwardRef, useEffect } from 'react'

// // import { ProjectsContext } from '../../utils/ProjectsContext'

// const FormCaptionField = forwardRef(({htmlFor, label, type, id, value, onChangeFunction, index, closeModal, captionSubmit, imageFiles}, ref) => {
    
    

//     // useEffect(() => {
//     //     console.log(imageFiles[index].imageUrl)
//     // }, []);

//     return (
//         <div className='formCaptionField'>
//             <img
//                 src={imageFiles[index].imageUrl}
//                 alt={`image ${index}`}/>
//             {/* <label htmlFor={htmlFor}>{label}</label> */}
//             <textarea type={type} id={id} ref={ref} value={value} onChange={(e) => onChangeFunction(index, e.target.value)}></textarea>  
//             <button type='button' onClick={() => captionSubmit(index, value)}>VALIDER</button>
//             <button type='button' onClick={() => closeModal()}>FERMER</button>    
//         </div>
//     )
// })

// export default FormCaptionField

import './FormCaptionField.scss';
import React, { forwardRef } from 'react';
import { API_URL } from '../../utils/constants';

const FormCaptionField = forwardRef(
    (
        {
            htmlFor,
            label,
            type,
            id,
            value,
            onChangeFunction,
            index,
            closeModal,
            captionSubmit,
            imageFiles,
        },
        ref
    ) => {
        const getMediaUrl = (url) => {
            if (!url) return '';
            if (url.startsWith('http')) return url;
            return `${API_URL}${url}`;
        };

        const imageUrl = imageFiles?.[index]?.imageUrl;

        return (
            <div className='formCaptionField'>
                {imageUrl && (
                    <img
                        src={getMediaUrl(imageUrl)}
                        alt={`image ${index}`}
                    />
                )}

                <textarea
                    type={type}
                    id={id}
                    ref={ref}
                    value={value}
                    onChange={(e) =>
                        onChangeFunction(index, e.target.value)
                    }
                />

                <button
                    type='button'
                    onClick={() => captionSubmit(index, value)}
                >
                    VALIDER
                </button>

                <button
                    type='button'
                    onClick={() => closeModal()}
                >
                    FERMER
                </button>
            </div>
        );
    }
);

export default FormCaptionField;