import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProjectsContext } from '../../utils/ProjectsContext';

// Réserve une page aux personnes connectées : sinon, renvoi vers /login (puis retour sur la page demandée après connexion).
function RequireAuth({ children }) {
    const { isAuthenticated } = useContext(ProjectsContext);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace state={{ from: location.pathname }} />;
    }

    return children;
}

export default RequireAuth;
