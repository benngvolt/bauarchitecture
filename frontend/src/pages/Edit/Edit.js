import './Edit.scss';
import '../../components/AdminUI/AdminUI.scss';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import ReassuranceItemForm from '../../components/ReassuranceItemForm/ReassuranceItemForm';
import HeroImageForm from '../../components/HeroImageForm/HeroImageForm';
import HeroTextsForm from '../../components/HeroTextsForm/HeroTextsForm';
import FeaturedProjectsForm from '../../components/FeaturedProjectsForm/FeaturedProjectsForm';
import ProcessHeadingForm from '../../components/ProcessHeadingForm/ProcessHeadingForm';
import MissionsForm from '../../components/MissionsForm/MissionsForm';
import ProcessStepForm from '../../components/ProcessStepForm/ProcessStepForm';
import PhilosophyContentForm from '../../components/PhilosophyContentForm/PhilosophyContentForm';
import AboutPhotoForm from '../../components/AboutPhotoForm/AboutPhotoForm';
import CuriosityItemForm from '../../components/CuriosityItemForm/CuriosityItemForm';
import FaqItemForm from '../../components/FaqItemForm/FaqItemForm';
import { ProjectsContext } from '../../utils/ProjectsContext';
import { API_URL } from '../../utils/constants';
import { getDefaultBannerImage } from '../../utils/homeImages';
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList';
import EditArticlesList from '../../components/EditArticlesList/EditArticlesList';
import EditReassuranceItemsList from '../../components/EditReassuranceItemsList/EditReassuranceItemsList';
import EditProcessStepsList from '../../components/EditProcessStepsList/EditProcessStepsList';
import EditCuriosityItemsList from '../../components/EditCuriosityItemsList/EditCuriosityItemsList';
import EditFaqItemsList from '../../components/EditFaqItemsList/EditFaqItemsList';
import portrait from '../../assets/portrait.webp';
import React, { useContext, useState, useEffect } from 'react';

const MAX_REASSURANCE_ITEMS = 3;

// Navigation du tableau de bord : une entrée peut regrouper plusieurs sous-parties.
// Les clés des sous-parties (ou de l'entrée sans sous-partie) sont uniques : elles servent d'identifiant du panneau affiché.
const SECTIONS = [
    {
        key: 'home',
        label: "PAGE D'ACCUEIL",
        subSections: [
            { key: 'hero', label: 'HERO', description: "Titre, texte d'accroche et images de fond, en haut de la page d'accueil." },
            { key: 'missions', label: 'SERVICES', description: "Petit texte sous chacun des quatre pictogrammes (Construction, Rénovation, Extension, Aménagements)." },
            { key: 'featured', label: 'Projets à la une', description: "Les trois projets présentés sur la page d'accueil." },
            { key: 'reassurance', label: 'BLOC DE RÉASSURANCE', description: "Courts arguments affichés sous les projets à la une." },
            { key: 'banner', label: 'Image du bas', description: "Image pleine largeur, entre le bloc de réassurance et les étapes du processus." },
            { key: 'process', label: 'Étapes du processus', description: "Phrase d'accroche et quatre étapes présentées sur la page d'accueil." },
        ],
    },
    { key: 'projects', label: 'PROJETS', description: 'Tous les projets du site.' },
    { key: 'articles', label: 'ARTICLES', description: 'Les articles du journal.' },
    {
        key: 'about',
        label: 'PAGE À PROPOS',
        subSections: [
            { key: 'about-text', label: 'Texte de présentation', description: 'Texte affiché à droite des portraits, en haut de la page.' },
            { key: 'about-portraits', label: 'Portraits', description: 'Deux portraits au plus, l\'un au-dessus de l\'autre, à gauche du texte.' },
            { key: 'about-objects', label: 'Cabinet de curiosités', description: 'Les objets de la grille : une photo qui ouvre un texte (CV, liens amis…) au clic.' },
        ],
    },
    { key: 'faq', label: 'FAQ', description: 'Questions fréquentes.' },
];

