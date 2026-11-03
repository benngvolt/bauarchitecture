import './CuriosityCabinet.scss';
import { useCallback, useContext, useState } from 'react';
import CuriosityModal from '../CuriosityModal/CuriosityModal';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

// Cabinet de curiosités : une grille de photos d'« objets » ; un clic ouvre le texte enrichi de l'objet dans une pop-up.
function CuriosityCabinet() {
    const { curiosityItems } = useContext(ProjectsContext);
    const [openedItem, setOpenedItem] = useState(null);

    const closeModal = useCallback(() => setOpenedItem(null), []);

    if (!curiosityItems || curiosityItems.length === 0) {
        return null;
    }

    return (
        <section className='curiosityCabinet' aria-label='Cabinet de curiosités'>
            <ul className='curiosityCabinet_grid'>
                {curiosityItems.map((item) => (
                    <li key={item._id}>
                        <button
                            type='button'
                            className='curiosityCabinet_object'
                            aria-haspopup='dialog'
                            aria-label={item.name}
                            onClick={() => setOpenedItem(item)}
                        >
                            <img src={`${API_URL}${item.imageUrl}`} alt='' loading='lazy' />
                        </button>
                    </li>
                ))}
            </ul>

            {openedItem && (
                <CuriosityModal
                    name={openedItem.name}
                    richText={openedItem.richText}
                    onClose={closeModal}
                />
            )}
        </section>
    );
}

export default CuriosityCabinet;
