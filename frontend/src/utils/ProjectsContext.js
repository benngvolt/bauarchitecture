import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([])
    const [trips, setTrips] = useState([])
    const [loadProjects, setLoadProjects] = useState(false)
    const [loadTrips, setLoadTrips] = useState(false)
    const [displayNavSection, setDisplayNavSection] = useState(false)
    const [loaderDisplay, setLoaderDisplay] = useState(false)
    const [welcomeDisplay, setWelcomeDisplay] = useState(false)
    const [currentPage, setCurrentPage] = useState('')

    /*---------------------------------------------
    ----- Chargement des projets et stockage ------
    ---------------------------------------------*/

    useEffect(() => {
        setLoaderDisplay(true);
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadProjects]);

    useEffect(() => {
        setLoaderDisplay(true);
        fetch(`${API_URL}/api/trips`)
            .then((res) => res.json())
            .then((data) => {
                setTrips(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadTrips]);

    useEffect(() => {
        setWelcomeDisplay(true);
        setTimeout(function() {
            // Faire disparaître l'élément
            setWelcomeDisplay(false);
        }, 3000); 
    }, []);

    const handleLoadProjects = () => { 
        setLoadProjects(loadProjects === false ? true : false);
    };

    const handleLoadTrips = () => { 
        setLoadTrips(loadTrips === false ? true : false);
    };
    
    return (
        <ProjectsContext.Provider value={{ 
                handleLoadProjects,
                projects,
                handleLoadTrips,
                trips,
                displayNavSection,
                setDisplayNavSection,
                loaderDisplay,
                setLoaderDisplay,
                welcomeDisplay,
                setWelcomeDisplay,
                currentPage,
                setCurrentPage
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}