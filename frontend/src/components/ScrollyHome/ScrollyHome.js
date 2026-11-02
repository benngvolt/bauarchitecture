import './ScrollyHome.scss';

import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

import logo from '../../assets/bau_logo.png';
import Button from '../Button/Button';
import { MISSIONS } from '../MissionsSection/missions';
import { ProjectsContext } from '../../utils/ProjectsContext';
import {
    API_URL,
    DEFAULT_HERO_TITLE,
    DEFAULT_HERO_DESCRIPTION,
    DEFAULT_MISSION_DESCRIPTIONS,
    DEFAULT_APPROACH_TITLE,
    DEFAULT_APPROACH_ITEMS,
    DEFAULT_PROCESS_TITLE,
    DEFAULT_PROCESS_DETAILS,
} from '../../utils/constants';
import { getDisplayedFeaturedProjects } from '../../utils/featuredProjects';
import { getDefaultBannerImage } from '../../utils/homeImages';
import { hasRichTextContent } from '../../utils/richText';

// Défilement nécessaire pour passer d'un panneau au suivant, en fraction de la hauteur d'écran.
const SCROLL_PER_PANEL = 0.6;
// Durée d'affichage de chaque image du hero avant la suivante (ms).
const HERO_SLIDE_DURATION = 5000;
// Nombre de blocs « Approche » par panneau.
const APPROACH_ITEMS_PER_PANEL = 2;

function chunk(list, size) {
    const chunks = [];
    for (let index = 0; index < list.length; index += size) {
        chunks.push(list.slice(index, index + size));
    }
    return chunks;
}

// Une étape du processus : le texte détaillé se déplie sous le résumé.
function ProcessPanelContent({ step, index, title }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const details = hasRichTextContent(step.richText)
        ? step.richText
        : DEFAULT_PROCESS_DETAILS[index] || '';
    const hasDetails = hasRichTextContent(details);

    return (
        <>
            {title && <h2 className='scrolly_title'>{title}</h2>}

            <p className='scrolly_process_index'>0{index + 1}</p>
            <h3 className='scrolly_concept'>{step.title}</h3>
            <p className='scrolly_text'>{step.tagline}</p>

            {hasDetails && (
                <>
                    <button
                        type='button'
                        className='scrolly_process_toggle'
                        aria-expanded={isExpanded}
                        onClick={() => setIsExpanded((current) => !current)}
                    >
                        {isExpanded ? '− de détails' : '+ de détails'}
                    </button>

                    <div
                        className={
                            isExpanded
                                ? 'scrolly_process_details scrolly_process_details--open'
                                : 'scrolly_process_details'
                        }
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                    />
                </>
            )}
        </>
    );
}

