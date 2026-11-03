import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import reportWebVitals from './reportWebVitals';

import Edit from './pages/Edit/Edit';
import AllProjects from './pages/AllProjects/AllProjects';
import Header from './components/Header/Header';
import SingleProject from './pages/SingleProject/SingleProject';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Articles from './pages/Articles/Articles';
import PageTransition from './components/PageTransition/PageTransition';

// import Error404 from './pages/Error404/Error404';

// BrowserRouter : URLs propres (/projets, /projets/:id), sans « # », donc indexables par les moteurs de recherche.
// Le serveur doit renvoyer index.html pour toute URL (voir nginx.conf : try_files ... /index.html).
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProjectsProvider } from './utils/ProjectsContext';

// Anciennes adresses avec « # » (ex. /#/projets/abc) : on les réécrit en adresses propres (/projets/abc) pour ne casser aucun lien existant.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ProjectsProvider>
        <Header />

        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/projets" element={<AllProjects />} />
            <Route path="/journal" element={<Articles />} />
            <Route path="/about" element={<About />} />
            <Route path="/projets/:id" element={<SingleProject />} />
          </Routes>
        </PageTransition>

        {/* <Footer/> */}
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();