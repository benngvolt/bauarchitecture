import './FeaturedProjectsForm.scss'
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

    return (
        <form className='featuredProjectsForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='featuredProjectsForm_text'>
                <em>
                    Choisissez les {FEATURED_PROJECTS_COUNT} projets présentés sur la page d'accueil, dans l'ordre d'affichage.
                    Un emplacement laissé sur « Automatique » est complété avec les premiers projets de la liste.
                </em>
            </p>

            <div className='featuredProjectsForm_slots'>
                {selectedIds.map((selectedId, slotIndex) => (
                    <div className='featuredProjectsForm_slots_slot' key={slotIndex}>
                        <label htmlFor={`inputFeaturedProject${slotIndex}`}>
                            PROJET {slotIndex + 1}
                        </label>
                        <select
                            id={`inputFeaturedProject${slotIndex}`}
                            value={selectedId}
                            onChange={(event) => handleSelectChange(slotIndex, event.target.value)}
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
                        </select>
                    </div>
                ))}
            </div>

            <div className='featuredProjectsForm_buttonsContainer'>
                <button type='submit'>ENREGISTRER</button>

                {savedProjectIds && (
                    <button type='button' onClick={resetSelection}>
                        RÉTABLIR LA SÉLECTION AUTOMATIQUE
                    </button>
                )}
            </div>

            {statusMessage && (
                <p className='featuredProjectsForm_status' role='status'>{statusMessage}</p>
            )}
        </form>
    )
}

export default FeaturedProjectsForm
