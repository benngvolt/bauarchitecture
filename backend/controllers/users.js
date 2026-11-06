const User = require('../models/user')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

// Durée de validité du jeton : la personne reste connectée 48 h sur son navigateur.
const TOKEN_LIFETIME = '48h';

// Même message que l'identifiant soit inconnu ou le mot de passe faux : on ne révèle pas quels comptes existent.
const INVALID_CREDENTIALS = { message: 'Identifiant ou mot de passe incorrect' };

exports.logIn = async (req, res) => {

    const SECRET_TOKEN = process.env.SECRET_TOKEN;
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return res.status(400).json({ message: 'Identifiant et mot de passe requis' }); // status 400 'Bad Request'
    }

    try {
        const user = await User.findOne({ username });
        const valid = user ? await bcrypt.compare(password, user.password) : false;

        if (!valid) {
            req.loginFailed = true; // lu par le limiteur de tentatives
            return res.status(401).json(INVALID_CREDENTIALS); // status 401 'Unauthorized' authentification non-validée
        }

        res.status(200).json({ // status 200 'OK'
            userId: user._id,
            token: jwt.sign (
                { userId: user._id },
                SECRET_TOKEN,
                { expiresIn: TOKEN_LIFETIME }
            )
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la connexion.' }); // status 500 'Internal  Server  Error' > erreur serveur
    }
};

// Vérifie qu'un jeton est encore valide (le middleware auth répond 401 sinon).
exports.checkToken = (req, res) => {
    res.status(200).json({ userId: req.auth.userId });
};
