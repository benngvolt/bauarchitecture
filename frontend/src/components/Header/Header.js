import './Header.scss'
import { Link } from 'react-router-dom'
import NavSection from '../NavSection/NavSection'
import logo from "../../assets/bau_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import Loader from '../Loader/Loader'

 
function Header() {
    
    const { displayNavSection, setDisplayNavSection, loaderDisplay } = useContext(ProjectsContext);

    return  (      
        <header className={displayNavSection===true?'header header--fixed':'header'}>
            <div className='header_topBar'>
                <Link className='header_topBar_link' aria-label="Accéder à la page d'accueil" to="/" onClick={()=> setDisplayNavSection(false)}>
                    <img src={logo}/>
                </Link>
                <button onClick={()=> setDisplayNavSection(displayNavSection===true ?  false  : true)}>
                    {displayNavSection===false &&
                    <FontAwesomeIcon icon={faBars} />
                    }
                    {displayNavSection===true &&
                    <FontAwesomeIcon icon={faXmark} />
}
                </button>
            </div>
            {displayNavSection===true &&
                <NavSection/>
            }
            {loaderDisplay===true &&
                <Loader/>
            }
        </header>
    )
}

export default Header