import './Missions.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState, useEffect } from 'react'
import missions from '../../assets/missions.json';
import logoIT from '../../assets/logoIT.png';
import logoOA from '../../assets/logoOA.png';

function Missions () {

    const [activeMissionTitle, setActiveMissionTitle]= useState('')

    return (
        <main>
            <section className='missions'>
                <ul className='missions_list'>
                {missions.map((mission)=>(
                    <li className='missions_list_item'>
                        <h3 onClick={() => setActiveMissionTitle(mission.title)} className={activeMissionTitle===mission.title?'missions_list_item_name missions_list_item_name--active':'missions_list_item_name missions_list_item_name--inactive'}>{mission.title}</h3>
                        <div className={activeMissionTitle===mission.title?'missions_list_item_container missions_list_item_container_opened':'missions_list_item_container missions_list_item_container_closed'}>
                            <p className='missions_list_item_container_text'>{mission.text}</p>
                            <ul className='missions_list_item_container_innerList'>
                                {mission.list.map((item)=>(
                                <li className='missions_list_item_container_innerList_innerItem'>
                                    <p className='missions_list_item_container_innerList_innerItem_text'>{item.item}</p>
                                </li>  
                                ))}
                            </ul>
                        </div>
                    </li>
                    ))}
                </ul>
                <div className='missions_logos'>
                    <img src={logoIT} alt="logo de l'Instant T"/>
                    <img src={logoOA} alt="logo de l'Ordre des architectes"/>
                </div>
            </section>
        </main>
    )
}

export default Missions