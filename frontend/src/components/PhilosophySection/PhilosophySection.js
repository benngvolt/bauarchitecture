import './PhilosophySection.scss';
import { useContext } from 'react';
import DOMPurify from 'dompurify';
import portrait from '../../assets/portrait.webp'
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

const DEFAULT_PARAGRAPHS = [
    'De la diversité de mon parcours, des programmes, des lieux et des échelles abordés, ce processus est le fil rouge du travail présenté ici, nourri de ce que j’ai appris, désappris, expérimenté, compris et défendu.',
    'D’abord au contact des nombreuses agences qui m’ont accueillie, tout près d’ici ou loin là-bas. Elles m’ont permis d’aborder des échelles et des typologies de projets d’une grande richesse et de découvrir la force d’une équipe.',
    'Puis, dès 2018, dans un parcours en mon nom. Choisi, orienté, dessiné et destiné par moi-même, mais toujours entourée, en complicité et en confiance. J’y ai alors découvert tous mes autres métiers et l’importance du chantier.',
    'Observer, diagnostiquer, comprendre, proposer : ce fil rouge a été ma constante.',
    'L’attention portée à la lecture d’un contexte, d’un lieu et d’une situation donne justesse, sens et cohérence à l’intervention.',
];

function PhilosophySection() {
    const { aboutPageContent } = useContext(ProjectsContext);

    const imageUrl = aboutPageContent?.philosophyImageUrl
        ? `${API_URL}${aboutPageContent.philosophyImageUrl}`
        : portrait;

    return (
        <section className='philosophy'>
            <div className='philosophy_content'>
                {aboutPageContent?.philosophyText ? (
                    <div
                        className='philosophy_text'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(aboutPageContent.philosophyText, { ADD_ATTR: ['target'] }),
                        }}
                    />
                ) : (
                    <div className='philosophy_text'>
                        {DEFAULT_PARAGRAPHS.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}

                <figure className='philosophy_figure'>
                    <img
                        src={imageUrl}
                        alt=''
                    />
                </figure>
            </div>
        </section>
    );
}

export default PhilosophySection;
