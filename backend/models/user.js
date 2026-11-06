const mongoose = require('mongoose');

// Compte du tableau de bord. Le mot de passe est toujours stocké haché (bcrypt), jamais en clair.
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true },
});


module.exports = mongoose.model('User', userSchema);
