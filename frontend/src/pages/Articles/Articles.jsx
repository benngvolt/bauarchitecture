import './Articles.scss';
import { ProjectsContext } from '../../utils/ProjectsContext';
import ArticlesDetail from '../../components/ArticleDetail/ArticlesDetail';
import React, { useContext, useState, useEffect } from 'react';
import { API_URL } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function Articles() {
    const { articles } = useContext(ProjectsContext);

    const [articleDisplayed, setArticleDisplayed] = useState({});
    const [handleArticleModal, setHandleArticleModal] = useState('nothing')

    // const isArticleOpen = Object.keys(articleDisplayed).length !== 0;

    const formatDate = (date) => {
        if (!date) return '';

        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(date));
    };

    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setArticleDisplayed({});
    }, []);

    const sortedArticles = [...articles].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <main>
            <section className='articles'>
                <div className='articles_listTextContainer'>
                    <ul className='articles_listTextContainer_list'>
                        {sortedArticles.map((article) => (
                            <li
                                key={article._id}
                                className='articles_listTextContainer_list_item'
                                onClick={() => {
                                    setHandleArticleModal('opened');
                                    setArticleDisplayed(article);
                                }}
                            >
                                <p className='articles_listTextContainer_list_item_date'>
                                    {formatDate(article.date)}
                                </p>

                                <h5
                                    className={
                                        article._id === articleDisplayed._id
                                            ? 'articles_listTextContainer_list_item_name articles_listTextContainer_list_item_name--selected'
                                            : 'articles_listTextContainer_list_item_name articles_listTextContainer_list_item_name--notSelected'
                                    }
                                >
                                    {article.title}
                                </h5>

                                <p className='articles_listTextContainer_list_item_shortSummary'>
                                    "Résumé de l'article généré par une IA"
                                </p>

                                <img
                                    className='articles_listTextContainer_list_item_image'
                                    src={getMediaUrl(article.articles?.[0]?.imageUrl)}
                                    alt={article.title}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* {isArticleOpen && ( */}
                    <div className={`articles_gridContainer articles_gridContainer--${handleArticleModal}`}>
                        <button
                            className='articles_gridContainer_close'
                            type='button'
                            onClick={() => {
                                setHandleArticleModal('closed');
                            
                                setTimeout(() => {
                                    setArticleDisplayed({});
                                }, 500);
                            }}
                            aria-label='Fermer l’article'
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <ArticlesDetail article={articleDisplayed} />
                    </div>
                {/* )} */}
            </section>
        </main>
    );
}

export default Articles;