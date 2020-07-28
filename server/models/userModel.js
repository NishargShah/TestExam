const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            minlength: [4, 'Username must be at least 4 characters long'],
            maxlength: [16, 'Username characters not allowed more than 16'],
            required: [true, 'Please provide a username']
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: [true, 'Please provide a email'],
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            trim: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            maxlength: [20, 'Password characters not allowed more than 20'],
            required: [true, 'Please provide a password'],
            select: false
        }
    }, {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    if (user.password) {
        bcrypt.genSalt(12, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    }
});

userSchema.methods.comparePassword = async(userPassword, hashPassword) => {
    return await bcrypt.compare(userPassword, hashPassword);
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
