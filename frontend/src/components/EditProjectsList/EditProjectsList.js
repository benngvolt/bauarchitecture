import './EditProjectsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan , faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function EditProjectsList ({projects, handleEditProject, handleLoadProjects}) {

    const [confirmBoxEPLState, setConfirmBoxEPLState] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxEPLState(false);
    }
    function openConfirmBox () {
        setConfirmBoxEPLState(true);
    }

    function deleteProject() {
        console.log(projectToDelete)
        fetch(`${API_URL}/api/projects/${projectToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
              },
        })
        .then ((response) => {
            if(response.ok) {
                console.log(response);
            }
            // setHandleDisplayProjectForm(false);
            setConfirmBoxEPLState (false);
            handleLoadProjects();
            setProjectToDelete (null);
        })
        .catch ((error)=>console.log(error.message))
    }

    return (
        <div>
            <p>
                PROJETS PUBLIÉS
            </p>
            <ul>
                {projects.map((project)=>(
                <li key={project._id}>
                    <p>{project.title}</p>
                    <div>
                        <button aria-label="Supprimer le projet" onClick={() => {
                            setProjectToDelete (project)
                            openConfirmBox()
                            }} 
                            type='button'><FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                        <button aria-label="Modifier le projet" onClick={() => {
                            handleEditProject(project);
                            }}><FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxEPLState}
                affirmativeChoice={deleteProject}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditProjectsList