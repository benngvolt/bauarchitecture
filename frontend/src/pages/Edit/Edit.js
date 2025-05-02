import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import TripForm from '../../components/TripForm/TripForm'
import Collapse from '../../components/Collapse/Collapse'
import DrawingForm from '../../components/DrawingForm/DrawingForm'
import { ProjectsContext } from '../../utils/ProjectsContext'
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList'
import EditTripsList from '../../components/EditTripsList/EditTripsList'
import EditDrawingsList from '../../components/EditDrawingsList/EditDrawingsList'
import React, { useContext, useState, useEffect } from 'react'

function Edit () {

    const { handleLoadProjects,
            handleLoadTrips, 
            handleLoadDrawings,
            drawings,
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
    const [tripEdit, setTripEdit] = useState(null);
    const [drawingFormMode, setDrawingFormMode] = useState('add');
    const [drawingsList, setDrawingsList] = useState(drawings);
    const [displayDrawingForm, setDisplayDrawingForm] = useState(false);
    const [drawingEdit, setDrawingEdit] = useState(null)

    useEffect(() => {
        setDisplayNavSection(false)
    }, []);
    
    useEffect(() => {
        setProjectsList(projects)
    }, [projects]);

    useEffect(() => {
        setTripsList(trips)
    }, [trips]);

    useEffect(() => {
        setDrawingsList(drawings)
    }, [drawings]);


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

    // OUVERTURE MODE MODIF
    async function handleEditDrawing(drawing) {
        try {
            setDrawingEdit(drawing);
            handleLoadDrawings();
            setDisplayDrawingForm(true);
            setDrawingFormMode('edit');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <main className='edit'>

            
                
            
            {/* EDITION PROJETS */}
            <Collapse title="GÉRER LES PROJETS">
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
            </Collapse>

            {/* EDITION VOYAGES */}
            <Collapse title="GÉRER LES VOYAGES">
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
            </Collapse>

        
            {/* EDITION DESSINS */}
            <Collapse title="GÉRER LES DESSINS">
                <div className='edit_drawingsListContainer'>
                    <EditDrawingsList
                        drawings={drawingsList}
                        handleEditDrawing={handleEditDrawing}
                        handleLoadDrawings={handleLoadDrawings}
                        setDisplayDrawingForm={setDisplayDrawingForm}
                        displayDrawingForm={displayDrawingForm}
                        loaderDisplay={loaderDisplay} 
                        setLoaderDisplay={setLoaderDisplay}
                    />
                    <button 
                        className='edit_drawingsListContainer_addButton'
                        onClick={() => { 
                            setDisplayDrawingForm(true);
                            setDrawingFormMode("add");
                    }}>+ AJOUTER UN CARNET DE DESSINS +</button>
                </div>
                {displayDrawingForm===true &&
                <DrawingForm
                    drawingFormMode={drawingFormMode} 
                    setDrawingFormMode={setDrawingFormMode}
                    handleLoadDrawings={handleLoadDrawings}
                    setDisplayDrawingForm={setDisplayDrawingForm}
                    displayDrawingForm={displayDrawingForm}
                    drawingEdit={drawingEdit}
                    setDrawingEdit={setDrawingEdit}
                    loaderDisplay={loaderDisplay} 
                    setLoaderDisplay={setLoaderDisplay}
                />
                }
            </Collapse>
        </main>
    )
}

export default Edit