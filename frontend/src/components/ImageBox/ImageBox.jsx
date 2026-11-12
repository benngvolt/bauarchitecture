import './ImageBox.scss';

function ImageBox({ children, setHandleDisplayImageBox }) {

    return (
        <div className='imageBox' onClick={() => setHandleDisplayImageBox(false)}>
            {children}
        </div>
        
    );
}

export default ImageBox;