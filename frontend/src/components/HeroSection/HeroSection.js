import './HeroSection.scss';

import { useContext, useEffect } from 'react';

import logo from '../../assets/bau_logo.png';
import Button from '../../components/Button/Button';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

function HeroSection() {
    const {
        projects,
        reassuranceItems,
        welcomeDisplay,
        setDisplayNavSection,
    } = useContext(ProjectsContext);

    const heroProject = projects[0];
    const heroImage =
        heroProject?.images?.[heroProject.mainImageIndex];

    useEffect(() => {
        setDisplayNavSection(false);
    }, [setDisplayNavSection]);

    return (
        <section className='hero'>
            {welcomeDisplay && (
                <div className='hero_logoContainer'>
                    <img src={logo} alt='BAU Architecture' />
                </div>
            )}

            <div className='hero_imageTitleContainer'>
                {heroImage?.imageUrl && (
                    <img
                        className='hero_imageTitleContainer_image'
                        src={`${API_URL}${heroImage.imageUrl}`}
                        alt={
                            heroProject?.title
                                ? `Projet ${heroProject.title} par BAU Architecture`
                                : 'Réalisation de BAU Architecture'
                        }
                    />
                )}
            </div>
            <div className='hero_mainContainer'>
                <div className='hero_mainContainer_logoContainer'>
                    <img
                        className='hero_mainContainer_logoContainer_logo'
                        src={logo}
                        alt='BAU Architecture — Amata Zdziobeck'
                    />

                    <p className='hero_mainContainer_logoContainer_role'>
                        Architecte HMONP
                    </p>
                </div>
                <div className='hero_mainContainer_descriptionContainer'>
                    <h1>
                        Réhabilitation, rénovation, extension et architecture sur
                        mesure.
                    </h1>

                    <p className='hero_mainContainer_descriptionContainer_description'>
                        J’accompagne particuliers, entreprises et collectivités de
                        la première réflexion jusqu’au chantier.
                    </p>

                    <div className='hero_mainContainer_descriptionContainer_buttonContainer'>
                        <Button
                            variant='link'
                            className='button_dark'
                            link='/contact'
                            ariaLabel='Discuter de votre projet avec BAU Architecture'
                        >
                            DISCUTONS DE VOTRE PROJET
                        </Button>

                        <Button
                            variant='link'
                            className='button_outline'
                            link='/projets'
                            ariaLabel='Découvrir les réalisations de BAU Architecture'
                        >
                            DÉCOUVRIR LES RÉALISATIONS
                        </Button>
                    </div>
                </div>
            </div>

            <div className='hero_reassuranceContainer'>
                {reassuranceItems.slice(0, 3).map((reassuranceItem) => (
                    <div className='hero_reassuranceContainer_item' key={reassuranceItem._id}>
                        <p className='hero_reassuranceContainer_item_title'>{reassuranceItem.title}</p>
                        {reassuranceItem.subtitle && (
                            <p className='hero_reassuranceContainer_item_subtitle'>{reassuranceItem.subtitle}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HeroSection;