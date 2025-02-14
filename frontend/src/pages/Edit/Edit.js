import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import TripForm from '../../components/TripForm/TripForm'
import { ProjectsContext } from '../../utils/ProjectsContext'
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList'
import EditTripsList from '../../components/EditTripsList/EditTripsList'
import React, { useContext, useState, useEffect } from 'react'

function Edit () {

    const { handleLoadProjects,
            handleLoadTrips, 
            projects, 
            trips,
            loaderDisplay, 
            setLoaderDisplay, 
            setDisplayNavSection } = useContext(ProjectsContext);

    const [projectFormMode, setProjectFormMode] = useState('add');
    const [projectsList, setProjectsList] = useState(projects);
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectEdit, setProjectEdit] = useState(null)
    const [tripFormMode, setTripFormMode] = useState('add');
    const [tripsList, setTripsList] = useState(trips);
    const [displayTripForm, setDisplayTripForm] = useState(false);
    const [tripEdit, setTripEdit] = useState(null)

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);
    
    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);

    useEffect(() => {
        setTripsList(trips)
    }, [trips]);


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

    // OUVERTURE MODE MODIF
    async function handleEditTrip(trip) {
        try {
            setTripEdit(trip);
            handleLoadTrips();
            setDisplayTripForm(true);
            setTripFormMode('edit');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <main className='edit'>
            {/* EDITION PROJETS */}
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

            {/* EDITION VOYAGES */}
            <div className='edit_tripsListContainer'>
                <EditTripsList
                    trips={tripsList}
                    handleEditTrip={handleEditTrip}
                    handleLoadTrips={handleLoadTrips}
                    setDisplayTripForm={setDisplayTripForm}
                    displayTripForm={displayTripForm}
                    loaderDisplay={loaderDisplay} 
                    setLoaderDisplay={setLoaderDisplay}
                />
                <button 
                    className='edit_tripsListContainer_addButton'
                    onClick={() => { 
                        setDisplayTripForm(true);
                        setTripFormMode("add");
                }}>+ AJOUTER UN VOYAGE +</button>
            </div>
            {displayTripForm===true &&
            <TripForm
                tripFormMode={tripFormMode} 
                setTripFormMode={setTripFormMode}
                handleLoadTrips={handleLoadTrips}
                setDisplayTripForm={setDisplayTripForm}
                displayTripForm={displayTripForm}
                tripEdit={tripEdit}
                setTripEdit={setTripEdit}
                loaderDisplay={loaderDisplay} 
                setLoaderDisplay={setLoaderDisplay}
            />
            }
        </main>
    )
}

export default Edit