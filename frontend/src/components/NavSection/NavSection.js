import './NavSection.scss'
import { Link } from 'react-router-dom'
import agenceBau from '../../assets/agence_bau.jpg'
// import NavSection from '../NavSection/NavSection'
// import React, { useState, useEffect, useContext, useRef } from 'react'
// import { Context } from '../../utils/Context'
// import facebookLogo from '../../assets/facebook_black.png'
// import xLogo from '../../assets/x_black.png'
// import youtubeLogo from '../../assets/youtube_black.png'
// import instagramLogo from '../../assets/instagram_black.png'
// import ContactModal from '../ContactModal/ContactModal'
// import { useLocation, useNavigate } from 'react-router-dom';

 
function NavSection() {

    return  (      
        <div>
            <nav>
                <ul>
                    <li>
                        <p>01</p>
                        <div>
                            <h2>SITE</h2>
                            <ul>
                                <li>
                                    <Link aria-label="Accéder à la page d'accueil" to="/"><p>Accueil</p></Link>
                                    <Link aria-label="Accéder à la page projets" to="/projets"><p>Projets</p></Link>
                                    <Link aria-label="Accéder à la page prestations" to="/prestations"><p>Prestations</p></Link>
                                    <Link aria-label="Accéder à la page Cabinet de Curiosités" to="/curiosites"><p>Cabinet de curiosités</p></Link>
                                    <Link aria-label="Accéder à la page d\'édition" to="/edit"><p>Edit</p></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <p>02</p>
                        <div>
                            <h2>ATELIER</h2>
                            <p> 5, rue de l'Etoile <br/>
                                31000 Toulouse <br/><br/>
                                +33 6 87 12 95 50
                            </p>
                        </div>
                    </li>
                    <li>
                        <p>03</p>
                        <div>
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
                    <li>
                        <p>04</p>
                        <div>
                            <h2>CONTACT</h2>
                            <p>bengig46@gmail.com</p>
                        </div>
                    </li>
                    <li>
                        <p>05</p>
                        <div>
                            <h2>MENTIONS LÉGALES</h2>
                            <p>Conditions générales</p>
                        </div>
                    </li>
                </ul>
            </nav>
            <div>
                <img src={agenceBau}/>
            </div>
        </div>
    )
}

export default NavSection