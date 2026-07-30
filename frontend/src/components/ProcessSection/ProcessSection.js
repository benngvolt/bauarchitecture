import './ProcessSection.scss';

import { useContext, useState } from 'react';
import DOMPurify from 'dompurify';

import { ProjectsContext } from '../../utils/ProjectsContext';

function hasRichTextContent(richText) {
    if (!richText) {
        return false;
    }

    return richText.replace(/<[^>]*>/g, '').trim().length > 0;
}

function ProcessStepItem({ step, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const showToggle = hasRichTextContent(step.richText);

    return (
        <li className='process_list_item'>
            <div className='process_list_item_content'>
                <p className='process_list_item_content_index'>0{index + 1}</p>
                <h3>{step.title}</h3>
                <p className='process_list_item_content_text'>{step.tagline}</p>

                {showToggle && (
                    <>
                        <button
                            type='button'
                            className='process_list_item_content_toggle'
                            aria-expanded={isExpanded}
                            aria-label={isExpanded ? 'Réduire le paragraphe' : 'En savoir plus'}
                            onClick={() => setIsExpanded((current) => !current)}
                        >
                            {isExpanded ? '−' : '+'}
                        </button>

                        <div
                            className={
                                isExpanded
                                    ? 'process_list_item_content_details process_list_item_content_details--open'
                                    : 'process_list_item_content_details'
                            }
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(step.richText || ''),
                            }}
                        />
                    </>
                )}
            </div>
        </li>
    );
}

function ProcessSection() {
    const { processSteps } = useContext(ProjectsContext);

    return (
        <section className='process'>
            <ul className='process_list'>
                {processSteps.map((step, index) => (
                    <ProcessStepItem
                        key={step._id}
                        step={step}
                        index={index}
                    />
                ))}
            </ul>
        </section>
    );
}

export default ProcessSection;