const ACTIVE_SECTION_STORAGE_KEY = 'editActiveSection';

// Panneaux (sous-parties ou entrées simples) avec leur entrée parente.
const PANELS = SECTIONS.flatMap((section) =>
    section.subSections
        ? section.subSections.map((subSection) => ({ ...subSection, parent: section }))
        : [{ key: section.key, label: section.label, description: section.description, parent: section }]
);

function getInitialPanelKey() {
    try {
        const storedKey = sessionStorage.getItem(ACTIVE_SECTION_STORAGE_KEY);
        if (PANELS.some((panel) => panel.key === storedKey)) {
            return storedKey;
        }
    } catch (error) {
        // Stockage indisponible : on démarre sur le premier panneau.
    }
    return PANELS[0].key;
}

function Edit() {
    const {
        handleLoadProjects,
        handleLoadArticles,
        handleLoadReassuranceItems,
        handleLoadHeroSettings,
        handleLoadProcessSteps,
        handleLoadAboutPageContent,
        handleLoadCuriosityItems,
        handleLoadFaqItems,
        handleLoadFeaturedProjects,
        handleLoadHomeBanner,
        handleLoadProcessSettings,
        handleLoadMissionsSettings,
        projects,
        articles,
        reassuranceItems,
        heroSettings,
        processSteps,
        aboutPageContent,
        curiosityItems,
        faqItems,
        featuredProjects,
        homeBanner,
        processSettings,
        missionsSettings,
        loaderDisplay,
        setLoaderDisplay,
        setDisplayNavSection,
    } = useContext(ProjectsContext);

    const defaultHeroProject = projects[0];
    const defaultHeroImageUrl =
        defaultHeroProject?.images?.[defaultHeroProject.mainImageIndex]?.imageUrl;
    const defaultBannerImage = getDefaultBannerImage(projects);

    const [activeSection, setActiveSection] = useState(getInitialPanelKey);
    const activePanel = PANELS.find((panel) => panel.key === activeSection);
    const activeGroup = activePanel.parent;

    function selectSection(panelKey) {
        setActiveSection(panelKey);
        try {
            sessionStorage.setItem(ACTIVE_SECTION_STORAGE_KEY, panelKey);
        } catch (error) {
            // Sans stockage, la sélection n'est simplement pas mémorisée.
        }
    }

    const [projectFormMode, setProjectFormMode] = useState('add');
    const [projectsList, setProjectsList] = useState(projects);
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectEdit, setProjectEdit] = useState(null);

    const [articleFormMode, setArticleFormMode] = useState('add');
    const [articlesList, setArticlesList] = useState(articles);
    const [displayArticleForm, setDisplayArticleForm] = useState(false);
    const [articleEdit, setArticleEdit] = useState(null);

    const [reassuranceItemFormMode, setReassuranceItemFormMode] = useState('add');
    const [reassuranceItemsList, setReassuranceItemsList] = useState(reassuranceItems);
    const [displayReassuranceItemForm, setDisplayReassuranceItemForm] = useState(false);
    const [reassuranceItemEdit, setReassuranceItemEdit] = useState(null);

    const [processStepsList, setProcessStepsList] = useState(processSteps);
    const [displayProcessStepForm, setDisplayProcessStepForm] = useState(false);
    const [processStepEdit, setProcessStepEdit] = useState(null);

    const [displayCuriosityItemForm, setDisplayCuriosityItemForm] = useState(false);
    const [curiosityItemEdit, setCuriosityItemEdit] = useState(null);

    const [faqItemFormMode, setFaqItemFormMode] = useState('add');
    const [faqItemsList, setFaqItemsList] = useState(faqItems);
    const [displayFaqItemForm, setDisplayFaqItemForm] = useState(false);
    const [faqItemEdit, setFaqItemEdit] = useState(null);

    useEffect(() => {
        setDisplayNavSection(false);
    }, []);

    useEffect(() => {
        setProjectsList(projects);
    }, [projects]);

    useEffect(() => {
        setArticlesList(articles);
    }, [articles]);

    useEffect(() => {
        setReassuranceItemsList(reassuranceItems);
    }, [reassuranceItems]);

    useEffect(() => {
        setProcessStepsList(processSteps);
    }, [processSteps]);

    useEffect(() => {
        setFaqItemsList(faqItems);
    }, [faqItems]);


    // OUVERTURE MODE MODIF
    async function handleEditProject(project) {
        try {
            setProjectEdit(project);
            handleLoadProjects();
            setDisplayProjectForm(true);
            setProjectFormMode('edit');
        } catch (error) {
            console.log(error.message);
        }
    }

    // OUVERTURE MODE MODIF
    async function handleEditArticle(article) {
        try {
            setArticleEdit(article);
            handleLoadArticles();
            setDisplayArticleForm(true);
            setArticleFormMode('edit');
        } catch (error) {
            console.log(error.message);
        }
    }

    // OUVERTURE MODE MODIF
    async function handleEditReassuranceItem(reassuranceItem) {
        try {
            setReassuranceItemEdit(reassuranceItem);
            handleLoadReassuranceItems();
            setDisplayReassuranceItemForm(true);
            setReassuranceItemFormMode('edit');
        } catch (error) {
            console.log(error.message);
        }
    }

    // OUVERTURE MODE MODIF
    async function handleEditProcessStep(processStep) {
        try {
            setProcessStepEdit(processStep);
            handleLoadProcessSteps();
            setDisplayProcessStepForm(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    // OUVERTURE MODE MODIF
    function handleEditCuriosityItem(curiosityItem) {
        setCuriosityItemEdit(curiosityItem);
        setDisplayCuriosityItemForm(true);
    }

    // OUVERTURE MODE MODIF
    async function handleEditFaqItem(faqItem) {
        try {
            setFaqItemEdit(faqItem);
            handleLoadFaqItems();
            setDisplayFaqItemForm(true);
            setFaqItemFormMode('edit');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <main className='edit'>
            <nav className='edit_sidebar' aria-label='Sections du tableau de bord'>
                <ul className='edit_sidebar_list'>
                    {SECTIONS.map((section) => {
                        const isActiveGroup = section === activeGroup;
                        const firstPanelKey = section.subSections ? section.subSections[0].key : section.key;

                        return (
                            <li
                                key={section.key}
                                className={isActiveGroup ? 'edit_sidebar_list_item edit_sidebar_list_item--open' : 'edit_sidebar_list_item'}
                            >
                                <button
                                    type='button'
                                    className={
                                        isActiveGroup
                                            ? 'edit_sidebar_list_item_button edit_sidebar_list_item_button--active'
                                            : 'edit_sidebar_list_item_button'
                                    }
                                    aria-expanded={section.subSections ? isActiveGroup : undefined}
                                    aria-current={!section.subSections && isActiveGroup ? 'page' : undefined}
                                    onClick={() => selectSection(isActiveGroup ? activeSection : firstPanelKey)}
                                >
                                    {section.label}
                                </button>

                                {section.subSections && isActiveGroup && (
                                    <ul className='edit_sidebar_list_item_subList'>
                                        {section.subSections.map((subSection) => (
                                            <li key={subSection.key}>
                                                <button
                                                    type='button'
                                                    className={
                                                        activeSection === subSection.key
                                                            ? 'edit_sidebar_list_item_subList_button edit_sidebar_list_item_subList_button--active'
                                                            : 'edit_sidebar_list_item_subList_button'
                                                    }
                                                    aria-current={activeSection === subSection.key ? 'page' : undefined}
                                                    onClick={() => selectSection(subSection.key)}
                                                >
                                                    {subSection.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className='edit_content'>
                <section className='edit_content_section'>
                    <header className='edit_content_section_header'>
                        {activeGroup.subSections && (
                            <p className='edit_content_section_header_kicker'>{activeGroup.label}</p>
                        )}
                        <h2 className='edit_content_section_title'>{activePanel.label}</h2>
                        {activePanel.description && (
                            <p className='edit_content_section_header_description'>{activePanel.description}</p>
                        )}
                    </header>

                    {/* EDITION PROJETS */}
                    {activeSection === 'projects' && (
                        <>
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
                                className='edit_content_section_addButton'
                                onClick={() => {
                                    setDisplayProjectForm(true);
                                    setProjectFormMode('add');
                                }}
                            >
                                + AJOUTER UN PROJET +
                            </button>
                        </>
                    )}

                    {/* EDITION ARTICLES */}
                    {activeSection === 'articles' && (
                        <>
                            <EditArticlesList
                                articles={articlesList}
                                handleEditArticle={handleEditArticle}
                                handleLoadArticles={handleLoadArticles}
                                setDisplayArticleForm={setDisplayArticleForm}
                                displayArticleForm={displayArticleForm}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />

                            <button
                                className='edit_content_section_addButton'
                                onClick={() => {
                                    setDisplayArticleForm(true);
                                    setArticleFormMode('add');
                                }}
                            >
                                + AJOUTER UN ARTICLE +
                            </button>
                        </>
                    )}

                    {/* PAGE D'ACCUEIL : HERO (TEXTES ET IMAGES DE FOND) */}
                    {activeSection === 'hero' && (
                        <>
                            <div className='edit_content_section_subSection'>
                                <h3 className='edit_content_section_subSection_title'>Textes</h3>
                                <HeroTextsForm
                                    heroSettings={heroSettings}
                                    handleLoadHeroSettings={handleLoadHeroSettings}
                                    loaderDisplay={loaderDisplay}
                                    setLoaderDisplay={setLoaderDisplay}
                                />
                            </div>

                            <div className='edit_content_section_subSection'>
                                <h3 className='edit_content_section_subSection_title'>Images de fond</h3>
                                <HeroImageForm
                                    heroSettings={heroSettings}
                                    defaultHeroImageUrl={defaultHeroImageUrl}
                                    handleLoadHeroSettings={handleLoadHeroSettings}
                                    loaderDisplay={loaderDisplay}
                                    setLoaderDisplay={setLoaderDisplay}
                                />
                            </div>
                        </>
                    )}

                    {/* PAGE D'ACCUEIL : IMAGE DU BAS (PLEINE LARGEUR) */}
                    {activeSection === 'banner' && (
                        <AboutPhotoForm
                            label="l'image du bas"
                            fieldName='banner'
                            currentImageUrl={homeBanner?.imageUrl}
                            defaultImageUrl={
                                defaultBannerImage ? `${API_URL}${defaultBannerImage.imageUrl}` : undefined
                            }
                            uploadUrl={`${API_URL}/api/home-banner`}
                            resetUrl={`${API_URL}/api/home-banner`}
                            previewAspectRatio='16 / 9'
                            hint="Elle s'affiche en pleine largeur au format 16:9 horizontal : l'image est recadrée si besoin."
                            onUpdated={handleLoadHomeBanner}
                            loaderDisplay={loaderDisplay}
                            setLoaderDisplay={setLoaderDisplay}
                        />
                    )}

                    {/* PAGE D'ACCUEIL : DESCRIPTIFS SOUS LES PICTOGRAMMES */}
                    {activeSection === 'missions' && (
                        <MissionsForm
                            missionsSettings={missionsSettings}
                            handleLoadMissionsSettings={handleLoadMissionsSettings}
                            loaderDisplay={loaderDisplay}
                            setLoaderDisplay={setLoaderDisplay}
                        />
                    )}

                    {/* PAGE D'ACCUEIL : ARGUMENTS DE RÉASSURANCE (HERO) */}
                    {activeSection === 'reassurance' && (
                        <div className='adminForm'>
                            <EditReassuranceItemsList
                                reassuranceItems={reassuranceItemsList}
                                handleEditReassuranceItem={handleEditReassuranceItem}
                                handleLoadReassuranceItems={handleLoadReassuranceItems}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />

                            {reassuranceItemsList.length >= MAX_REASSURANCE_ITEMS ? (
                                <p className='adminIntro'>
                                    Le maximum de {MAX_REASSURANCE_ITEMS} arguments est atteint : supprimez-en un pour en ajouter un nouveau.
                                </p>
                            ) : (
                                <div className='adminActions'>
                                    <button
                                        type='button'
                                        className='adminButton adminButton--secondary'
                                        onClick={() => {
                                            setDisplayReassuranceItemForm(true);
                                            setReassuranceItemFormMode('add');
                                        }}
                                    >
                                        + Ajouter un argument
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PAGE D'ACCUEIL : PROJETS À LA UNE */}
                    {activeSection === 'featured' && (
                        <FeaturedProjectsForm
                            projects={projects}
                            featuredProjects={featuredProjects}
                            handleLoadFeaturedProjects={handleLoadFeaturedProjects}
                            loaderDisplay={loaderDisplay}
                            setLoaderDisplay={setLoaderDisplay}
                        />
                    )}

                    {/* PAGE D'ACCUEIL : ÉTAPES DU PROCESSUS */}
                    {activeSection === 'process' && (
                        <>
                            <div className='edit_content_section_subSection'>
                                <h3 className='edit_content_section_subSection_title'>Phrase d'accroche</h3>
                                <ProcessHeadingForm
                                    processSettings={processSettings}
                                    handleLoadProcessSettings={handleLoadProcessSettings}
                                    loaderDisplay={loaderDisplay}
                                    setLoaderDisplay={setLoaderDisplay}
                                />
                            </div>

                            <div className='edit_content_section_subSection'>
                                <h3 className='edit_content_section_subSection_title'>Les quatre étapes</h3>
                                <p className='adminIntro' style={{ marginBottom: 16 }}>
                                    Il y a toujours exactement 4 étapes : elles ne peuvent être ni ajoutées ni supprimées, seulement modifiées.
                                </p>

                                <EditProcessStepsList
                                    processSteps={processStepsList}
                                    handleEditProcessStep={handleEditProcessStep}
                                />
                            </div>
                        </>
                    )}

                    {/* PAGE À PROPOS */}
                    {activeSection === 'about-text' && (
                        <PhilosophyContentForm
                            aboutPageContent={aboutPageContent}
                            handleLoadAboutPageContent={handleLoadAboutPageContent}
                            loaderDisplay={loaderDisplay}
                            setLoaderDisplay={setLoaderDisplay}
                        />
                    )}

                    {activeSection === 'about-portraits' && (
                        <div className='adminForm'>
                            <p className='adminIntro'>
                                Deux portraits au plus, affichés l'un au-dessus de l'autre, à gauche du texte, dans le même format (3:4) avec des bords arrondis : l'image est recadrée si besoin.
                            </p>

                            <div className='adminColumns'>
                                <div className='adminCard'>
                                    <div className='adminCard_header'><h4>Portrait 1</h4></div>
                                    <AboutPhotoForm
                                        label='le portrait 1'
                                        fieldName='philosophy'
                                        currentImageUrl={aboutPageContent?.philosophyImageUrl}
                                        defaultImageUrl={portrait}
                                        resetUrl={`${API_URL}/api/about-page-content/philosophy-image`}
                                        previewAspectRatio='3 / 4'
                                        previewMaxWidth={260}
                                        onUpdated={handleLoadAboutPageContent}
                                        loaderDisplay={loaderDisplay}
                                        setLoaderDisplay={setLoaderDisplay}
                                    />
                                </div>

                                <div className='adminCard'>
                                    <div className='adminCard_header'><h4>Portrait 2</h4></div>
                                    <AboutPhotoForm
                                        label='le portrait 2'
                                        fieldName='portrait2'
                                        currentImageUrl={aboutPageContent?.portrait2Url}
                                        emptyText="Aucun second portrait : seul le premier est affiché."
                                        resetLabel='Supprimer le portrait'
                                        previewAspectRatio='3 / 4'
                                        previewMaxWidth={260}
                                        onUpdated={handleLoadAboutPageContent}
                                        loaderDisplay={loaderDisplay}
                                        setLoaderDisplay={setLoaderDisplay}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'about-objects' && (
                        <>
                            <EditCuriosityItemsList
                                curiosityItems={curiosityItems}
                                handleEditCuriosityItem={handleEditCuriosityItem}
                                handleLoadCuriosityItems={handleLoadCuriosityItems}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />

                            <button
                                className='edit_content_section_addButton'
                                onClick={() => {
                                    setCuriosityItemEdit(null);
                                    setDisplayCuriosityItemForm(true);
                                }}
                            >
                                + AJOUTER UN OBJET +
                            </button>
                        </>
                    )}

                    {/* EDITION FAQ */}
                    {activeSection === 'faq' && (
                        <>
                            <EditFaqItemsList
                                faqItems={faqItemsList}
                                handleEditFaqItem={handleEditFaqItem}
                                handleLoadFaqItems={handleLoadFaqItems}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />

                            <button
                                className='edit_content_section_addButton'
                                onClick={() => {
                                    setDisplayFaqItemForm(true);
                                    setFaqItemFormMode('add');
                                }}
                            >
                                + AJOUTER UNE QUESTION +
                            </button>
                        </>
                    )}
                </section>
            </div>

            {displayProjectForm === true && (
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
            )}

            {displayArticleForm === true && (
                <ArticleForm
                    articleFormMode={articleFormMode}
                    setArticleFormMode={setArticleFormMode}
                    handleLoadArticles={handleLoadArticles}
                    setDisplayArticleForm={setDisplayArticleForm}
                    displayArticleForm={displayArticleForm}
                    articleEdit={articleEdit}
                    setArticleEdit={setArticleEdit}
                    loaderDisplay={loaderDisplay}
                    setLoaderDisplay={setLoaderDisplay}
                />
            )}

            {displayReassuranceItemForm === true && (
                <ReassuranceItemForm
                    reassuranceItemFormMode={reassuranceItemFormMode}
                    setReassuranceItemFormMode={setReassuranceItemFormMode}
                    handleLoadReassuranceItems={handleLoadReassuranceItems}
                    setDisplayReassuranceItemForm={setDisplayReassuranceItemForm}
                    displayReassuranceItemForm={displayReassuranceItemForm}
                    reassuranceItemEdit={reassuranceItemEdit}
                    setReassuranceItemEdit={setReassuranceItemEdit}
                    loaderDisplay={loaderDisplay}
                    setLoaderDisplay={setLoaderDisplay}
                />
            )}

            {displayProcessStepForm === true && (
                <ProcessStepForm
                    handleLoadProcessSteps={handleLoadProcessSteps}
                    setDisplayProcessStepForm={setDisplayProcessStepForm}
                    processStepEdit={processStepEdit}
                    setProcessStepEdit={setProcessStepEdit}
                    loaderDisplay={loaderDisplay}
                    setLoaderDisplay={setLoaderDisplay}
                />
            )}

            {displayCuriosityItemForm === true && (
                <CuriosityItemForm
                    key={curiosityItemEdit?._id || 'new'}
                    handleLoadCuriosityItems={handleLoadCuriosityItems}
                    curiosityItemEdit={curiosityItemEdit}
                    setDisplayCuriosityItemForm={setDisplayCuriosityItemForm}
                    loaderDisplay={loaderDisplay}
                    setLoaderDisplay={setLoaderDisplay}
                />
            )}

            {displayFaqItemForm === true && (
                <FaqItemForm
                    faqItemFormMode={faqItemFormMode}
                    setFaqItemFormMode={setFaqItemFormMode}
                    handleLoadFaqItems={handleLoadFaqItems}
                    setDisplayFaqItemForm={setDisplayFaqItemForm}
                    displayFaqItemForm={displayFaqItemForm}
                    faqItemEdit={faqItemEdit}
                    setFaqItemEdit={setFaqItemEdit}
                    loaderDisplay={loaderDisplay}
                    setLoaderDisplay={setLoaderDisplay}
                />
            )}
        </main>
    );
}

export default Edit;
