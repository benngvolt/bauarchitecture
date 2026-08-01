import './Edit.scss';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import ReassuranceItemForm from '../../components/ReassuranceItemForm/ReassuranceItemForm';
import HeroImageForm from '../../components/HeroImageForm/HeroImageForm';
import ProcessStepForm from '../../components/ProcessStepForm/ProcessStepForm';
import PhilosophyContentForm from '../../components/PhilosophyContentForm/PhilosophyContentForm';
import AboutPhotoForm from '../../components/AboutPhotoForm/AboutPhotoForm';
import CurriculumContentForm from '../../components/CurriculumContentForm/CurriculumContentForm';
import FriendUrlForm from '../../components/FriendUrlForm/FriendUrlForm';
import FaqItemForm from '../../components/FaqItemForm/FaqItemForm';
import { ProjectsContext } from '../../utils/ProjectsContext';
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList';
import EditArticlesList from '../../components/EditArticlesList/EditArticlesList';
import EditReassuranceItemsList from '../../components/EditReassuranceItemsList/EditReassuranceItemsList';
import EditProcessStepsList from '../../components/EditProcessStepsList/EditProcessStepsList';
import EditFriendUrlsList from '../../components/EditFriendUrlsList/EditFriendUrlsList';
import EditFaqItemsList from '../../components/EditFaqItemsList/EditFaqItemsList';
import portrait from '../../assets/portrait.webp';
import skyline from '../../assets/skyline.png';
import ensase from '../../assets/ensase.png';
import React, { useContext, useState, useEffect } from 'react';

const MAX_REASSURANCE_ITEMS = 3;

const SECTIONS = [
    { key: 'projects', label: 'PROJETS' },
    { key: 'articles', label: 'ARTICLES' },
    { key: 'reassurance', label: 'ARGUMENTS DE RÉASSURANCE' },
    { key: 'hero', label: 'IMAGE DU HERO' },
    { key: 'process', label: 'ÉTAPES DU PROCESSUS' },
    { key: 'about', label: 'PAGE À PROPOS' },
    { key: 'faq', label: 'FAQ' },
];

