import './CaptionBox.scss';

function CaptionBox({ children, setHandleDisplayCaptionBox }) {

    return (
        <div className='captionBox'>
            <div className='captionBox_container' >
                <p className='captionBox_container_closeButton' onClick={() => setHandleDisplayCaptionBox(false)}>
                    X FERMER
                </p>      
                {children}
            </div>
        </div>
        
    );
}

export default CaptionBox;