import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import reportWebVitals from './reportWebVitals';

// import Edit from './pages/Edit/Edit';
// import OneProject from './pages/OneProject/OneProject';
// import About from './pages/About/About';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
// import Error404 from './pages/Error404/Error404';
// import AllProjects from './pages/AllProjects/AllProjects';
// Utilisation de HashRouter pour que les différents composants soient rendus dynamiquement en fonction de l'URL, sans avoir besoin de recharger la page entière à chaque fois.
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { ProjectsProvider } from './utils/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <Router>
      <ProjectsProvider>
        {/* <Header/> */}
        <Routes>

          <Route path="/" element={<Home/>} />
          
        </Routes>
        {/* <Footer/> */}
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
