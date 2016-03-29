var jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function (user, secretkey) {
        var token = jwt.sign(user, secretkey, {
            expiresIn: "24h" // expires in 24 hours
        });
        return token;
    },
    decodeToken: function (token, secretkey) {
        return jwt.decode(token, { complete: true });
        jwt.verify(token, secretkey, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                return decoded;
            }
        });
    }
}