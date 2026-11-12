import './BannerSection.scss';
import React, { useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';
import { API_URL } from '../../utils/constants';
import { getDefaultBannerImage } from '../../utils/homeImages';

function BannerSection() {
    const { projects, homeBanner } = useContext(ProjectsContext);

    const customImageUrl = homeBanner?.imageUrl;
    const defaultImage = getDefaultBannerImage(projects);
    const imageUrl = customImageUrl || defaultImage?.imageUrl;

    if (!imageUrl) {
        return null;
    }

    const alt = customImageUrl || !defaultImage.projectTitle
        ? 'BAU Architecture'
        : `Projet ${defaultImage.projectTitle} par BAU Architecture`;

    return (
        <section className='banner'>
            <img className='banner_image' src={`${API_URL}${imageUrl}`} alt={alt} />
        </section>
    );
}

export default BannerSection;