function Edit() {
    const {
        handleLoadProjects,
        handleLoadArticles,
        handleLoadReassuranceItems,
        handleLoadHeroSettings,
        handleLoadProcessSteps,
        handleLoadAboutPageContent,
        handleLoadFriendUrls,
        handleLoadFaqItems,
        projects,
        articles,
        reassuranceItems,
        heroSettings,
        processSteps,
        aboutPageContent,
        friendUrls,
        faqItems,
        loaderDisplay,
        setLoaderDisplay,
        setDisplayNavSection,
    } = useContext(ProjectsContext);

    const defaultHeroProject = projects[0];
    const defaultHeroImageUrl =
        defaultHeroProject?.images?.[defaultHeroProject.mainImageIndex]?.imageUrl;

    const [activeSection, setActiveSection] = useState(SECTIONS[0].key);

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

    const [friendUrlFormMode, setFriendUrlFormMode] = useState('add');
    const [friendUrlsList, setFriendUrlsList] = useState(friendUrls);
    const [displayFriendUrlForm, setDisplayFriendUrlForm] = useState(false);
    const [friendUrlEdit, setFriendUrlEdit] = useState(null);

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
        setFriendUrlsList(friendUrls);
    }, [friendUrls]);

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
    async function handleEditFriendUrl(friendUrl) {
        try {
            setFriendUrlEdit(friendUrl);
            handleLoadFriendUrls();
            setDisplayFriendUrlForm(true);
            setFriendUrlFormMode('edit');
        } catch (error) {
            console.log(error.message);
        }
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
            <nav className='edit_sidebar'>
                <ul className='edit_sidebar_list'>
                    {SECTIONS.map((section) => (
                        <li key={section.key}>
                            <button
                                type='button'
                                className={
                                    activeSection === section.key
                                        ? 'edit_sidebar_list_button edit_sidebar_list_button--active'
                                        : 'edit_sidebar_list_button'
                                }
                                onClick={() => setActiveSection(section.key)}
                            >
                                {section.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='edit_content'>
                {/* EDITION PROJETS */}
                {activeSection === 'projects' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>Projets</h2>

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
                    </section>
                )}

                {/* EDITION ARTICLES */}
                {activeSection === 'articles' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>Articles</h2>

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
                    </section>
                )}

                {/* EDITION ARGUMENTS DE RÉASSURANCE (HERO) */}
                {activeSection === 'reassurance' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>Arguments de réassurance</h2>

                        <EditReassuranceItemsList
                            reassuranceItems={reassuranceItemsList}
                            handleEditReassuranceItem={handleEditReassuranceItem}
                            handleLoadReassuranceItems={handleLoadReassuranceItems}
                            loaderDisplay={loaderDisplay}
                            setLoaderDisplay={setLoaderDisplay}
                        />

                        {reassuranceItemsList.length >= MAX_REASSURANCE_ITEMS ? (
                            <p className='edit_content_section_maxReached'>
                                Le maximum de {MAX_REASSURANCE_ITEMS} arguments est atteint. Supprimez-en un pour en ajouter un nouveau.
                            </p>
                        ) : (
                            <button
                                className='edit_content_section_addButton'
                                onClick={() => {
                                    setDisplayReassuranceItemForm(true);
                                    setReassuranceItemFormMode('add');
                                }}
                            >
                                + AJOUTER UN ARGUMENT +
                            </button>
                        )}
                    </section>
                )}

                {/* EDITION IMAGE DE FOND DU HERO */}
                {activeSection === 'hero' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>Image du hero</h2>

                        <HeroImageForm
                            heroSettings={heroSettings}
                            defaultHeroImageUrl={defaultHeroImageUrl}
                            handleLoadHeroSettings={handleLoadHeroSettings}
                            loaderDisplay={loaderDisplay}
                            setLoaderDisplay={setLoaderDisplay}
                        />
                    </section>
                )}

                {/* EDITION ÉTAPES DU PROCESSUS */}
                {activeSection === 'process' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>Étapes du processus</h2>

                        <p className='edit_content_section_helperText'>
                            Il y a toujours exactement 4 étapes (Observer, Diagnostiquer, Concevoir, Construire) : elles ne peuvent être ni ajoutées ni supprimées, seulement modifiées.
                        </p>

                        <EditProcessStepsList
                            processSteps={processStepsList}
                            handleEditProcessStep={handleEditProcessStep}
                        />
                    </section>
                )}

                {/* EDITION PAGE À PROPOS */}
                {activeSection === 'about' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>Page à propos</h2>

                        <div className='edit_content_section_subSection'>
                            <h3 className='edit_content_section_subSection_title'>Texte de présentation</h3>
                            <PhilosophyContentForm
                                aboutPageContent={aboutPageContent}
                                defaultImageUrl={portrait}
                                handleLoadAboutPageContent={handleLoadAboutPageContent}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />
                        </div>

                        <div className='edit_content_section_subSection'>
                            <h3 className='edit_content_section_subSection_title'>Photo pleine largeur 1</h3>
                            <AboutPhotoForm
                                label='la photo 1'
                                fieldName='photo1'
                                currentImageUrl={aboutPageContent?.photo1Url}
                                defaultImageUrl={skyline}
                                handleLoadAboutPageContent={handleLoadAboutPageContent}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />
                        </div>

                        <div className='edit_content_section_subSection'>
                            <h3 className='edit_content_section_subSection_title'>CV</h3>
                            <CurriculumContentForm
                                aboutPageContent={aboutPageContent}
                                handleLoadAboutPageContent={handleLoadAboutPageContent}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />
                        </div>

                        <div className='edit_content_section_subSection'>
                            <h3 className='edit_content_section_subSection_title'>Photo pleine largeur 2</h3>
                            <AboutPhotoForm
                                label='la photo 2'
                                fieldName='photo2'
                                currentImageUrl={aboutPageContent?.photo2Url}
                                defaultImageUrl={ensase}
                                handleLoadAboutPageContent={handleLoadAboutPageContent}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />
                        </div>

                        <div className='edit_content_section_subSection'>
                            <h3 className='edit_content_section_subSection_title'>Liens amis</h3>
                            <EditFriendUrlsList
                                friendUrls={friendUrlsList}
                                handleEditFriendUrl={handleEditFriendUrl}
                                handleLoadFriendUrls={handleLoadFriendUrls}
                                loaderDisplay={loaderDisplay}
                                setLoaderDisplay={setLoaderDisplay}
                            />

                            <button
                                className='edit_content_section_addButton'
                                onClick={() => {
                                    setDisplayFriendUrlForm(true);
                                    setFriendUrlFormMode('add');
                                }}
                            >
                                + AJOUTER UN LIEN +
                            </button>
                        </div>
                    </section>
                )}

                {/* EDITION FAQ */}
                {activeSection === 'faq' && (
                    <section className='edit_content_section'>
                        <h2 className='edit_content_section_title'>FAQ</h2>

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
                    </section>
                )}
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

            {displayFriendUrlForm === true && (
                <FriendUrlForm
                    friendUrlFormMode={friendUrlFormMode}
                    setFriendUrlFormMode={setFriendUrlFormMode}
                    handleLoadFriendUrls={handleLoadFriendUrls}
                    setDisplayFriendUrlForm={setDisplayFriendUrlForm}
                    displayFriendUrlForm={displayFriendUrlForm}
                    friendUrlEdit={friendUrlEdit}
                    setFriendUrlEdit={setFriendUrlEdit}
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
