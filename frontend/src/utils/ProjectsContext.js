import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [articles, setArticles] = useState([]);
    const [drawings, setDrawings] = useState([]);
    const [reassuranceItems, setReassuranceItems] = useState([]);
    const [heroSettings, setHeroSettings] = useState(null);
    const [processSteps, setProcessSteps] = useState([]);
    const [philosophyContent, setPhilosophyContent] = useState(null);

    const [loadProjects, setLoadProjects] = useState(false);
    const [loadArticles, setLoadArticles] = useState(false);
    const [loadDrawings, setLoadDrawings] = useState(false);
    const [loadReassuranceItems, setLoadReassuranceItems] = useState(false);
    const [loadHeroSettings, setLoadHeroSettings] = useState(false);
    const [loadProcessSteps, setLoadProcessSteps] = useState(false);
    const [loadPhilosophyContent, setLoadPhilosophyContent] = useState(false);

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
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/reassurance-items`)
            .then((res) => res.json())
            .then((data) => {
                setReassuranceItems(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadReassuranceItems]);

    useEffect(() => {
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/hero-settings`)
            .then((res) => res.json())
            .then((data) => {
                setHeroSettings(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadHeroSettings]);

    useEffect(() => {
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/process-steps`)
            .then((res) => res.json())
            .then((data) => {
                setProcessSteps(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadProcessSteps]);

    useEffect(() => {
        setLoaderDisplay(true);

        fetch(`${API_URL}/api/philosophy-content`)
            .then((res) => res.json())
            .then((data) => {
                setPhilosophyContent(data);
                setLoaderDisplay(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoaderDisplay(false);
            });
    }, [loadPhilosophyContent]);

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

    const handleLoadReassuranceItems = () => {
        setLoadReassuranceItems(loadReassuranceItems === false ? true : false);
    };

    const handleLoadHeroSettings = () => {
        setLoadHeroSettings(loadHeroSettings === false ? true : false);
    };

    const handleLoadProcessSteps = () => {
        setLoadProcessSteps(loadProcessSteps === false ? true : false);
    };

    const handleLoadPhilosophyContent = () => {
        setLoadPhilosophyContent(loadPhilosophyContent === false ? true : false);
    };

    return (
        <ProjectsContext.Provider
            value={{
                handleLoadProjects,
                projects,
                handleLoadArticles,
                handleLoadDrawings,
                handleLoadReassuranceItems,
                handleLoadHeroSettings,
                handleLoadProcessSteps,
                handleLoadPhilosophyContent,
                articles,
                drawings,
                reassuranceItems,
                heroSettings,
                processSteps,
                philosophyContent,
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