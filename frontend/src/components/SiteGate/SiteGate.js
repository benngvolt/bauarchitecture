import { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProjectsContext } from '../../utils/ProjectsContext';

import Header from '../Header/Header';
import PageTransition from '../PageTransition/PageTransition';
import MaintenancePage from '../MaintenancePage/MaintenancePage';
import RequireAuth from '../RequireAuth/RequireAuth';

import Edit from '../../pages/Edit/Edit';
import AllProjects from '../../pages/AllProjects/AllProjects';
import SingleProject from '../../pages/SingleProject/SingleProject';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Articles from '../../pages/Articles/Articles';
import Login from '../../pages/Login/Login';

// Pages du site. En mode maintenance, les visiteurs ne voient que la page de maintenance (sans en-tête) ;
// la personne connectée voit le site normalement, et /login reste accessible pour pouvoir se connecter.
function SiteGate() {
    const { isAuthenticated, maintenanceMode } = useContext(ProjectsContext);
    const { pathname } = useLocation();

    if (!isAuthenticated) {
        // État de maintenance pas encore connu : on n'affiche rien, pour ne pas montrer le site une seconde.
        if (maintenanceMode === null) {
            return null;
        }

        if (maintenanceMode) {
            return pathname === '/login' ? <Login /> : <MaintenancePage />;
        }
    }

    return (
        <>
            <Header />

            <PageTransition>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/edit" element={<RequireAuth><Edit /></RequireAuth>} />
                    <Route path="/projets" element={<AllProjects />} />
                    <Route path="/journal" element={<Articles />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projets/:id" element={<SingleProject />} />
                </Routes>
            </PageTransition>
        </>
    );
}

export default SiteGate;
