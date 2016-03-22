var jwt = require('jwt-simple');

module.exports = {
    generateToken: function (user) {
        var tokenSecret = 'infinitexxx';
        return jwt.encode(user, tokenSecret);
    },
    decodeToken: function (token) {
        var tokenSecret = 'infinitexxx';
        try {
            return jwt.decode(token, tokenSecret)
        }
        catch (err) {
            console.log(err);
            return undefined;
        }

    }
}