import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import reportWebVitals from './reportWebVitals';

import SiteGate from './components/SiteGate/SiteGate';


// import Error404 from './pages/Error404/Error404';

// BrowserRouter : URLs propres (/projets, /projets/:id), sans « # », donc indexables par les moteurs de recherche.
// Le serveur doit renvoyer index.html pour toute URL (voir nginx.conf : try_files ... /index.html).
import { BrowserRouter as Router } from 'react-router-dom';
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
        <SiteGate />

        {/* <Footer/> */}
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();