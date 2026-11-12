// Pictogrammes : remplacer les fichiers de src/assets (logo_*.svg) suffit à les changer.
import LogoConstruction from '../../assets/logo_construction.svg?react';
import LogoRenovation from '../../assets/logo_renovation.svg?react';
import LogoExtension from '../../assets/logo_extension.svg?react';
import LogoAmenagements from '../../assets/logo_amenagements.svg?react';

export const MISSIONS = [
    { key: 'construction', label: 'CONSTRUCTION', Icon: LogoConstruction },
    { key: 'renovation', label: 'RÉNOVATION', Icon: LogoRenovation },
    { key: 'extension', label: 'EXTENSION', Icon: LogoExtension },
    { key: 'amenagements', label: 'AMÉNAGEMENTS', Icon: LogoAmenagements },
];
