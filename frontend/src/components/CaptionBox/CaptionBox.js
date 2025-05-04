import './CaptionBox.scss'
    
function CaptionBox({setHandleDisplayCaptionBox, index, sketches, isPictureDisplayed}) {
    
    return (
        <div className='captionBox'>
            <div className='captionBox_container'>
                <p  className='captionBox_container_closeButton'
                    onClick={()=>{
                        setHandleDisplayCaptionBox(false);
                }}>X FERMER</p>             
                <div className='captionBox_container_datas'>
                    {isPictureDisplayed===true &&
                        <img 
                            className='captionBox_container_datas_image'
                            src={sketches[index].imageUrl}
                            alt={`objet ${index}`}
                        />
                    }
                    {sketches[index].sketchCaption && sketches[index].sketchCaption !=='' &&
                    <div className='captionBox_container_datas_caption'>
                        <p className='captionBox_container_datas_caption_caption'>{sketches[index].sketchCaption}</p>
                        {sketches[index].list &&
                            <ul>
                                {sketches[index].list.map((item)=>(
                                    <li>
                                        <a href={item.itemUrl} target="_blank" rel="noreferrer">{item.itemName}</a>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                    }
                </div> 
            </div>     
        </div>
    )
}

export default CaptionBox