function ScrollyHome() {
    const {
        projects,
        heroSettings,
        missionsSettings,
        reassuranceItems,
        featuredProjects,
        approachSettings,
        processSteps,
        processSettings,
        homeBanner,
        welcomeDisplay,
    } = useContext(ProjectsContext);

    const containerRef = useRef(null);
    const stageRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [heroSlide, setHeroSlide] = useState(0);

    /*-----------------------------------------
    ---- DONNÉES (mêmes sources que la page) ---
    -----------------------------------------*/

    // Images du hero : celles du backoffice, sinon l'image principale du premier projet.
    const heroProject = projects[0];
    const defaultHeroImage = heroProject?.images?.[heroProject.mainImageIndex];
    const customHeroUrls = heroSettings?.images?.length
        ? heroSettings.images.map((image) => image.imageUrl)
        : heroSettings?.imageUrl
        ? [heroSettings.imageUrl]
        : [];
    const heroUrls = customHeroUrls.length
        ? customHeroUrls
        : defaultHeroImage?.imageUrl
        ? [defaultHeroImage.imageUrl]
        : [];
    const currentHeroSlide = heroSlide < heroUrls.length ? heroSlide : 0;

    const displayedProjects = getDisplayedFeaturedProjects(projects, featuredProjects);

    const approachTitle = approachSettings?.title || DEFAULT_APPROACH_TITLE;
    const approachItems = approachSettings?.items?.length ? approachSettings.items : DEFAULT_APPROACH_ITEMS;

    const defaultBanner = getDefaultBannerImage(projects);
    const bannerUrl = homeBanner?.imageUrl || defaultBanner?.imageUrl;

    /*-----------------------------------------
    ---- PANNEAUX -----------------------------
    -----------------------------------------*/

    const heroBackdrop = (
        <div className='scrolly_backdrop' aria-hidden='true'>
            {heroUrls.map((imageUrl, index) => (
                <img
                    key={imageUrl}
                    className={
                        index === currentHeroSlide
                            ? 'scrolly_backdrop_image scrolly_backdrop_image--active'
                            : 'scrolly_backdrop_image'
                    }
                    src={`${API_URL}${imageUrl}`}
                    alt=''
                />
            ))}
        </div>
    );

    const panels = [];

    // 1. Image du hero, seule (le bloc de présentation se découvre au panneau suivant).
    panels.push({
        key: 'hero-image',
        theme: 'image',
        content: (
            <>
                {heroBackdrop}
                <p className='scrolly_hint'>
                    <span>Faites défiler</span>
                    <span className='scrolly_hint_arrow' aria-hidden='true'>↓</span>
                </p>
            </>
        ),
    });

    // 2. Bloc de présentation (logo, titre, texte, boutons) sur l'image.
    panels.push({
        key: 'hero-card',
        theme: 'image',
        content: (
            <>
                {heroBackdrop}
                <div className='scrolly_shade' aria-hidden='true' />
                <div className='scrolly_card'>
                    <img className='scrolly_card_logo' src={logo} alt='BAU Architecture — Amata Zdziobeck' />
                    <p className='scrolly_card_role'>Architecte HMONP</p>
                    <h1 className='scrolly_card_title'>{heroSettings?.title || DEFAULT_HERO_TITLE}</h1>
                    <p className='scrolly_text'>{heroSettings?.description || DEFAULT_HERO_DESCRIPTION}</p>
                    <div className='scrolly_buttons'>
                        <Button
                            variant='link'
                            className='button_dark'
                            link='/contact'
                            ariaLabel='Discuter de votre projet avec BAU Architecture'
                        >
                            DISCUTONS DE VOTRE PROJET
                        </Button>
                        <div className='button'>
                            <Link
                                className='button_container button_light'
                                to='/projets'
                                aria-label='Découvrir les réalisations de BAU Architecture'
                            >
                                DÉCOUVRIR LES RÉALISATIONS
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        ),
    });

    // 3. Services (pictogrammes et descriptifs).
    panels.push({
        key: 'missions',
        theme: 'light',
        content: (
            <ul className='scrolly_missions'>
                {MISSIONS.map(({ key, label, Icon }) => (
                    <li className='scrolly_missions_item' key={key}>
                        <Icon className='scrolly_missions_icon' aria-hidden='true' focusable='false' />
                        <h2 className='scrolly_concept'>{label}</h2>
                        <p className='scrolly_text'>{missionsSettings?.[key] || DEFAULT_MISSION_DESCRIPTIONS[key]}</p>
                    </li>
                ))}
            </ul>
        ),
    });

    // 4. Bloc de réassurance.
    if (reassuranceItems?.length) {
        panels.push({
            key: 'reassurance',
            theme: 'light',
            content: (
                <div className='scrolly_reassurance'>
                    {reassuranceItems.slice(0, 3).map((item) => (
                        <div className='scrolly_reassurance_item' key={item._id}>
                            <p className='scrolly_title'>{item.title}</p>
                            {item.subtitle && <p className='scrolly_text'>{item.subtitle}</p>}
                        </div>
                    ))}
                </div>
            ),
        });
    }

    // 5. Projets à la une : un panneau par projet.
    displayedProjects.forEach((project, index) => {
        const mainImage = project.images?.[project.mainImageIndex] || project.images?.[0];
        const isLast = index === displayedProjects.length - 1;

        panels.push({
            key: `project-${project._id}`,
            theme: 'image',
            content: (
                <>
                    {mainImage?.imageUrl && (
                        <img
                            className='scrolly_cover'
                            src={`${API_URL}${mainImage.imageUrl}`}
                            alt={project.title}
                        />
                    )}
                    <div className='scrolly_shade scrolly_shade--bottom' aria-hidden='true' />
                    <div className='scrolly_caption'>
                        <p className='scrolly_caption_count'>{index + 1} / {displayedProjects.length}</p>
                        <Link
                            className='scrolly_caption_link'
                            to={project._id ? `/projets/${project._id}` : '*'}
                            aria-label={`Accéder à la page du projet ${project.title}`}
                        >
                            <h2 className='scrolly_title scrolly_title--light'>{project.title}</h2>
                            <span className='scrolly_caption_more' aria-hidden='true'>Voir le projet →</span>
                        </Link>
                        {isLast && (
                            <div className='button'>
                                <Link className='button_container button_dark' to='/projets'>
                                    VOIR TOUS LES PROJETS
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            ),
        });
    });

    // 6. Approche : titre puis blocs, deux par panneau.
    chunk(approachItems, APPROACH_ITEMS_PER_PANEL).forEach((group, groupIndex) => {
        panels.push({
            key: `approach-${groupIndex}`,
            theme: 'dark',
            content: (
                <>
                    {groupIndex === 0 && <h2 className='scrolly_title scrolly_title--light'>{approachTitle}</h2>}
                    {group.map((item) => (
                        <div className='scrolly_approach_item' key={`${item.title}-${groupIndex}`}>
                            <h3 className='scrolly_title scrolly_title--light'>{item.title}</h3>
                            {item.text && <p className='scrolly_text scrolly_text--light'>{item.text}</p>}
                        </div>
                    ))}
                </>
            ),
        });
    });

    // 7. Image du bas.
    if (bannerUrl) {
        panels.push({
            key: 'banner',
            theme: 'image',
            content: (
                <img
                    className='scrolly_cover'
                    src={`${API_URL}${bannerUrl}`}
                    alt={homeBanner?.imageUrl || !defaultBanner?.projectTitle
                        ? 'BAU Architecture'
                        : `Projet ${defaultBanner.projectTitle} par BAU Architecture`}
                />
            ),
        });
    }

    // 8. Étapes du processus : un panneau par étape, avec la phrase d'accroche sur le premier.
    processSteps.forEach((step, index) => {
        panels.push({
            key: `process-${step._id}`,
            theme: 'light',
            content: (
                <ProcessPanelContent
                    step={step}
                    index={index}
                    title={index === 0 ? processSettings?.title || DEFAULT_PROCESS_TITLE : null}
                />
            ),
        });
    });

    // 9. Contact.
    panels.push({
        key: 'contact',
        theme: 'dark',
        content: (
            <>
                <h2 className='scrolly_title scrolly_title--light'>Vous avez un projet?</h2>
                <p className='scrolly_text scrolly_text--light'>
                    Qu'il s'agisse d'une rénovation, d'une réhabilitation, d'une extension ou d'une construction neuve,
                    échangeons autour de votre projet.
                </p>
                <div className='scrolly_buttons'>
                    <Button
                        variant='link'
                        className='button_dark'
                        link=''
                        target='_blank'
                        rel='noreferrer'
                        ariaLabel='Prendre contact avec BAU Architecture'
                    >
                        PRENDRE CONTACT
                    </Button>
                </div>
            </>
        ),
    });

    const panelCount = panels.length;

    /*-----------------------------------------
    ---- PANNEAU ACTIF SELON LE SCROLL --------
    -----------------------------------------*/

    useEffect(() => {
        let frame = 0;

        function update() {
            frame = 0;

            const container = containerRef.current;
            const stage = stageRef.current;
            if (!container || !stage) return;

            const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
            // Distance parcourue depuis l'épinglage de la scène, et défilement alloué à chaque panneau.
            const scrolled = Math.max(0, stickyTop - container.getBoundingClientRect().top);
            const step = (container.offsetHeight - stage.offsetHeight) / panelCount;

            setActiveIndex(Math.min(panelCount - 1, Math.floor(scrolled / step)));
        }

        function onScroll() {
            if (!frame) {
                frame = requestAnimationFrame(update);
            }
        }

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [panelCount]);

    // Diaporama du hero (désactivé s'il n'y a qu'une image ou si l'utilisateur limite les animations).
    useEffect(() => {
        if (heroUrls.length < 2) return undefined;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

        const timeout = setTimeout(() => {
            setHeroSlide((currentHeroSlide + 1) % heroUrls.length);
        }, HERO_SLIDE_DURATION);

        return () => clearTimeout(timeout);
    }, [currentHeroSlide, heroUrls.length]);

    return (
        <div
            className='scrolly'
            ref={containerRef}
            style={{ '--scrolly-panels': panelCount, '--scrolly-step': SCROLL_PER_PANEL }}
        >
            {welcomeDisplay && (
                <div className='hero_logoContainer'>
                    <img src={logo} alt='BAU Architecture' />
                </div>
            )}

            <div className='scrolly_stage' ref={stageRef}>
                <div className='scrolly_progress' aria-hidden='true'>
                    <div
                        className='scrolly_progress_bar'
                        style={{ width: `${((activeIndex + 1) / panelCount) * 100}%` }}
                    />
                </div>

                {panels.map((panel, index) => (
                    <section
                        key={panel.key}
                        className={`scrolly_panel scrolly_panel--${panel.theme} scrolly_panel--${
                            index === activeIndex ? 'active' : index < activeIndex ? 'past' : 'upcoming'
                        }`}
                        aria-hidden={index === activeIndex ? undefined : 'true'}
                    >
                        <div className='scrolly_panel_inner'>{panel.content}</div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default ScrollyHome;
