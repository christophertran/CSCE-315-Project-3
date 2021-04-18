const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [
        {
            type: String
        }
    ]
});

// This is going to add on username and password field to our schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);