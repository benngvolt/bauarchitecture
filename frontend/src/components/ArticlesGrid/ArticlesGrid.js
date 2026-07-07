import './ArticlesGrid.scss';
import React from 'react';
import { API_URL } from '../../utils/constants';

function ArticlesGrid({ article }) {
    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    return (
        <ul className='articlesGrid'>
            {article?.articles?.map((articleImage, index) => (
                <li key={`article_${index}`}>
                    <img
                        className='articlesGrid_img'
                        src={getMediaUrl(articleImage.imageUrl)}
                        alt={`article ${index}`}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ArticlesGrid;