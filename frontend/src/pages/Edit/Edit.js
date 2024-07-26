import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import { ProjectsContext } from '../../utils/ProjectsContext'
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList'
import React, { useContext, useState, useEffect } from 'react'

function Edit () {

    const { handleLoadProjects, projects } = useContext(ProjectsContext);
    const [projectFormMode, setProjectFormMode] = useState('add');
    const [projectsList, setProjectsList] = useState(projects);
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectEdit, setProjectEdit] = useState(null)
    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);


    // OUVERTURE MODE MODIF
    async function handleEditProject(project) {
        try {
            // await storeProject(project);
            setProjectEdit(project);
            handleLoadProjects();
            // setDisplayModal(true);
            setProjectFormMode('edit');
            // setMainImageIndex(project.mainImageIndex);
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <main>
            <div>
                <EditProjectsList
                    projects={projectsList}
                    handleEditProject={handleEditProject}
                    handleLoadProjects={handleLoadProjects}
                />
                <button onClick={() => { 
                        setDisplayProjectForm(true);
                        setProjectFormMode("add");
                }}>AJOUTER UN PROJET</button>
            </div>
            <ProjectForm
                projectFormMode={projectFormMode} 
                setProjectFormMode={setProjectFormMode}
                handleLoadProjects={handleLoadProjects}
                setDisplayProjectForm={setDisplayProjectForm}
                displayProjectForm={displayProjectForm}
                projectEdit={projectEdit}
                setProjectEdit={setProjectEdit}
            />
        </main>
    )
}

export default Edit