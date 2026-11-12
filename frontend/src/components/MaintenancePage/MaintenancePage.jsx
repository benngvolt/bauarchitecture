import './MaintenancePage.scss';
import logo from '../../assets/bau_logo.png';

// Page affichée aux visiteurs quand le mode maintenance est actif : pas d'en-tête, le logo au centre et une phrase.
function MaintenancePage() {
    return (
        <main className='maintenance'>
            <img className='maintenance_logo' src={logo} alt='BAU Architecture' />

            <p className='maintenance_text'>
                Site en maintenance…<br />
                Nous revenons très bientôt.
            </p>
        </main>
    );
}

export default MaintenancePage;
