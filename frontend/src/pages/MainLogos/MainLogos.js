import './MainLogos.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'
import missions from '../../assets/missions.json';
import logoIT from '../../assets/logoIT.png';
import logoOA from '../../assets/logoOA.png';

function MainLogos () {

    return (
        <main>
            <section className='mainLogos'>
                <div className='mainLogos_logos'>
                    <img src={logoIT} alt="logo de l'Instant T"/>
                    <img src={logoOA} alt="logo de l'Ordre des architectes"/>
                </div>
            </section>
        </main>
    )
}

export default MainLogos