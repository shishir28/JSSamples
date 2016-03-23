var jwt = require('jsonwebtoken');
module.exports = {
    generateToken: function (user) {
        var token = jwt.sign(user, 'mySecretKey', {
            expiresIn: 300 // expires in 24 hours
        });
        return token;
    },
    decodeToken: function (token) {
        //console.log('Before decoding');
        //var decoded1 = jwt.decode(token);
        //console.log(decoded1);
        jwt.verify(token, 'mySecretKey', function (err, decoded) {
            //console.log('ERROR');
            //console.log(err);
            //console.log('DECODE');
            //console.log(decoded)

            if (err) {
                console.log('ERROR-----------------------');
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                console.log('DECODED-----------------------');
                console.log(decoded);
                return decoded;
            }
        });
    }
}