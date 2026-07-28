import './EditProcessStepsList.scss'

import React from 'react'


function EditProcessStepsList ({
    processSteps,
    handleEditProcessStep,
    }) {

    return (
        <div className='editProcessStepsList'>
            <ul className='editProcessStepsList_list'>
                {processSteps.map((processStep, index)=>(
                <li className='editProcessStepsList_list_item' key={processStep._id}>
                    <p className='editProcessStepsList_list_item_index'>0{index + 1}</p>
                    <p className='editProcessStepsList_list_item_title'>{processStep.title}</p>
                    <p className='editProcessStepsList_list_item_tagline'>{processStep.tagline}</p>
                    <div className='editProcessStepsList_list_item_buttonsContainer'>
                        <button aria-label={`Modifier l'étape ${processStep.title}`} onClick={() => {
                            handleEditProcessStep(processStep);
                            }}>
                            Modifier
                        </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default EditProcessStepsList
