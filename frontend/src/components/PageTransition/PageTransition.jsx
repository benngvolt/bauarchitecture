import './PageTransition.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='pageTransition' key={location.pathname}>
            {children}
        </div>
    );
}

export default PageTransition;
