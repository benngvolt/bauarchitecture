import './Modal.scss'
    
function Modal({setDisplayModal, children, index}) {
    
    return (
        <div className='modal'>
            <div className='modal_container'>
                <p  className='modal_container_closeButton'
                    onClick={()=>{
                        setDisplayModal(false);
                }}>X FERMER</p>             
                <div className='modal_container_datas'>
                    {children}
                </div> 
            </div>     
        </div>
    )
}

export default Modal