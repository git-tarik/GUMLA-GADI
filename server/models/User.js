const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false }, // Optional for now to avoid breaking existing users
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        }
    },
    googleId: { type: String, unique: true, sparse: true },
    truecallerId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    authProvider: { type: String, enum: ['local', 'google', 'truecaller'], default: 'local' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) {
        return false;
    }

    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
