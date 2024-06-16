import './Home.scss'
import React, { useContext } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'

function Home () {

    const { test } = useContext(ProjectsContext);

    return (
        <main>
           <p>{test[0]}</p>
        </main>
    )
}

export default Home