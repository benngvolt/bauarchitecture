import './Edit.scss';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Collapse from '../../components/Collapse/Collapse';
import DrawingForm from '../../components/DrawingForm/DrawingForm';
import ReassuranceItemForm from '../../components/ReassuranceItemForm/ReassuranceItemForm';
import HeroImageForm from '../../components/HeroImageForm/HeroImageForm';
import { ProjectsContext } from '../../utils/ProjectsContext';
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList';
import EditArticlesList from '../../components/EditArticlesList/EditArticlesList';
import EditDrawingsList from '../../components/EditDrawingsList/EditDrawingsList';
import EditReassuranceItemsList from '../../components/EditReassuranceItemsList/EditReassuranceItemsList';
import React, { useContext, useState, useEffect } from 'react';

const MAX_REASSURANCE_ITEMS = 3;

function Edit() {
    const {
        handleLoadProjects,
        handleLoadArticles,
        handleLoadDrawings,
        handleLoadReassuranceItems,
        handleLoadHeroSettings,
        drawings,
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
            {/* EDITION PROJETS */}
            <Collapse title="GÉRER LES PROJETS">
                <div className='edit_projectsListContainer'>
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
                        className='edit_projectsListContainer_addButton'
                        onClick={() => {
                            setDisplayProjectForm(true);
                            setProjectFormMode('add');
                        }}
                    >
                        + AJOUTER UN PROJET +
                    </button>
                </div>
            </Collapse>

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

            {/* EDITION ARTICLES */}
            <Collapse title="GÉRER LES ARTICLES">
                <div className='edit_articlesListContainer'>
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
                        className='edit_articlesListContainer_addButton'
                        onClick={() => {
                            setDisplayArticleForm(true);
                            setArticleFormMode('add');
                        }}
                    >
                        + AJOUTER UN ARTICLE +
                    </button>
                </div>
            </Collapse>

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

            {/* EDITION ARGUMENTS DE RÉASSURANCE (HERO) */}
            <Collapse title="GÉRER LES ARGUMENTS DE RÉASSURANCE">
                <div className='edit_reassuranceItemsListContainer'>
                    <EditReassuranceItemsList
                        reassuranceItems={reassuranceItemsList}
                        handleEditReassuranceItem={handleEditReassuranceItem}
                        handleLoadReassuranceItems={handleLoadReassuranceItems}
                        loaderDisplay={loaderDisplay}
                        setLoaderDisplay={setLoaderDisplay}
                    />

                    {reassuranceItemsList.length >= MAX_REASSURANCE_ITEMS ? (
                        <p className='edit_reassuranceItemsListContainer_maxReached'>
                            Le maximum de {MAX_REASSURANCE_ITEMS} arguments est atteint. Supprimez-en un pour en ajouter un nouveau.
                        </p>
                    ) : (
                        <button
                            className='edit_reassuranceItemsListContainer_addButton'
                            onClick={() => {
                                setDisplayReassuranceItemForm(true);
                                setReassuranceItemFormMode('add');
                            }}
                        >
                            + AJOUTER UN ARGUMENT +
                        </button>
                    )}
                </div>
            </Collapse>

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

            {/* EDITION IMAGE DE FOND DU HERO */}
            <Collapse title="GÉRER L'IMAGE DU HERO">
                <div className='edit_heroImageContainer'>
                    <HeroImageForm
                        heroSettings={heroSettings}
                        defaultHeroImageUrl={defaultHeroImageUrl}
                        handleLoadHeroSettings={handleLoadHeroSettings}
                        loaderDisplay={loaderDisplay}
                        setLoaderDisplay={setLoaderDisplay}
                    />
                </div>
            </Collapse>
        </main>
    );
}

export default Edit;