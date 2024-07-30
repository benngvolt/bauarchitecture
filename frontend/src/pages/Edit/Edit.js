import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import { ProjectsContext } from '../../utils/ProjectsContext'
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList'
import React, { useContext, useState, useEffect } from 'react'

function Edit () {

    const { handleLoadProjects, projects, loaderDisplay, setLoaderDisplay, setDisplayNavSection } = useContext(ProjectsContext);
    const [projectFormMode, setProjectFormMode] = useState('add');
    const [projectsList, setProjectsList] = useState(projects);
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectEdit, setProjectEdit] = useState(null)

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);
    
    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);


    // OUVERTURE MODE MODIF
    async function handleEditProject(project) {
        try {
            setProjectEdit(project);
            handleLoadProjects();
            setDisplayProjectForm(true);
            setProjectFormMode('edit');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <main className='edit'>
            <div className='edit_projectsListContainer'>
                <EditProjectsList
                    projects={projectsList}
                    handleEditProject={handleEditProject}
                    handleLoadProjects={handleLoadProjects}
                    setDisplayProjectForm={setDisplayProjectForm}
                    displayProjectForm={displayProjectForm}
                    loaderDisplay={loaderDisplay} 
                    setLoaderDisplay={setLoaderDisplay}
                />
                <button 
                    className='edit_projectsListContainer_addButton'
                    onClick={() => { 
                        setDisplayProjectForm(true);
                        setProjectFormMode("add");
                }}>+ AJOUTER UN PROJET +</button>
            </div>
            {displayProjectForm===true &&
            <ProjectForm
                projectFormMode={projectFormMode} 
                setProjectFormMode={setProjectFormMode}
                handleLoadProjects={handleLoadProjects}
                setDisplayProjectForm={setDisplayProjectForm}
                displayProjectForm={displayProjectForm}
                projectEdit={projectEdit}
                setProjectEdit={setProjectEdit}
                loaderDisplay={loaderDisplay} 
                setLoaderDisplay={setLoaderDisplay}
            />
        }
        </main>
    )
}

export default Edit