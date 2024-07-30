import './EditProjectsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../utils/constants'


function EditProjectsList ({
    projects, 
    handleEditProject, 
    handleLoadProjects, 
    loaderDisplay, 
    setLoaderDisplay
    }) {

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
        setLoaderDisplay(true)
        fetch(`${API_URL}/api/projects/${projectToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
              },
        })
        .then ((response) => {
            if(response.ok) {
                setLoaderDisplay(false)
                console.log(response);
            }
            // setHandleDisplayProjectForm(false);
            setConfirmBoxEPLState (false);
            handleLoadProjects();
            setProjectToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editProjectList'>
            <ul className='editProjectList_list'>
                {projects.map((project)=>(
                <li className='editProjectList_list_item' key={project._id}>
                    <img src={project.images[project.mainImageIndex].imageUrl}/>
                    <p className='editProjectList_list_item_title'>{project.title}</p>
                    <div className='editProjectList_list_item_buttonsContainer'>
                        <button aria-label="Supprimer le projet" onClick={() => {
                            setProjectToDelete (project)
                            openConfirmBox()
                            }} 
                            type='button'>
                            Supprimer
                        </button>
                        <button aria-label="Modifier le projet" onClick={() => {
                            handleEditProject(project);
                            }}>
                            Modifier
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