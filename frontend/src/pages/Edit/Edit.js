import './Edit.scss';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Collapse from '../../components/Collapse/Collapse';
import DrawingForm from '../../components/DrawingForm/DrawingForm';
import { ProjectsContext } from '../../utils/ProjectsContext';
import EditProjectsList from '../../components/EditProjectsList/EditProjectsList';
import EditArticlesList from '../../components/EditArticlesList/EditArticlesList';
import EditDrawingsList from '../../components/EditDrawingsList/EditDrawingsList';
import React, { useContext, useState, useEffect } from 'react';

function Edit() {
    const {
        handleLoadProjects,
        handleLoadArticles,
        handleLoadDrawings,
        drawings,
        projects,
        articles,
        loaderDisplay,
        setLoaderDisplay,
        setDisplayNavSection,
    } = useContext(ProjectsContext);

    const [projectFormMode, setProjectFormMode] = useState('add');
    const [projectsList, setProjectsList] = useState(projects);
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectEdit, setProjectEdit] = useState(null);

    const [articleFormMode, setArticleFormMode] = useState('add');
    const [articlesList, setArticlesList] = useState(articles);
    const [displayArticleForm, setDisplayArticleForm] = useState(false);
    const [articleEdit, setArticleEdit] = useState(null);

    useEffect(() => {
        setDisplayNavSection(false);
    }, []);

    useEffect(() => {
        setProjectsList(projects);
    }, [projects]);

    useEffect(() => {
        setArticlesList(articles);
    }, [articles]);

   
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
        </main>
    );
}

export default Edit;