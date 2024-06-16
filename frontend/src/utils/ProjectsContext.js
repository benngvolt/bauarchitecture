import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
import { useLocation } from 'react-router-dom';
export const ProjectsContext = createContext();


export const ProjectsProvider = ({ children }) => {

    
    /*---------------------------------------------
    ----- Chargement des projets et stockage ------
    ---------------------------------------------*/

    // useEffect(() => {
    //     displayLoader();
    //     fetch(`${API_URL}/api/projects`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setProjects(data);
    //             hideLoader();
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //             hideLoader(); // Appel à hideLoader() pour gérer les erreurs
    //         });
    // }, [loadProjects]);

    // const handleLoadProjects = () => { 
    //     setLoadProjects(loadProjects === false ? true : false);
    // };

    const test = ["pomme", "fraise", "abricot"]

    
    return (
        <ProjectsContext.Provider value={{ 
                test
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}