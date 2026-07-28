import './Edit.scss';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import ReassuranceItemForm from '../../components/ReassuranceItemForm/ReassuranceItemForm';
import HeroImageForm from '../../components/HeroImageForm/HeroImageForm';
import { ProjectsContext } from '../../utils/ProjectsContext';
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList';
import EditArticlesList from '../../components/EditArticlesList/EditArticlesList';
import EditReassuranceItemsList from '../../components/EditReassuranceItemsList/EditReassuranceItemsList';
import React, { useContext, useState, useEffect } from 'react';

const MAX_REASSURANCE_ITEMS = 3;

const SECTIONS = [
    { key: 'projects', label: 'PROJETS' },
    { key: 'articles', label: 'ARTICLES' },
    { key: 'reassurance', label: 'ARGUMENTS DE RÉASSURANCE' },
    { key: 'hero', label: 'IMAGE DU HERO' },
];

function Edit() {
    const {
        handleLoadProjects,
        handleLoadArticles,
        handleLoadReassuranceItems,
        handleLoadHeroSettings,
        projects,
        articles,
        reassuranceItems,
        heroSettings,
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
        </main>
    );
}

export default Edit;
