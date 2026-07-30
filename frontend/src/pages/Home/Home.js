import './Home.scss';
import { Link } from 'react-router-dom';
import logo from "../../assets/bau_logo.png";
import { ProjectsContext } from '../../utils/ProjectsContext';
import React, { useContext, useState, useEffect } from 'react';
import { API_URL } from '../../utils/constants';
import Button from '../../components/Button/Button'
import missions from '../../assets/missions.json';
import concevoirImage from '../../assets/missions/concevoir.webp';
import conseillerImage from '../../assets/missions/conseiller.webp';
import preparerImage from '../../assets/missions/preparer.webp';
import superviserImage from '../../assets/missions/superviser.webp';
import HeroSection from '../../components/HeroSection/HeroSection'
import MissionsSection from '../../components/MissionsSection/MissionsSection';
import ProcessSection from '../../components/ProcessSection/ProcessSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import PhilosophySection from '../../components/PhilosophySection/PhilosophySection';
import LastSection from '../../components/LastSection/LastSection';

function Home() {
    const {
        projects,
        welcomeDisplay,
        setDisplayNavSection
    } = useContext(ProjectsContext);

    const missionImages = [
        conseillerImage,
        concevoirImage,
        preparerImage,
        superviserImage
    ];
   
    const [projectsList, setProjectsList] = useState(projects);

    const [projectIndex, setProjectIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const currentProject = projectsList[projectIndex];
    const currentImage = currentProject?.images?.[currentProject?.mainImageIndex];
    useEffect(() => {
        if (!projectsList.length) return;
    
        const interval = setInterval(() => {
            setIsVisible(false);
    
            setTimeout(() => {
                setProjectIndex((currentIndex) =>
                    currentIndex >= projectsList.length - 1
                        ? 0
                        : currentIndex + 1
                );
    
                setIsVisible(true);
            }, 200);
        }, 5000);
    
        return () => clearInterval(interval);
    }, [projectsList]);

    useEffect(() => {
        setDisplayNavSection(false);
    }, []);

    useEffect(() => {
        setProjectsList(projects);
    }, [projects]);

    return (
        <main className='home'>
            <HeroSection/>
            <MissionsSection/>
            <ProjectsSection/>
            <ProcessSection/>
            <LastSection/>
        </main>
    );
}

export default Home;