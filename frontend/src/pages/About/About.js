import './About.scss'
import React, { useContext } from 'react'
import skyline from '../../assets/skyline.png'
import ensase from '../../assets/ensase.png'
import Curriculum from '../../components/Curriculum/Curriculum'
import FriendsUrls from '../../components/FriendsUrls/FriendsUrls'
import PhilosophySection from '../../components/PhilosophySection/PhilosophySection'
import { API_URL } from '../../utils/constants'
import { ProjectsContext } from '../../utils/ProjectsContext'


function About () {

    const { aboutPageContent } = useContext(ProjectsContext);

    const photo1Url = aboutPageContent?.photo1Url
        ? `${API_URL}${aboutPageContent.photo1Url}`
        : skyline;

    const photo2Url = aboutPageContent?.photo2Url
        ? `${API_URL}${aboutPageContent.photo2Url}`
        : ensase;

    return (
        <main>
            <PhilosophySection/>

            <figure className='about_photo'>
                <img src={photo1Url} alt='' />
            </figure>

            <Curriculum/>

            <figure className='about_photo'>
                <img src={photo2Url} alt='' />
            </figure>

            <FriendsUrls/>
        </main>
    )
}

export default About
