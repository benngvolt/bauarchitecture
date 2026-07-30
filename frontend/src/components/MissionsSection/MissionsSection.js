import './MissionsSection.scss';

const MISSIONS = [
    { key: 'construction', label: 'CONSTRUCTION' },
    { key: 'renovation', label: 'RÉNOVATION' },
    { key: 'extension', label: 'EXTENSION' },
    { key: 'amenagements', label: 'AMÉNAGEMENTS' },
];

// Icône leurre en attendant les SVG définitifs.
function PlaceholderIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
        >
            <rect x='3' y='3' width='18' height='18' rx='2' />
            <path d='M3 15l4.5-4.5 3 3 6-6 4.5 4.5' />
        </svg>
    );
}

function MissionsSection() {
    return (
        <section className='missions'>
            <ul className='missions_list'>
                {MISSIONS.map((mission) => (
                    <li className='missions_list_item' key={mission.key}>
                        <div className='missions_list_item_content'>
                            <PlaceholderIcon className='missions_list_item_content_icon' />
                            <h3>{mission.label}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MissionsSection;
