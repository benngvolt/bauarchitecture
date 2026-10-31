import './HeroSection.scss';

import { useContext, useEffect, useState } from 'react';

import logo from '../../assets/bau_logo.png';
import Button from '../../components/Button/Button';
import { API_URL, DEFAULT_HERO_TITLE, DEFAULT_HERO_DESCRIPTION } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

// Durée d'affichage de chaque image du hero avant de passer à la suivante (ms).
const HERO_SLIDE_DURATION = 5000;

function HeroSection() {
    const {
        projects,
        reassuranceItems,
        heroSettings,
        welcomeDisplay,
        setDisplayNavSection,
    } = useContext(ProjectsContext);

    const [activeSlide, setActiveSlide] = useState(0);

    const heroProject = projects[0];
    const defaultHeroImage =
        heroProject?.images?.[heroProject.mainImageIndex];

    // Images choisies en backoffice (ou, à défaut, l'image principale du premier projet).
    const customImageUrls = heroSettings?.images?.length
        ? heroSettings.images.map((image) => image.imageUrl)
        : heroSettings?.imageUrl
        ? [heroSettings.imageUrl]
        : [];
    const hasCustomImages = customImageUrls.length > 0;
    const heroImageUrls = hasCustomImages
        ? customImageUrls
        : defaultHeroImage?.imageUrl
        ? [defaultHeroImage.imageUrl]
        : [];

    const slidesCount = heroImageUrls.length;
    const currentSlide = activeSlide < slidesCount ? activeSlide : 0;

    useEffect(() => {
        setDisplayNavSection(false);
    }, [setDisplayNavSection]);

    // Défilement automatique (désactivé s'il n'y a qu'une image ou si l'utilisateur limite les animations).
    useEffect(() => {
        if (slidesCount < 2) {
            return undefined;
        }

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            setActiveSlide((currentSlide + 1) % slidesCount);
        }, HERO_SLIDE_DURATION);

        return () => clearTimeout(timeout);
    }, [currentSlide, slidesCount]);

    return (
        <section className='hero'>
            {welcomeDisplay && (
                <div className='hero_logoContainer'>
                    <img src={logo} alt='BAU Architecture' />
                </div>
            )}

            <div
                className={
                    slidesCount > 0
                        ? 'hero_imageTitleContainer hero_imageTitleContainer--filled'
                        : 'hero_imageTitleContainer'
                }
            >
                {heroImageUrls.map((imageUrl, index) => (
                    <img
                        key={imageUrl}
                        className={
                            index === currentSlide
                                ? 'hero_imageTitleContainer_image hero_imageTitleContainer_image--active'
                                : 'hero_imageTitleContainer_image'
                        }
                        src={`${API_URL}${imageUrl}`}
                        alt={
                            hasCustomImages
                                ? 'BAU Architecture'
                                : heroProject?.title
                                ? `Projet ${heroProject.title} par BAU Architecture`
                                : 'Réalisation de BAU Architecture'
                        }
                        aria-hidden={index === currentSlide ? undefined : 'true'}
                    />
                ))}

                {slidesCount > 1 && (
                    <div className='hero_imageTitleContainer_dots'>
                        {heroImageUrls.map((imageUrl, index) => (
                            <button
                                key={imageUrl}
                                type='button'
                                className={
                                    index === currentSlide
                                        ? 'hero_imageTitleContainer_dots_dot hero_imageTitleContainer_dots_dot--active'
                                        : 'hero_imageTitleContainer_dots_dot'
                                }
                                aria-label={`Afficher l'image ${index + 1} sur ${slidesCount}`}
                                aria-current={index === currentSlide ? 'true' : undefined}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className='hero_mainContainer'>
                <div className='hero_mainContainer_descriptionContainer'>
                    <div className='hero_mainContainer_descriptionContainer_logoContainer'>
                        <img
                            className='hero_mainContainer_descriptionContainer_logoContainer_logo'
                            src={logo}
                            alt='BAU Architecture — Amata Zdziobeck'
                        />

                        <p className='hero_mainContainer_descriptionContainer_logoContainer_role'>
                            Architecte HMONP
                        </p>
                    </div>

                    <div className='hero_mainContainer_descriptionContainer_content'>
                        <h1>{heroSettings?.title || DEFAULT_HERO_TITLE}</h1>

                        <p className='hero_mainContainer_descriptionContainer_content_description'>
                            {heroSettings?.description || DEFAULT_HERO_DESCRIPTION}
                        </p>

                        <div className='hero_mainContainer_descriptionContainer_content_buttonContainer'>
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
                                className='button_light'
                                link='/projets'
                                ariaLabel='Découvrir les réalisations de BAU Architecture'
                            >
                                DÉCOUVRIR LES RÉALISATIONS
                            </Button>
                        </div>
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