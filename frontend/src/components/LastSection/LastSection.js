import './LastSection.scss';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

function LastSection() {
    const { projects } = useContext(ProjectsContext);

    return (
        <section className='last'>
            <h2>Vous avez un projet?</h2>

            <div className='last_descriptionContainer'>
                <p className='last_descriptionContainer_description'>
                Qu'il s'agisse d'une rénovation, d'une réhabilitation, d'une extension ou d'une construction neuve,
échangeons autour de votre projet.
                </p>
            </div>
            <div className='last_descriptionContainer_buttonContainer'>
                <Button
                    variant='link'
                    className='button_dark'
                    link=''
                    target='_blank'
                    rel='noreferrer'
                    ariaLabel='Découvrir tous les projets'
                >
                    PRENDRE CONTACT
                </Button>
            </div>
        </section>
    );
}

export default LastSection;