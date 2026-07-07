import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [articles, setArticles] = useState([]);
    const [drawings, setDrawings] = useState([]);

    const [loadProjects, setLoadProjects] = useState(false);
    const [loadArticles, setLoadArticles] = useState(false);
    const [loadDrawings, setLoadDrawings] = useState(false);

    const [displayNavSection, setDisplayNavSection] = useState(false);
    const [loaderDisplay, setLoaderDisplay] = useState(false);
    const [welcomeDisplay, setWelcomeDisplay] = useState(false);
    const [currentPage, setCurrentPage] = useState('');

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

        fetch(`${API_URL}/api/articles`)
            .then((res) => res.json())
            .then((data) => {
                setArticles(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadArticles]);

    useEffect(() => {
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/drawings`)
            .then((res) => res.json())
            .then((data) => {
                setDrawings(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadDrawings]);

    useEffect(() => {
        setWelcomeDisplay(true);

        setTimeout(function () {
            setWelcomeDisplay(false);
        }, 3000);
    }, []);

    const handleLoadProjects = () => {
        setLoadProjects(loadProjects === false ? true : false);
    };

    const handleLoadArticles = () => {
        setLoadArticles(loadArticles === false ? true : false);
    };

    const handleLoadDrawings = () => {
        setLoadDrawings(loadDrawings === false ? true : false);
    };

    return (
        <ProjectsContext.Provider
            value={{
                handleLoadProjects,
                projects,
                handleLoadArticles,
                handleLoadDrawings,
                articles,
                drawings,
                displayNavSection,
                setDisplayNavSection,
                loaderDisplay,
                setLoaderDisplay,
                welcomeDisplay,
                setWelcomeDisplay,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};