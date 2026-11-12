import AdminField from '../AdminUI/AdminField'
import Loader from '../Loader/Loader'
import React, { useState, useEffect } from 'react'
import { API_URL, DEFAULT_MISSION_DESCRIPTIONS } from '../../utils/constants'
import { authFetch } from '../../utils/auth'

const MAX_DESCRIPTION_LENGTH = 200;

const MISSIONS = [
    { key: 'construction', label: 'Construction' },
    { key: 'renovation', label: 'Rénovation' },
    { key: 'extension', label: 'Extension' },
    { key: 'amenagements', label: 'Aménagements' },
];


function MissionsForm ({
    missionsSettings,
    handleLoadMissionsSettings,
    loaderDisplay,
    setLoaderDisplay
    }) {

    // Clé stable : les champs ne sont resynchronisés que si les textes enregistrés changent.
    const savedKey = JSON.stringify(missionsSettings || {});

    const [descriptions, setDescriptions] = useState(DEFAULT_MISSION_DESCRIPTIONS);
    const [statusMessage, setStatusMessage] = useState('');

    const savedOrDefault = (key) => missionsSettings?.[key] || DEFAULT_MISSION_DESCRIPTIONS[key];

    useEffect(() => {
        setDescriptions(Object.fromEntries(MISSIONS.map(({ key }) => [key, savedOrDefault(key)])));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedKey]);

    function saveDescriptions(newDescriptions, successMessage) {
        setLoaderDisplay(true);
        setStatusMessage('');

        authFetch(`${API_URL}/api/missions-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
            body: JSON.stringify(newDescriptions),
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error || `Erreur ${response.status}`);
                });
            }
            return response.json();
        })
        .then(() => {
            handleLoadMissionsSettings();
            setStatusMessage(successMessage);
            setLoaderDisplay(false);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête :', error);
            setStatusMessage("Erreur : les descriptifs n'ont pas pu être enregistrés.");
            setLoaderDisplay(false);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Un texte resté identique au texte par défaut n'est pas enregistré : il suivra les futures évolutions du site.
        saveDescriptions(
            Object.fromEntries(MISSIONS.map(({ key }) => [
                key,
                descriptions[key].trim() === DEFAULT_MISSION_DESCRIPTIONS[key] ? '' : descriptions[key],
            ])),
            'Descriptifs enregistrés.'
        );
    }

    function resetDescriptions() {
        saveDescriptions(
            Object.fromEntries(MISSIONS.map(({ key }) => [key, ''])),
            'Descriptifs par défaut rétablis.'
        );
    }

    const hasCustomDescriptions = MISSIONS.some(({ key }) => missionsSettings?.[key]);
    const isModified = MISSIONS.some(({ key }) => descriptions[key] !== savedOrDefault(key));

    return (
        <form className='adminForm' onSubmit={handleSubmit}>
            {loaderDisplay === true &&
                <Loader />
            }

            <p className='adminIntro'>
                Un champ vidé retrouve son texte par défaut.
            </p>

            <div className='adminCard'>
                {MISSIONS.map(({ key, label }) => (
                    <AdminField
                        key={key}
                        id={`inputMission${key}`}
                        label={label}
                        value={descriptions[key] ?? ''}
                        onChange={(value) => {
                            setDescriptions((current) => ({ ...current, [key]: value }));
                            setStatusMessage('');
                        }}
                        multiline
                        rows={3}
                        maxLength={MAX_DESCRIPTION_LENGTH}
                    />
                ))}
            </div>

            <div className='adminActions'>
                <button type='submit' className='adminButton' disabled={!isModified}>
                    Enregistrer
                </button>

                {hasCustomDescriptions && (
                    <button type='button' className='adminButton adminButton--text' onClick={resetDescriptions}>
                        Rétablir les descriptifs par défaut
                    </button>
                )}

                {statusMessage && (
                    <p
                        className={statusMessage.startsWith('Erreur') ? 'adminStatus adminStatus--error' : 'adminStatus'}
                        role='status'
                    >
                        {statusMessage}
                    </p>
                )}
            </div>
        </form>
    )
}

export default MissionsForm
