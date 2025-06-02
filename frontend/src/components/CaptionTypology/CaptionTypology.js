import './CaptionTypology.scss';

function CaptionTypology({ index, sketches, isPictureDisplayed }) {
    const sketch = sketches[index];

    return (     
        <div className={`captionBox_container_datas ${sketch.specialTextClass}`}>
            {isPictureDisplayed === true &&
                <img 
                    className='captionBox_container_datas_image'
                    src={sketch.imageUrl}
                    alt={`objet ${index}`}
                />
            }
            {sketch.sketchCaption && sketch.sketchCaption !== '' &&
                <div 
                    className='captionBox_container_datas_caption' 
                    dangerouslySetInnerHTML={{ __html: sketch.sketchCaption }}
                />
            }
            {sketch.list &&
                <ul>
                    {sketch.list.map((item, idx) => (
                        <li key={idx}>
                            <a href={item.itemUrl} target="_blank" rel="noreferrer">{item.itemName}</a>
                        </li>
                    ))}
                </ul>
            }
        </div>       
    );
}

export default CaptionTypology;