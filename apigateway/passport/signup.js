var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/MongoDB/user');
var Role = require('../models/MongoDB/role');

var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {

            findOrCreateUser = function () {

                if (!req.body.rolename) {
                    return done(null, false, 'Role name not specified!');
                }

                // find a user in Mongo with provided username
                User.findOne({
                    'username': username
                }, function (err, user) {
                    // In case of any error, return using the done method
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        return done(null, false, 'User already exists!');
                    } else {
                        // if there is no user with that email , create the user
                        Role.findOne({
                            'rolename': req.body.rolename
                        }, function (err, role) {
                            // In case of any error, return using the done method
                            if (err) {
                                console.log('Error in SignUp: ' + err);
                                return done(err);
                            }
                            // role does not  exists
                            if (!role) {
                                return done(null, false, 'Invalid role name!');
                            } else {
                                var newUser = new User();
                                // set the user's local credentials
                                newUser.username = username;
                                newUser.password = createHash(password);
                                newUser.email = username;
                                newUser.roleId = role;

                                // save the user
                                newUser.save(function (err) {
                                    if (err) {
                                        console.log('Error in Saving user: ' + err);
                                        throw err;
                                    }
                                    return done(null, newUser);
                                });
                            }
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }));

    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}