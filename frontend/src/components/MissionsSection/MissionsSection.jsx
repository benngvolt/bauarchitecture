import './MissionsSection.scss';
import { useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';
import { DEFAULT_MISSION_DESCRIPTIONS } from '../../utils/constants';

import { MISSIONS } from './missions';

function MissionsSection() {
    const { missionsSettings } = useContext(ProjectsContext);

    return (
        <section className='missions'>
            <ul className='missions_list'>
                {MISSIONS.map(({ key, label, Icon }) => (
                    <li className='missions_list_item' key={key}>
                        <div className='missions_list_item_content'>
                            <Icon
                                className='missions_list_item_content_icon'
                                aria-hidden='true'
                                focusable='false'
                            />
                            <h3>{label}</h3>
                            <p className='missions_list_item_content_text'>
                                {missionsSettings?.[key] || DEFAULT_MISSION_DESCRIPTIONS[key]}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MissionsSection;
