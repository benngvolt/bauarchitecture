import './Header.scss'
import { Link } from 'react-router-dom'
import NavSection from '../NavSection/NavSection'
import logo from "../../assets/bau_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars
} from '@fortawesome/free-solid-svg-icons'
// import React, { useState, useEffect, useContext, useRef } from 'react'
// import { Context } from '../../utils/Context'
// import facebookLogo from '../../assets/facebook_black.png'
// import xLogo from '../../assets/x_black.png'
// import youtubeLogo from '../../assets/youtube_black.png'
// import instagramLogo from '../../assets/instagram_black.png'
// import ContactModal from '../ContactModal/ContactModal'
// import { useLocation, useNavigate } from 'react-router-dom';

 
function Header() {

    return  (      
        <header>
            <div>
                <img src={logo}/>
                <button >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <NavSection/>
        </header>
    )
}

export default Header