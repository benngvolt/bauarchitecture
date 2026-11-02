import React from 'react'


function EditProcessStepsList ({
    processSteps,
    handleEditProcessStep,
    }) {

    return (
        <div className='editProcessStepsList'>
            <ul className='adminCardList adminCardList--compact'>
                {processSteps.map((processStep, index)=>(
                <li key={processStep._id}>
                    <p className='adminCardList_index'>Étape 0{index + 1}</p>
                    <p className='adminCardList_title'>{processStep.title}</p>
                    <p className='adminCardList_text'>{processStep.tagline}</p>
                    <div className='adminCardList_actions'>
                        <button
                            type='button'
                            className='adminButton adminButton--secondary adminButton--small'
                            aria-label={`Modifier l'étape ${processStep.title}`}
                            onClick={() => {
                                handleEditProcessStep(processStep);
                            }}
                        >
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
