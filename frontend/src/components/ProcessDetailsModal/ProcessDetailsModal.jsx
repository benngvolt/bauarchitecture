import './ProcessDetailsModal.scss';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DOMPurify from 'dompurify';

// Fenêtre « pop-up » du texte détaillé d'une étape : fond noir translucide, fermeture par le bouton,
// un clic à côté ou la touche Échap. Rendue dans <body> pour passer au-dessus de tout (en-tête, panneaux animés).
function ProcessDetailsModal({ index, title, tagline, details, onClose }) {
    const closeButtonRef = useRef(null);
    const titleId = `processModalTitle${index}`;

    useEffect(() => {
        const previouslyFocused = document.activeElement;
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus?.();
        };
    }, [onClose]);

    return createPortal(
        <div
            className='processModal'
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className='processModal_dialog' role='dialog' aria-modal='true' aria-labelledby={titleId}>
                <button
                    type='button'
                    className='processModal_close'
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label='Fermer'
                >
                    <span aria-hidden='true'>✕</span>
                    <span className='processModal_close_label'>FERMER</span>
                </button>

                <p className='processModal_index'>0{index + 1}</p>
                <h3 className='processModal_title' id={titleId}>{title}</h3>
                {tagline && <p className='processModal_tagline'>{tagline}</p>}
                <span className='processModal_separator' aria-hidden='true'>−</span>

                <div
                    className='processModal_details'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                />
            </div>
        </div>,
        document.body
    );
}

export default ProcessDetailsModal;
