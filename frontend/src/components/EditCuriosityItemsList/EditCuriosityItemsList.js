import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState } from 'react'
import { API_URL } from '../../utils/constants'
import { authFetch } from '../../utils/auth'


// Liste des objets du cabinet de curiosités : l'ordre de la liste est l'ordre d'affichage (de gauche à droite, puis ligne par ligne).
function EditCuriosityItemsList ({
    curiosityItems,
    handleEditCuriosityItem,
    handleLoadCuriosityItems,
    setLoaderDisplay
    }) {

    const [confirmBoxState, setConfirmBoxState] = useState(false);
    const [curiosityItemToDelete, setCuriosityItemToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxState(false);
    }
    function openConfirmBox () {
        setConfirmBoxState(true);
    }

    function deleteCuriosityItem() {
        setLoaderDisplay(true)
        authFetch(`${API_URL}/api/curiosity-items/${curiosityItemToDelete._id}`, {
            method: 'DELETE',
        })
        .then (() => {
            setLoaderDisplay(false)
            setConfirmBoxState (false);
            handleLoadCuriosityItems();
            setCuriosityItemToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    function moveCuriosityItem(index, direction) {
        const ids = curiosityItems.map((item) => item._id);
        const targetIndex = index + direction;

        [ids[index], ids[targetIndex]] = [ids[targetIndex], ids[index]];

        setLoaderDisplay(true)
        authFetch(`${API_URL}/api/curiosity-items/order`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        })
        .then (() => {
            setLoaderDisplay(false)
            handleLoadCuriosityItems();
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editCuriosityItemsList'>
            {curiosityItems.length === 0 && (
                <p className='adminIntro'>Aucun objet pour l'instant : le cabinet de curiosités n'est pas affiché sur la page À propos.</p>
            )}

            <ul className='adminCardList adminCardList--curiosities'>
                {curiosityItems.map((curiosityItem, index)=>(
                <li key={curiosityItem._id}>
                    <div className='adminCardList_thumb'>
                        <img src={`${API_URL}${curiosityItem.imageUrl}`} alt='' />
                    </div>
                    <p className='adminCardList_index'>Objet {index + 1}</p>
                    <p className='adminCardList_title' style={{ textTransform: 'none' }}>{curiosityItem.name}</p>
                    <div className='adminCardList_actions'>
                        <button
                            type='button'
                            className='adminButton adminButton--secondary adminButton--small'
                            aria-label={`Modifier l'objet ${curiosityItem.name}`}
                            onClick={() => {
                                handleEditCuriosityItem(curiosityItem);
                            }}
                        >
                            Modifier
                        </button>
                        <button
                            type='button'
                            className='adminButton adminButton--text adminButton--danger'
                            aria-label={`Supprimer l'objet ${curiosityItem.name}`}
                            onClick={() => {
                                setCuriosityItemToDelete (curiosityItem)
                                openConfirmBox()
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                    <div className='adminCardList_actions'>
                        <button
                            type='button'
                            className='adminButton adminButton--text adminButton--small'
                            aria-label={`Déplacer l'objet ${curiosityItem.name} vers le début`}
                            disabled={index === 0}
                            onClick={() => moveCuriosityItem(index, -1)}
                        >
                            ← Avant
                        </button>
                        <button
                            type='button'
                            className='adminButton adminButton--text adminButton--small'
                            aria-label={`Déplacer l'objet ${curiosityItem.name} vers la fin`}
                            disabled={index === curiosityItems.length - 1}
                            onClick={() => moveCuriosityItem(index, 1)}
                        >
                            Après →
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxState}
                affirmativeChoice={deleteCuriosityItem}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditCuriosityItemsList
