import './ArticlesDetail.scss';
import React from 'react';
import { API_URL } from '../../utils/constants';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function ArticlesDetail({ article }) {
    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    const formatDate = (date) => {
        if (!date) return '';

        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(date));
    };

    return (
        <div className='articlesDetail'>
            
            <p className='articlesDetail_date'>
                {formatDate(article.date)}
            </p>
            <h5>{article?.title}</h5>
            <div
                className='articlesDetail_description'
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article?.description || ''),
                }}
            />

            <ul className='articlesDetail_images'>
                {article?.articles?.map((articleImage, index) => (
                    <li key={`article_${index}`}>
                        <img
                            src={getMediaUrl(articleImage.imageUrl)}
                            alt={`article ${index}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticlesDetail;