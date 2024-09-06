import './CaptionBox.scss'
    
function CaptionBox({setHandleDisplayCaptionBox, index, sketches}) {
    
    return (
        <div className='captionBox'>
            <div className='captionBox_container'>
                <p  className='captionBox_container_closeButton'
                    onClick={()=>{
                        setHandleDisplayCaptionBox(false);
                }}>X FERMER</p>             
                <div className='captionBox_container_datas'>
                    <img 
                        className='captionBox_container_datas_image'
                        src={sketches[index].imageUrl}
                        alt={`objet ${index}`}
                    />
                    {sketches[index].sketchCaption && sketches[index].sketchCaption !=='' &&
                    <div className='captionBox_container_datas_caption'>
                        <p className='captionBox_container_datas_caption_index'>#{index + 1}</p>
                        <p className='captionBox_container_datas_caption_caption'>{sketches[index].sketchCaption}</p> 
                    </div>
                    }
                </div> 
            </div>     
        </div>
    )
}

export default CaptionBox