import './Header.scss'
import { Link, useLocation } from 'react-router-dom'
import NavSection from '../NavSection/NavSection'
import logo from "../../assets/bau_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useState } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'

function Header() {
    const {
        displayNavSection,
        setDisplayNavSection,
        loaderDisplay,
        currentPage,
        setCurrentPage
    } = useContext(ProjectsContext);

    const location = useLocation();
    const menuTitles = ["projets", "journal"];
    const [shouldRenderNav, setShouldRenderNav] = useState(false);

    // Gérer affichage ou démontage du menu avec délai
    useEffect(() => {
        if (displayNavSection) {
            setShouldRenderNav(true);
        } else {
            const timeout = setTimeout(() => {
                setShouldRenderNav(false);
            }, 1000); // Doit correspondre à la durée d'animation CSS

            return () => clearTimeout(timeout);
        }
    }, [displayNavSection]);

    useEffect(() => {
        if (!displayNavSection) {
            switch (location.pathname) {
                case "/about":
                    setCurrentPage('about');
                    break;
                case "/projets":
                    setCurrentPage('projets');
                    break;
                case "/edit":
                    setCurrentPage('tableau de bord');
                    break;
                case "/journal":
                    setCurrentPage('journal');
                    break;
                case "/references":
                    setCurrentPage('références');
                    break;
                default:
                    setCurrentPage('');
            }
        } else {
            setCurrentPage('');
        }
    }, [location.pathname, displayNavSection]);

    return (
        <header className='header--fixed'>
            {loaderDisplay && <Loader />}

            <div className='header_topBar'>
                <div className='header_topBar_leftElements'>
                    <Link
                        className='header_topBar_leftElements_link'
                        aria-label="Accéder à la page d'accueil"
                        to="/"
                        onClick={() => setDisplayNavSection(false)}
                    >
                        {/* <img src={logo} alt="Logo Bau" /> */}
                    </Link>
                </div>

                <ul className='header_topBar_menu'>
                    {!displayNavSection &&
                        <>
                            <li className='header_topBar_menu_item header_topBar_menu_item--notDisplayedMobile'>
                                <Link
                                    className='header_topBar_menu_item_link'
                                    aria-label="Accéder à la page À propos"
                                    to="/"
                                    onClick={() => setDisplayNavSection(false)}
                                >
                                    <p className={currentPage === "about"
                                        ? 'header_topBar_menu_item_title header_topBar_menu_item_title--bold'
                                        : 'header_topBar_menu_item_title header_topBar_menu_item_title--regular'}
                                    >
                                        ACCUEIL
                                    </p>
                                </Link>
                            </li>

                            {menuTitles.map((title) => (
                                <li className='header_topBar_menu_item header_topBar_menu_item--notDisplayedMobile' key={title}>
                                    <Link
                                        className='header_topBar_menu_item_link'
                                        aria-label={`Accéder à la page ${title}`}
                                        to={`/${title}`}
                                        onClick={() => setDisplayNavSection(false)}
                                    >
                                        <h2 className={title === currentPage
                                            ? 'header_topBar_menu_item_title header_topBar_menu_item_title--bold'
                                            : 'header_topBar_menu_item_title header_topBar_menu_item_title--regular'}
                                        >
                                            {title}
                                        </h2>
                                    </Link>
                                </li>
                            ))}
                            <li className='header_topBar_menu_item'>
                                <Button>
                                    PRENDRE CONTACT
                                </Button>
                            </li>
                        </>
                    }

                    <li className='header_topBar_menu_item' key='menu2'>
                        <button onClick={() => setDisplayNavSection(!displayNavSection)}>
                            <FontAwesomeIcon icon={displayNavSection ? faXmark : faBars} />
                        </button>
                    </li>
                </ul>
            </div>
            {shouldRenderNav && (
                <NavSection displayNavSection={displayNavSection} />
            )}
        </header>
    );
}

export default Header;