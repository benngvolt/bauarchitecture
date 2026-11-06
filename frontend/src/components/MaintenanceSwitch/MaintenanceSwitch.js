import './MaintenanceSwitch.scss';
import React, { useContext, useState } from 'react';
import { API_URL } from '../../utils/constants';
import { authFetch } from '../../utils/auth';
import { ProjectsContext } from '../../utils/ProjectsContext';

// Interrupteur du mode maintenance (tableau de bord) : actif, les visiteurs voient la page de maintenance
// et seule la personne connectée voit le site. L'état est enregistré en base.
function MaintenanceSwitch() {
    const { maintenanceMode, setMaintenanceMode } = useContext(ProjectsContext);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isOn = maintenanceMode === true;

    function toggleMaintenance() {
        setIsSaving(true);
        setErrorMessage('');

        authFetch(`${API_URL}/api/site-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ maintenanceMode: !isOn }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setMaintenanceMode(data.maintenanceMode === true);
            setIsSaving(false);
        })
        .catch((error) => {
            console.error(error);
            setErrorMessage("Le changement n'a pas pu être enregistré.");
            setIsSaving(false);
        });
    }

    return (
        <div className='maintenanceSwitch'>
            <div className='maintenanceSwitch_row'>
                <span className='maintenanceSwitch_label' id='maintenanceSwitchLabel'>Mode maintenance</span>

                <button
                    type='button'
                    role='switch'
                    aria-checked={isOn}
                    aria-labelledby='maintenanceSwitchLabel'
                    className={isOn ? 'maintenanceSwitch_toggle maintenanceSwitch_toggle--on' : 'maintenanceSwitch_toggle'}
                    disabled={isSaving || maintenanceMode === null}
                    onClick={toggleMaintenance}
                >
                    <span className='maintenanceSwitch_toggle_knob' />
                </button>
            </div>

            <p className='maintenanceSwitch_status'>
                {isOn
                    ? 'Activé : les visiteurs voient la page de maintenance.'
                    : 'Désactivé : le site est visible par tous.'}
            </p>

            {errorMessage && <p className='maintenanceSwitch_error' role='alert'>{errorMessage}</p>}
        </div>
    );
}

export default MaintenanceSwitch;
