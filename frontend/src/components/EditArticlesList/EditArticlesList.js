import './EditArticlesList.scss';
import ConfirmBox from '../ConfirmBox/ConfirmBox';

import React, { useState } from 'react';
import { API_URL } from '../../utils/constants';

function EditArticlesList({
    articles,
    handleEditArticle,
    handleLoadArticles,
    loaderDisplay,
    setLoaderDisplay,
}) {
    const [confirmBoxEPLState, setConfirmBoxEPLState] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);

    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    function closeConfirmBox() {
        setConfirmBoxEPLState(false);
    }

    function openConfirmBox() {
        setConfirmBoxEPLState(true);
    }

    function deleteArticle() {
        if (!articleToDelete) return;

        setLoaderDisplay(true);

        fetch(`${API_URL}/api/articles/${articleToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    setLoaderDisplay(false);
                }

                setConfirmBoxEPLState(false);
                handleLoadArticles();
                setArticleToDelete(null);
            })
            .catch((error) => {
                setLoaderDisplay(false);
                console.log(error.message);
            });
    }

    return (
        <div className='editProjectList'>
            <ul className='editProjectList_list editArticlesList_list'>
                {articles?.map((article) => {
                    const mainImageUrl =
                        article?.articles?.[article.mainArticleIndex]?.imageUrl;

                    return (
                        <li
                            className='editProjectList_list_item'
                            key={article._id}
                        >
                            {mainImageUrl && (
                                <img
                                    src={getMediaUrl(mainImageUrl)}
                                    alt={article.title}
                                />
                            )}

                            <p className='editProjectList_list_item_title'>
                                {article.title}
                            </p>

                            <div className='editProjectList_list_item_buttonsContainer'>
                                <button
                                    aria-label="Supprimer l'article"
                                    onClick={() => {
                                        setArticleToDelete(article);
                                        openConfirmBox();
                                    }}
                                    type='button'
                                >
                                    Supprimer
                                </button>

                                <button
                                    aria-label="Modifier l'article"
                                    onClick={() => {
                                        handleEditArticle(article);
                                    }}
                                >
                                    Modifier
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <ConfirmBox
                confirmBoxState={confirmBoxEPLState}
                affirmativeChoice={deleteArticle}
                negativeChoice={closeConfirmBox}
            />
        </div>
    );
}

export default EditArticlesList;