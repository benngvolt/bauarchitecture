import { useState } from 'react';
import './Collapse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronDown
} from '@fortawesome/free-solid-svg-icons'


function Collapse({children, title}) {


    const [isCollapseOpened, setIsCollapseOpened] = useState(false);
    
    function handleCollapseState() {
        const childrenElement = document.getElementById(`collapsible${title}`);
        if (isCollapseOpened === true) {
            setIsCollapseOpened(false);
        } else {
            setIsCollapseOpened(true);
        }
    }

    return (     
        <section className='collapse'> 
            <button type='button' 
                className={isCollapseOpened===false? 'collapse_collapseButton collapse_collapseButton--close' : 'collapse_collapseButton collapse_collapseButton--open'} 
                onClick={handleCollapseState}
                aria-label={`ouvrir la section ${title}`}
                aria-expanded={isCollapseOpened===false? false : true}
                aria-controls={`collapsible${title}`}>
                <div className='collapse_collapseButton_titleContainer'>
                    <p>{title}</p>
                    <FontAwesomeIcon icon={faChevronDown} className={isCollapseOpened===false?'collapse_collapseButton_icon collapse_collapseButton_icon--closed':'collapse_collapseButton_icon collapse_collapseButton_icon--opened'}/>
                </div>
            </button>
            <div id={`collapsible${title}`} className={isCollapseOpened===false?'collapse_children collapse_children--closed':'collapse_children collapse_children--opened'}>
                {children}
            </div>
        </section>
    )   
}

export default Collapse