import './ReassuranceSection.scss';
import React, { useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';

function ReassuranceSection() {
    const { reassuranceItems } = useContext(ProjectsContext);

    if (!reassuranceItems?.length) {
        return null;
    }

    return (
        <section className='reassurance'>
            {reassuranceItems.slice(0, 3).map((reassuranceItem) => (
                <div className='reassurance_item' key={reassuranceItem._id}>
                    <p className='reassurance_item_title'>{reassuranceItem.title}</p>
                    {reassuranceItem.subtitle && (
                        <p className='reassurance_item_subtitle'>{reassuranceItem.subtitle}</p>
                    )}
                </div>
            ))}
        </section>
    );
}

export default ReassuranceSection;
