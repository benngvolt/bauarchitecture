import './CaptionTypology.scss';
import { API_URL } from '../../utils/constants';

function CaptionTypology({ index, sketches, isPictureDisplayed }) {
    const sketch = sketches?.[index];

    if (!sketch) return null;

    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    return (     
        <div className={`captionBox_container_datas ${sketch.specialTextClass || ''}`}>
            {isPictureDisplayed === true && sketch.imageUrl &&
                <img 
                    className='captionBox_container_datas_image'
                    src={getMediaUrl(sketch.imageUrl)}
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
                            <a href={item.itemUrl} target="_blank" rel="noreferrer">
                                {item.itemName}
                            </a>
                        </li>
                    ))}
                </ul>
            }
        </div>       
    );
}

export default CaptionTypology;