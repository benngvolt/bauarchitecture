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
            {welcomeDisplay && (
                    <div className='home_logoContainer'>
                        <img src={logo} alt='BAU Architecture' />
                    </div>
                )}
            <section className='home_intro'>
                <div className='home_intro_imageTitleContainer'>
                    <img
                        className={`home_intro_imageTitleContainer_image ${
                            isVisible ? 'visible' : 'hidden'
                        }`}
                        src={`${API_URL}${currentImage?.imageUrl}`}
                        alt={currentProject?.title || ''}
                    />
                    <h1>Architecte résidentiel et design sur-mesure à Saint-Etienne</h1>
                </div>
                <div className='home_intro_descriptionContainer'>
                    <h2>Création d'espaces de vie personnalisés à Saint-Etienne : l'alliance de l'esthétique et de la fonctionnalité.</h2>
                    <p className='home_intro_descriptionContainer_description'>Architecte à Saint-Étienne, j’accompagne particuliers et professionnels dans la conception, la rénovation et l'aménagement d'espaces sur mesure. Chaque projet est pensé pour répondre aux usages, valoriser les lieux et créer des environnements durables et harmonieux.
                    </p>
                    <div className='home_intro_descriptionContainer_buttonContainer'>
                        <Button
                            variant='link'
                            id=''
                            className='button_dark'
                            link='https://benjamingibert.com'
                            target='_blank'
                            rel='noreferrer'
                            ariaLabel=''
                            ariaCurrent=''
                            ariaDescribedBy=''
                            title=''
                        >
                            PRENDRE CONTACT
                        </Button>
                    </div>
                </div>
            </section>
            <section className='home_services'>
                {/* <h2>Services d'architecture</h2> */}
                {/* <div className='home_services_buttonContainer'>
                    <Button
                            variant='link'
                            id=''
                            className='button_light'
                            link='https://benjamingibert.com'
                            target='_blank'
                            rel='noreferrer'
                            ariaLabel=''
                            ariaCurrent=''
                            ariaDescribedBy=''
                            title=''
                        >
                            TOUS LES SERVICES
                    </Button>
                </div> */}
                <ul className='home_services_list'>
                    {missions.map((mission, missionIndex) => (
                        <li className='home_services_list_service' key={missionIndex}>
                            <h3>{mission.title}</h3>

                            <p>{mission.text}</p>
                            <img
                                className='home_services_list_service_image'
                                src={missionImages[missionIndex]}
                                alt={mission.title}
                            />

                            <ul>
                                {mission.list.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item.item}</li>
                                ))}
                            </ul>
                           
                        </li>
                    ))}
                </ul>
            </section>
            <section className='home_projects'>
                <h2>Projets architecturaux à Saint-Etienne et ses environs</h2>
                <ul>
                    {projectsList?.map((project) => (
                        <li>
                            <Link
                                key={project._id}
                                aria-label={`Accéder à la page du projet ${project.title}`}
                                to={project._id ? `/projets/${project._id}` : '*'}
                            >
                                <figure className='home_figure'>
                                    <img
                                        src={`${API_URL}${project.images?.[project.mainImageIndex]?.imageUrl}`}
                                        alt={project.title}
                                    />

                                    <figcaption>
                                        <p>{project.title}</p>
                                        <p>{project.creationDate}</p>
                                    </figcaption>
                                </figure>
                            </Link>
                        </li>
                    ))}
                </ul>

                <button>DISCUTONS DE VOTRE PROJET</button>
            </section>
            <section className='home_reassurance'>
                <h2>Bau s'engage à offrir une expérience architecturale sur mesure sur Saint-Etienne et ses environs</h2>
                <button>PRENDRE RENDEZ-VOUS</button>
                <button>DEMANDER UN DEVIS</button>
            </section>
        </main>
    );
}

export default Home;