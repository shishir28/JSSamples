var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/MongoDB/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            // check in mongo if a user with username exists or not
            //console.log(' username ' + username);

            User.findOne({
                'username': username
            },
                function (err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist
                    if (!user) {
                        return done(null, false, 'User Not Found!');
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false, 'Invalid password!');
                    }
                    // User and password both match, return user from done method  which will be treated like success
                    return done(null, user);
                }
            );
        }));

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

}