import './Collaborations.scss';
import React, { useContext, useState, useEffect } from 'react'
import bcube from '../../assets/miscProjects/bcube.webp';
import aarun from '../../assets/miscProjects/aarun.webp';
import fp01 from '../../assets/miscProjects/fp01.webp';
import fp02 from '../../assets/miscProjects/fp02.webp';
import llaa02 from '../../assets/miscProjects/llaa02.webp';
import mikou from '../../assets/miscProjects/mikou.webp';
import nomades from '../../assets/miscProjects/nomades.webp';
import odileGuzy from '../../assets/miscProjects/odileGuzy.webp';
import playtime from '../../assets/miscProjects/playtime.webp';
import roda from '../../assets/miscProjects/roda.webp';
import samba from '../../assets/miscProjects/samba.webp';
import ImageBox from '../ImageBox/ImageBox';


const collaborationsData = [
  {
    city: 'PARIS',
    projects: [
      {
        href: 'https://www.mikoustudio.com/',
        label: '2017 / MIKOÜ Design Studio',
        images: [mikou],
      },
      {
        href: 'https://www.latelier-archi.fr/',
        label: "2015-2016 / L'Atelier Architectes",
        images: [aarun],
      },
      {
        href: 'https://www.odile-guzy.com/',
        label: '2015 / ODILE + GUZY architectes',
        images: [odileGuzy],
      },
    ],
  },
  {
    city: 'LA REUNION',
    projects: [
      {
        href: 'https://www.latelier-archi.fr/',
        label: "2015-2016 / L'Atelier Architectes",
        images: [aarun],
      },
    ],
  },
  {
    city: 'LYON & ST-ETIENNE',
    projects: [
      {
        href: 'https://www.samba-architecture.fr/',
        label: '2018 / Samba Architecture',
        images: [samba],
      },
      {
        href: 'https://www.roda-architectes.fr/',
        label: '2018 / Roda Architectes',
        images: [roda],
      },
      {
        href: 'https://llaa.fr/',
        label: '2018 / LIGNON-LURTON architectes associés',
        images: [llaa02],
      },
      {
        href: 'https://nomades-architectures.eu/',
        label: '2015 et 2019 / Nomades Architectes',
        images: [nomades],
      },
      {
        href: 'https://fayolle-pilon.fr/',
        label: '2010-2013 / FAYOLLE-PILON architectes',
        images: [fp02, fp01],  // <-- deux images ici
      },
      {
        href: 'https://bcube.fr/',
        label: '2011-2012 / B-CUBE architectes',
        images: [bcube],
      },
      {
        href: 'http://www.playtimearchitecture.com/',
        label: '2009-2010 / PLAYTIME architectes',
        images: [playtime],
      },
    ],
  },
];



function Collaborations() {
    
    const [handleDisplayImageBox, setHandleDisplayImageBox] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    return (
        <div className='collaborations'>
        <h4>Collaborations</h4>
            {collaborationsData.map((section, index) => (
                <div key={index}>
                <h5>{section.city}</h5>
                <ul>
                    {section.projects.map((project, idx) => (
                    <li key={idx}>
                        <a href={project.href} target='_blank' rel='noreferrer'>
                        <p>{project.label}</p>
                        </a>
                        <img
                        onClick={()=> (
                            setHandleDisplayImageBox(true),
                            setSelectedImages(project.images)
                            )}
                        src={project.images[0]}
                        alt={project.label}
                        />
                    </li>
                    ))}
                </ul>
            </div>
            ))}
            {handleDisplayImageBox && selectedImages.length > 0  &&
            <ImageBox setHandleDisplayImageBox={setHandleDisplayImageBox}>
                <div className='collaborations_imageBox' onClick={(e) => e.stopPropagation()}>
                    {selectedImages.map((img)=> (
                        <img className='collaborations_imageBox_image' src={img}/>
                    ))}
                </div>
            </ImageBox>
            }
        </div>
    );
}

export default Collaborations;