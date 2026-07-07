import './Articles.scss';
import { Link } from 'react-router-dom';
import { ProjectsContext } from '../../utils/ProjectsContext';
import ArticlesGrid from '../../components/ArticlesGrid/ArticlesGrid';
import React, { useContext, useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function Articles() {
    const {
        articles,
    } = useContext(ProjectsContext);

    const [articleDisplayed, setArticleDisplayed] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        setArticleDisplayed({});
    }, []);

    return (
        <main>
            <section className='articles'>
                <div className='articles_listTextContainer'>
                    <ul className='articles_listTextContainer_list'>
                        {articles.map((article) => (
                            <li
                                key={article._id}
                                className='articles_listTextContainer_list_item'
                                onClick={() => setArticleDisplayed(article)}
                            >
                                <h5
                                    className={
                                        article.title === articleDisplayed.title
                                            ? 'articles_listTextContainer_list_item_name articles_listTextContainer_list_item_name--selected'
                                            : 'articles_listTextContainer_list_item_name articles_listTextContainer_list_item_name--notSelected'
                                    }
                                >
                                    {article.title}
                                </h5>
                            </li>
                        ))}
                    </ul>

                    {Object.keys(articleDisplayed).length !== 0 && (
                        <div className='articles_listTextContainer_text'>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(articleDisplayed?.description),
                                }}
                            ></p>
                        </div>
                    )}
                </div>

                {Object.keys(articleDisplayed).length !== 0 && (
                    <div className='articles_gridContainer'>
                        <ArticlesGrid article={articleDisplayed} />
                    </div>
                )}
            </section>
        </main>
    );
}

export default Articles;