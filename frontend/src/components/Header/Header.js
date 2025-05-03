import './Header.scss'
import { Link, useLocation } from 'react-router-dom'
import NavSection from '../NavSection/NavSection'
import logo from "../../assets/bau_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import Loader from '../Loader/Loader'

 
function Header() {
    
    const { displayNavSection, setDisplayNavSection, loaderDisplay, currentPage, setCurrentPage } = useContext(ProjectsContext);
    const location = useLocation();
    const menuTitles = ["projets", "prestations", "voyages", "dessins" ]

    useEffect(() => {
        if (displayNavSection===false) {
            if (location.pathname==="/about") {
                setCurrentPage('about')
            } else if (location.pathname==="/projets") {
                setCurrentPage('projets')
            } else if (location.pathname==="/prestations") {
                setCurrentPage('prestations')
            } else if (location.pathname==="/edit") {
                setCurrentPage('tableau de bord')
            } else if (location.pathname==="/voyages") {
                setCurrentPage('voyages')
            } else if (location.pathname==="/dessins") {
                setCurrentPage('dessins')
            } else if (location.pathname==="/references") {
                setCurrentPage('références')
            } else {
                setCurrentPage('')
            }
        } else {
            setCurrentPage('')
        }
    }, [location.pathname, displayNavSection]);

    return  (      
        <header className='header--fixed'>
            {loaderDisplay===true &&
                <Loader/>
            }
            <div className='header_topBar'>
                <div className='header_topBar_leftElements'>
                    <Link className='header_topBar_leftElements_link' aria-label="Accéder à la page d'accueil" to="/" onClick={()=> setDisplayNavSection(false)}>
                        <img src={logo}/>
                    </Link>
                </div>
                <ul className='header_topBar_menu'>
                    {displayNavSection===false &&
                    <li className='header_topBar_menu_item'>
                        <Link className='header_topBar_menu_item_link' 
                                aria-label={`Accéder à la page À propos`} 
                                to={`/about`} 
                                onClick={()=> setDisplayNavSection(false)}>
                            <h2 className={currentPage === "about"? 'header_topBar_menu_item_title header_topBar_menu_item_title--bold':'header_topBar_menu_item_title header_topBar_menu_item_title--regular'} >À PROPOS</h2>
                        </Link>
                    </li>
                    }
                    {displayNavSection===false &&
                        (menuTitles.map((title) => (
                        <li className='header_topBar_menu_item'>
                            <Link className='header_topBar_menu_item_link' 
                                    aria-label={`Accéder à la page ${title}`} 
                                    to={`/${title}`} 
                                    onClick={()=> setDisplayNavSection(false)}>
                                <h2 className={title === currentPage ? 'header_topBar_menu_item_title header_topBar_menu_item_title--bold':'header_topBar_menu_item_title header_topBar_menu_item_title--regular'} >{title}</h2>
                            </Link>
                        </li>
                        )))
                    }
                    <li className='header_topBar_menu_item'>
                        <button onClick={()=> setDisplayNavSection(displayNavSection===true ?  false  : true)}>
                            {displayNavSection===false &&
                            <FontAwesomeIcon icon={faBars} />
                            }
                            {displayNavSection===true &&
                            <FontAwesomeIcon icon={faXmark} />
                            }               
                        </button>
                    </li>
                </ul>
            </div>
        
            <NavSection displayNavSection={displayNavSection}/>
        </header>
    )
}

export default Header