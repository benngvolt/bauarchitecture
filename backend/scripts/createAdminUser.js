/*
Crée (ou met à jour) le compte du tableau de bord en base. Le mot de passe est haché (bcrypt) avant d'être enregistré.

Utilisation, depuis backend/, avec les variables d'environnement du serveur (SECRET_MONGODBKEY) :
    node scripts/createAdminUser.js <identifiant> <mot de passe>

Relancer le script avec le même identifiant remplace le mot de passe. Le mot de passe n'est écrit nulle part dans le code.
*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error('Utilisation : node scripts/createAdminUser.js <identifiant> <mot de passe>');
  process.exit(1);
}

if (!process.env.SECRET_MONGODBKEY) {
  console.error('SECRET_MONGODBKEY (adresse de la base MongoDB) n\'est pas défini.');
  process.exit(1);
}

async function main() {
  await mongoose.connect(process.env.SECRET_MONGODBKEY);
  console.log('Base ciblée :', mongoose.connection.name);

  const hash = await bcrypt.hash(password, 12);
  const existing = await User.findOne({ username });

  if (existing) {
    existing.password = hash;
    await existing.save();
    console.log(`Mot de passe de « ${username} » mis à jour.`);
  } else {
    await new User({ username, password: hash }).save();
    console.log(`Compte « ${username} » créé.`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
