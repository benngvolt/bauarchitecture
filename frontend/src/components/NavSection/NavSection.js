import './NavSection.scss'
import { Link } from 'react-router-dom'
import agenceBau from '../../assets/agence_bau.jpg'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext} from 'react'


 
function NavSection() {

    const { setDisplayNavSection } = useContext(ProjectsContext);

    return  (      
        <div className='navSection'>
            <nav className='navSection_navContainer'>
                <ul className='navSection_navContainer_navGrid'>
                    <li className='navSection_navContainer_navGrid_item'>
                        <p className='navSection_navContainer_navGrid_item_index'>01</p>
                        <div className='navSection_navContainer_navGrid_item_content'>
                            <h2>SITE</h2>
                            <ul>
                                <li>
                                    <Link aria-label="Accéder à la page d'accueil" to="/" onClick={()=>setDisplayNavSection(false)}><p>Accueil</p></Link>
                                </li>
                                <li>
                                    <Link aria-label="Accéder à la page projets" to="/projets" onClick={()=>setDisplayNavSection(false)}><p>Projets</p></Link>
                                </li>
                                <li>
                                    <Link aria-label="Accéder à la page prestations" to="/prestations" onClick={()=>setDisplayNavSection(false)}><p>Prestations</p></Link>
                                </li>
                                <li>
                                    <Link aria-label="Accéder à la page Cabinet de Curiosités" to="/curiosites" onClick={()=>setDisplayNavSection(false)}><p>Cabinet de curiosités</p></Link>
                                </li>
                                <li>
                                    <Link aria-label="Accéder à la page d\'édition" to="/edit" onClick={()=>setDisplayNavSection(false)}><p>Edit</p></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='navSection_navContainer_navGrid_item'>
                        <p className='navSection_navContainer_navGrid_item_index'>02</p>
                        <div className='navSection_navContainer_navGrid_item_content'>
                            <h2>ATELIER</h2>
                            <p> 5, rue de l'Etoile <br/>
                                31000 Toulouse <br/><br/>
                                +33 6 87 12 95 50
                            </p>
                        </div>
                    </li>
                    <li className='navSection_navContainer_navGrid_item'>
                        <p className='navSection_navContainer_navGrid_item_index'>03</p>
                        <div className='navSection_navContainer_navGrid_item_content'>
                            <h2>RÉSEAUX</h2>
                            <ul>
                                <li>
                                    <a href='www.facebook.com'> Facebook </a>
                                </li>
                                <li>
                                    <a href='www.instagram.com'> Instagram </a>
                                </li>
                                <li>
                                    <a href='www.linkedin.com'> Linkedin </a>
                                </li>
                            </ul>  
                        </div>
                    </li>
                    <li className='navSection_navContainer_navGrid_item'>
                        <p className='navSection_navContainer_navGrid_item_index'>04</p>
                        <div className='navSection_navContainer_navGrid_item_content'>
                            <h2>CONTACT</h2>
                            <p>bengig46@gmail.com</p>
                        </div>
                    </li>
                    <li className='navSection_navContainer_navGrid_item'>
                        <p className='navSection_navContainer_navGrid_item_index'>05</p>
                        <div className='navSection_navContainer_navGrid_item_content'>
                            <h2>MENTIONS LÉGALES</h2>
                            <p>Conditions générales</p>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className='navSection_imageContainer'>
                <img src={agenceBau}/>
            </div>
        </div>
    )
}

export default NavSection