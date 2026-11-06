const mongoose = require('mongoose');

// Document unique : réglages généraux du site. maintenanceMode : les visiteurs voient la page de maintenance
// (l'administrateur connecté voit toujours le site).
const siteSettingsSchema = mongoose.Schema({
    maintenanceMode: {type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
