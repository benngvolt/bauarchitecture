// Session du tableau de bord : le jeton reçu à la connexion reste dans le navigateur (localStorage) jusqu'à son expiration (48 h),
// pour ne pas avoir à se reconnecter à chaque visite.

const STORAGE_KEY = 'bauAuthToken';
export const AUTH_EXPIRED_EVENT = 'bau:auth-expired';

// Date d'expiration (en millisecondes) lue dans le jeton JWT, ou 0 si illisible.
export function getTokenExpiry(token) {
    try {
        const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(payload)).exp * 1000;
    } catch (error) {
        return 0;
    }
}

// Jeton enregistré, s'il est encore valide ; sinon il est effacé.
export function getToken() {
    try {
        const token = localStorage.getItem(STORAGE_KEY);
        if (!token) {
            return null;
        }
        if (getTokenExpiry(token) <= Date.now()) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return token;
    } catch (error) {
        // Stockage indisponible (navigation privée, données bloquées) : pas de session mémorisée.
        return null;
    }
}

export function saveToken(token) {
    try {
        localStorage.setItem(STORAGE_KEY, token);
    } catch (error) {
        console.error('Impossible de mémoriser la connexion :', error.message);
    }
}

export function clearToken() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        // Rien à effacer.
    }
}

// fetch pour les actions du tableau de bord : ajoute le jeton, et si le serveur le refuse (401, jeton expiré ou invalide),
// efface la session et prévient l'application (qui renvoie alors vers /login).
export async function authFetch(url, options = {}) {
    const token = getToken();
    const headers = { ...(options.headers || {}) };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        clearToken();
        window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }

    return response;
}
