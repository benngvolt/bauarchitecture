import './MissionsSection.scss';
import { useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';
import { DEFAULT_MISSION_DESCRIPTIONS } from '../../utils/constants';

// Pictogrammes : remplacer les fichiers de src/assets (logo_*.svg) suffit à les changer.
import { ReactComponent as LogoConstruction } from '../../assets/logo_construction.svg';
import { ReactComponent as LogoRenovation } from '../../assets/logo_renovation.svg';
import { ReactComponent as LogoExtension } from '../../assets/logo_extension.svg';
import { ReactComponent as LogoAmenagements } from '../../assets/logo_amenagements.svg';

const MISSIONS = [
    { key: 'construction', label: 'CONSTRUCTION', Icon: LogoConstruction },
    { key: 'renovation', label: 'RÉNOVATION', Icon: LogoRenovation },
    { key: 'extension', label: 'EXTENSION', Icon: LogoExtension },
    { key: 'amenagements', label: 'AMÉNAGEMENTS', Icon: LogoAmenagements },
];

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
