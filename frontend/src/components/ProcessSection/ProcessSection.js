import './ProcessSection.scss';

import { useContext, useState } from 'react';

import { ProjectsContext } from '../../utils/ProjectsContext';
import { DEFAULT_PROCESS_TITLE, DEFAULT_PROCESS_DETAILS } from '../../utils/constants';
import { hasRichTextContent } from '../../utils/richText';
import ProcessDetailsModal from '../ProcessDetailsModal/ProcessDetailsModal';

function ProcessStepItem({ step, index }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const details = hasRichTextContent(step.richText)
        ? step.richText
        : DEFAULT_PROCESS_DETAILS[index] || '';
    const hasDetails = hasRichTextContent(details);

    return (
        <li className='process_list_item'>
            {/* Le conteneur disparaît de la mise en page : ses enfants occupent les rangées communes de la liste,
                ce qui aligne les boutons « + de détails » des quatre étapes sur une même ligne. */}
            <div className='process_list_item_content'>
                <p className='process_list_item_content_index'>0{index + 1}</p>
                <h3>{step.title}</h3>
                <p className='process_list_item_content_text'>{step.tagline}</p>

                {hasDetails ? (
                    <button
                        type='button'
                        className='process_list_item_content_toggle'
                        aria-haspopup='dialog'
                        onClick={() => setIsModalOpen(true)}
                    >
                        + de détails
                    </button>
                ) : (
                    <span />
                )}
            </div>

            {isModalOpen && (
                <ProcessDetailsModal
                    index={index}
                    title={step.title}
                    tagline={step.tagline}
                    details={details}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </li>
    );
}

function ProcessSection() {
    const { processSteps, processSettings } = useContext(ProjectsContext);

    return (
        <section className='process'>
            <h2>{processSettings?.title || DEFAULT_PROCESS_TITLE}</h2>

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
