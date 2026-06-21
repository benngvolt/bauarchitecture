import './NavSection.scss'
import { Link } from 'react-router-dom'
import agenceBau from '../../assets/agence_bau.jpg'
import { ProjectsContext } from '../../utils/ProjectsContext'
import React, { useContext, useState } from 'react'
import Modal from '../Modal/Modal'
import FaQ from '../FaQ/FaQ'
import LegalMentions from '../LegalMentions/LegalMentions'
import Button from '../Button/Button'

function NavSection({ displayNavSection }) {
  const { setDisplayNavSection } = useContext(ProjectsContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalMode, setModalMode] = useState('');

  return (
    <div className={`navSection ${displayNavSection ? '' : 'navSection--hidden'}`}>
      <nav className={`navSection_navContainer ${displayNavSection ? 'navSection_navContainer--opened' : 'navSection_navContainer--closed'}`}>
        <ul className='navSection_navContainer_navGrid'>

          <li className='navSection_navContainer_navGrid_item'>
            <p className='navSection_navContainer_navGrid_item_index'>01</p>
            <div className='navSection_navContainer_navGrid_item_content'>
              <h2 className='navSection_navContainer_navGrid_item_content_mainTitle'>SITE</h2>
              <ul>
                <li>
                  <Link to="/" onClick={() => setDisplayNavSection(false)}><h2>Accueil</h2></Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setDisplayNavSection(false)}><h2>À propos</h2></Link>
                </li>
                <li>
                  <Link to="/projets" onClick={() => setDisplayNavSection(false)}><h2>Projets</h2></Link>
                </li>
                <li className='navSection_navContainer_navGrid_item_content_editSection'>
                  <Link to="/edit" onClick={() => setDisplayNavSection(false)}><p>Edit</p></Link>
                </li>
              </ul>
            </div>
          </li>

          <li className='navSection_navContainer_navGrid_item'>
            <p className='navSection_navContainer_navGrid_item_index'>02</p>
            <div className='navSection_navContainer_navGrid_item_content'>
              <h2 className='navSection_navContainer_navGrid_item_content_mainTitle'>CONTACT</h2>
              <p>10, rue de Sorbiers<br />42000 Saint-Étienne<br /><br />+33 6 35 54 77 80</p>
              <p>amata.zdziobeck@gmail.com</p>
            </div>
          </li>

          <li className='navSection_navContainer_navGrid_item'>
            <p className='navSection_navContainer_navGrid_item_index'>03</p>
            <div className='navSection_navContainer_navGrid_item_content'>
              <Link to="/journal" onClick={() => setDisplayNavSection(false)}><h2 className='navSection_navContainer_navGrid_item_content_mainTitle'>JOURNAL</h2></Link>
            </div>
          </li>

          <li className='navSection_navContainer_navGrid_item'>
            <div className='navSection_navContainer_navGrid_item_content--faq'>
              <p onClick={() => {
                setModalMode('faq');
                setDisplayModal(true);
              }}>FaQ</p>
              <p onClick={() => {
                setModalMode('legalMentions');
                setDisplayModal(true);
              }}>Mentions légales</p>
            </div>
          </li>

        </ul>
      </nav>

      <div className={`navSection_imageContainer ${displayNavSection ? 'navSection_imageContainer--opened' : 'navSection_imageContainer--closed'}`}>
        <img src={agenceBau} alt="Illustration Agence Bau" />
      </div>

      <aside className={displayModal ? 'navSection_modal navSection_modal--opened' : 'navSection_modal navSection_modal--closed'}>
        <Modal setDisplayModal={setDisplayModal}>
          {modalMode === 'faq' && <FaQ />}
          {modalMode === 'legalMentions' && <LegalMentions />}
        </Modal>
      </aside>
    </div>
  );
}

export default NavSection;
