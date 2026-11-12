import './Login.scss';
import React, { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import { ProjectsContext } from '../../utils/ProjectsContext';

// Connexion au tableau de bord. Une fois connecté, le jeton reste 48 h dans le navigateur.
function Login() {
    const { isAuthenticated, login, setDisplayNavSection } = useContext(ProjectsContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Page demandée avant d'être renvoyé ici (le tableau de bord par défaut).
    const destination = location.state?.from || '/edit';

    if (isAuthenticated) {
        return <Navigate to={destination} replace />;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);

        fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.trim(), password }),
        })
        .then((response) =>
            response.json().then((data) => {
                if (!response.ok) {
                    throw new Error(data.message || `Erreur ${response.status}`);
                }
                return data;
            })
        )
        .then((data) => {
            setDisplayNavSection(false);
            login(data.token);
            navigate(destination, { replace: true });
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setPassword('');
            setIsSubmitting(false);
        });
    }

    return (
        <main className='login'>
            <form className='login_form' onSubmit={handleSubmit}>
                <h1 className='login_form_title'>Connexion</h1>

                <div className='login_form_field'>
                    <label htmlFor='loginUsername'>Identifiant</label>
                    <input
                        id='loginUsername'
                        type='text'
                        autoComplete='username'
                        autoCapitalize='none'
                        spellCheck={false}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div className='login_form_field'>
                    <label htmlFor='loginPassword'>Mot de passe</label>
                    <input
                        id='loginPassword'
                        type='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {errorMessage && (
                    <p className='login_form_error' role='alert'>{errorMessage}</p>
                )}

                <button type='submit' className='login_form_submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Connexion…' : 'Se connecter'}
                </button>
            </form>
        </main>
    );
}

export default Login;
