import './ApproachSection.scss';
import React, { useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';
import { DEFAULT_APPROACH_TITLE, DEFAULT_APPROACH_ITEMS } from '../../utils/constants';

function ApproachSection() {
    const { approachSettings } = useContext(ProjectsContext);

    const title = approachSettings?.title || DEFAULT_APPROACH_TITLE;
    const items = approachSettings?.items?.length
        ? approachSettings.items
        : DEFAULT_APPROACH_ITEMS;

    return (
        <section className='approach'>
            <h2>{title}</h2>
            <ul className='approach_list'>
                {items.map((item, index) => (
                    <li
                        className='approach_list_item'
                        key={`${index}-${item.title}`}
                    >
                        <h3>{item.title}</h3>
                        {item.text && <p>{item.text}</p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ApproachSection;
