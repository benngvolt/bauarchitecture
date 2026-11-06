const SiteSettings = require('../models/siteSettings')

/*-----------------------------
----- GET SITE SETTINGS -------
-----------------------------*/

exports.getSiteSettings = (req, res) => {
  SiteSettings.findOne()
    .then (settings => res.status(200).json({ maintenanceMode: settings?.maintenanceMode === true }))
    .catch (error => res.status (400).json({error}))
}

/*-----------------------------
----- UPDATE SITE SETTINGS ----
-----------------------------*/

exports.updateSiteSettings = async (req, res) => {

  const { maintenanceMode } = req.body;

  if (typeof maintenanceMode !== 'boolean') {
    return res.status(400).json({ error: 'Le champ "maintenanceMode" (vrai ou faux) est obligatoire.' });
  }

  try {
    await SiteSettings.findOneAndUpdate(
      {},
      { maintenanceMode },
      { upsert: true, new: true }
    );
    res.status(200).json({ maintenanceMode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du mode maintenance.' });
  }
};
