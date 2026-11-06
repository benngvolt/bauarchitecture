// Limite les tentatives de connexion ratées : MAX_FAILURES par adresse IP et par fenêtre de WINDOW_MS,
// pour empêcher de deviner le mot de passe par essais successifs. Les connexions réussies ne comptent pas.
// Les compteurs sont gardés en mémoire (ils repartent à zéro au redémarrage du serveur).

const MAX_FAILURES = 10;
const WINDOW_MS = 15 * 60 * 1000;

const failures = new Map();

module.exports = (req, res, next) => {
    const now = Date.now();
    const entry = failures.get(req.ip);

    if (entry && entry.resetAt > now && entry.count >= MAX_FAILURES) {
        const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
        res.set('Retry-After', String(retryAfterSeconds));
        return res.status(429).json({ message: 'Trop de tentatives. Réessaie dans quelques minutes.' }); // status 429 'Too Many Requests'
    }

    // Une fois la réponse envoyée, on compte l'échec éventuel.
    res.on('finish', () => {
        if (!req.loginFailed) return;

        const current = failures.get(req.ip);
        if (current && current.resetAt > Date.now()) {
            current.count += 1;
        } else {
            failures.set(req.ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
        }
    });

    // Ménage : on oublie les adresses dont la fenêtre est terminée.
    if (failures.size > 1000) {
        for (const [ip, value] of failures) {
            if (value.resetAt <= now) failures.delete(ip);
        }
    }

    next();
};
