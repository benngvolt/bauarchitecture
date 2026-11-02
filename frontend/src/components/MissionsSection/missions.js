// Pictogrammes : remplacer les fichiers de src/assets (logo_*.svg) suffit à les changer.
import { ReactComponent as LogoConstruction } from '../../assets/logo_construction.svg';
import { ReactComponent as LogoRenovation } from '../../assets/logo_renovation.svg';
import { ReactComponent as LogoExtension } from '../../assets/logo_extension.svg';
import { ReactComponent as LogoAmenagements } from '../../assets/logo_amenagements.svg';

export const MISSIONS = [
    { key: 'construction', label: 'CONSTRUCTION', Icon: LogoConstruction },
    { key: 'renovation', label: 'RÉNOVATION', Icon: LogoRenovation },
    { key: 'extension', label: 'EXTENSION', Icon: LogoExtension },
    { key: 'amenagements', label: 'AMÉNAGEMENTS', Icon: LogoAmenagements },
];
