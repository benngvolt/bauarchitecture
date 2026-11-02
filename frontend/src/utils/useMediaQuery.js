import { useEffect, useState } from 'react';

// Suit une media query CSS (ex. '(max-width: 768px)') et re-rend le composant quand elle change.
export default function useMediaQuery(query) {
    const getMatches = () =>
        typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia(query).matches
            : false;

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQueryList = window.matchMedia(query);
        const handleChange = () => setMatches(mediaQueryList.matches);

        handleChange();
        mediaQueryList.addEventListener('change', handleChange);

        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}
