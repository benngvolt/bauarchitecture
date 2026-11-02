import './FeaturedProjectsForm.scss'
import AdminField from '../AdminUI/AdminField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL } from '../../utils/constants'
import { FEATURED_PROJECTS_COUNT } from '../../utils/featuredProjects'


function FeaturedProjectsForm ({
    projects,
    featuredProjects,
    handleLoadFeaturedProjects,
    loaderDisplay,
    setLoaderDisplay
    }) {

    const savedProjectIds = (featuredProjects?.projectIds || []).join(',');

    const [selectedIds, setSelectedIds] = useState(
        Array(FEATURED_PROJECTS_COUNT).fill('')
    );
    const [statusMessage, setStatusMessage] = useState('');

    // Reprend les projets enregistrés (en ignorant ceux qui n'existent plus).
    useEffect(() => {
        const existingIds = savedProjectIds
            .split(',')
            .filter((projectId) => projects.some((project) => project._id === projectId));

        setSelectedIds(
            Array.from({ length: FEATURED_PROJECTS_COUNT }, (_, index) => existingIds[index] || '')
        );
    }, [savedProjectIds, projects]);

    function handleSelectChange(slotIndex, projectId) {
        setSelectedIds((currentIds) =>
            currentIds.map((currentId, index) => (index === slotIndex ? projectId : currentId))
        );
        setStatusMessage('');
    }

    function saveSelection(projectIds, successMessage) {
        setLoaderDisplay(true);
        setStatusMessage('');

        fetch(`${API_URL}/api/featured-projects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: JSON.stringify({ projectIds }),
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error || `Erreur ${response.status}`);
                });
            }
            return response.json();
        })
        .then(() => {
            handleLoadFeaturedProjects();
            setStatusMessage(successMessage);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setStatusMessage("Erreur : la sélection n'a pas pu être enregistrée.");
            setLoaderDisplay(false);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        saveSelection(selectedIds.filter(Boolean), 'Sélection enregistrée.');
    }

    function resetSelection() {
        saveSelection([], 'Sélection automatique rétablie.');
    }

    const savedIds = savedProjectIds.split(',').filter((projectId) =>
        projects.some((project) => project._id === projectId)
    );
    const isModified = JSON.stringify(selectedIds.filter(Boolean)) !== JSON.stringify(savedIds);

    return (
        <form className='adminForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='adminIntro'>
                Choisissez les {FEATURED_PROJECTS_COUNT} projets présentés sur la page d'accueil, dans l'ordre d'affichage.
                Un emplacement laissé sur « Automatique » est complété avec les premiers projets de la liste.
            </p>

            <div className='adminCard'>
                {selectedIds.map((selectedId, slotIndex) => {
                    const selectedProject = projects.find((project) => project._id === selectedId);
                    const mainImage = selectedProject?.images?.[selectedProject.mainImageIndex] || selectedProject?.images?.[0];

                    return (
                        <div className='adminProjectSlot' key={slotIndex}>
                            <div className='adminProjectSlot_thumb'>
                                {mainImage?.imageUrl
                                    ? <img src={`${API_URL}${mainImage.imageUrl}`} alt='' />
                                    : <span aria-hidden='true'>{slotIndex + 1}</span>}
                            </div>

                            <AdminField
                                id={`inputFeaturedProject${slotIndex}`}
                                label={`Projet ${slotIndex + 1}`}
                                as='select'
                                value={selectedId}
                                onChange={(projectId) => handleSelectChange(slotIndex, projectId)}
                            >
                                <option value=''>Automatique</option>
                                {projects.map((project) => (
                                    <option
                                        key={project._id}
                                        value={project._id}
                                        disabled={selectedIds.includes(project._id) && selectedId !== project._id}
                                    >
                                        {project.title}
                                    </option>
                                ))}
                            </AdminField>
                        </div>
                    );
                })}
            </div>

            <div className='adminActions'>
                <button type='submit' className='adminButton' disabled={!isModified}>
                    Enregistrer
                </button>

                {savedProjectIds && (
                    <button type='button' className='adminButton adminButton--text' onClick={resetSelection}>
                        Rétablir la sélection automatique
                    </button>
                )}

                {statusMessage && (
                    <p
                        className={statusMessage.startsWith('Erreur') ? 'adminStatus adminStatus--error' : 'adminStatus'}
                        role='status'
                    >
                        {statusMessage}
                    </p>
                )}
            </div>
        </form>
    )
}

export default FeaturedProjectsForm
