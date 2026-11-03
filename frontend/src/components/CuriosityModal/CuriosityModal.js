import './CuriosityModal.scss';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { sanitizeRichTextWithLinks } from '../../utils/richText';

// Fenêtre « pop-up » d'un objet du cabinet de curiosités : texte enrichi (liens compris) sur fond noir translucide.
// Fermeture par le bouton, un clic à côté ou la touche Échap ; rendue dans <body> pour passer au-dessus de tout.
function CuriosityModal({ name, richText, onClose }) {
    const closeButtonRef = useRef(null);

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
            className='curiosityModal'
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className='curiosityModal_dialog' role='dialog' aria-modal='true' aria-label={name}>
                <button
                    type='button'
                    className='curiosityModal_close'
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label='Fermer'
                >
                    <span aria-hidden='true'>✕</span>
                    <span className='curiosityModal_close_label'>FERMER</span>
                </button>

                <div
                    className='curiosityModal_text'
                    dangerouslySetInnerHTML={{ __html: sanitizeRichTextWithLinks(richText) }}
                />
            </div>
        </div>,
        document.body
    );
}

export default CuriosityModal;
