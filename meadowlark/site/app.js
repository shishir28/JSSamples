var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');
var credentials = require('./credentials.js');
var emailService = require('./lib/email.js')(credentials);
var weatherData = require('./lib/weather.js');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var cookieparser = require('cookie-parser');

global.jQuery = require('jquery');

//var bootstrap = require('bootstrap');
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main',
        helpers: {
            section: function (name, options) {
                if (!this._section) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });

app.engine('handlebars', handlebars.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

//app.use(bootstrap());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieparser(credentials.cookieSecret));
app.use(require('express-session')());

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.locals.showTests = (app.get('env') !== 'production' && (req.query.test === '1'));
    next();
});

app.use(function (req, res, next) {
    if (!res.locals.partials) {
        res.locals.partials = {};
    }
    // res.locals.partials.weather = weatherData.getWeatherData();
    next();
});

app.use(function (req, res, next) {
    // if there's a flash message, transfer
    // it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});


switch (app.get('env')) {
case 'development':
    app.use(require('morgan')('dev'));
    break;
case 'production':
    app.use(require('express-logger')({
        path: __dirname + '/log/requests.log'
    }));
    break;
};

app.use(function (req, res, next) {
    var cluster = require('cluster');
    if (cluster.isWorker) {
        console.log('Worker %d received request', cluster.worker.id);
    }
    next();
});

app.post('/process', function (req, res) {
    if (req.xhr || req.accepts('json,html') === 'json') {
        // if there were an error, we would send { error: 'error description' }
        res.send({
            success: true
        });
    } else {
        // if there were an error, we would redirect to an error page

        res.redirect(303, '/thank-you');
    }
});
// for now, we're mocking NewsletterSignup:
function NewsletterSignup() {}
NewsletterSignup.prototype.save = function (cb) {
    cb();
};


app.post('/newsletter', function (req, res) {
    var name = req.body.name || '',
        email = req.body.email || '';
    emailService.send('shishir28@gmail.com', 'Hood River tours on sale today!', 'Get \'em while they\'re hot!');
    var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!email.match(VALID_EMAIL_REGEX)) {
        if (req.xhr) {
            return res.json({
                error: 'Invalid name email address.'
            });
        }
        req.session.flash = {
            type: 'danger',
            intro: 'validation error!',
            message: 'The email address you entered is invalid'
        };
        console.log('Before redirecting...')
        res.redirect(303, '/newsletter/archive')
    }

    new NewsletterSignup({
        name: name,
        email: email
    }).save(function (err) {
        if (err) {
            if (req.xhr) {
                return res.json({
                    error: 'Database error.'
                });
            }
            req.session.flash = {
                type: 'danger',
                intro: 'database error!',
                message: 'There was a database error!'
            };
            res.redirect(303, '/newsletter/archive')
        }
        if (req.xhr) {
            return res.json({
                success: true
            });
        }
        req.session.flash = {
            type: 'success',
            intro: 'Thank you',
            message: 'You have signedup for newsletter !'
        };
        res.redirect(303, '/newsletter/archive')
    });
});


app.get('/contest/vacation-photo', function (req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear(),
        month: now.getMonth()
    });
});

app.post('contest/vacation-photo/:year/:month', function (req, res) {
    var form = formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.redirect(303, '/error');
        }
        console.log('Received Fields');
        console.log(fields);
        console.log('Received Files');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});

app.get('/newsletter', function (req, res) {
    res.render('newsletter', {
        csrf: 'CSRF token goes here'
    })
});

app.get('/thank-you', function (req, res) {
    res.render('thank-you');
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/fail', function (req, res) {
    throw new Error('Nope!');
});

app.get('/epic-fail', function (req, res) {
    process.nextTick(function () {
        throw new Error('Epic Fail');
    });

});

//app.post('/cart/checkout', function (req, res) {
//    var cart = req.session.cart;
//    if (!cart) next(new Error('Cart does not exist.'));
//    var name = req.body.name || '',
//        email = req.body.email || '';
//    // input validation
//    if (!email.match(VALID_EMAIL_REGEX))
//        return res.next(new Error('Invalid email address.'));
//    // assign a random cart ID; normally we would use a database ID here
//    cart.number = Math.random().toString().replace(/^0\.0*/, '');
//    cart.billing = {
//        name: name,
//        email: email,
//    };
//    res.render('email/cart-thank-you', {
//        layout: null,
//        cart: cart
//    }, function (err, html) {
//        if (err) {
//            console.log('error in email template');
//        }
//        emailService.send('joecustomer@gmail.com', 'Hood River tours on sale today!', 'Get \'em while they\'re hot!');
//    });
//    res.render('cart-thank-you', {
//        cart: cart
//    });
//});

//page not found
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.use(function (req, res, next) {
    // creating domain here
    var domain = require('domain').create();
    domain.on('error', function (err) {
        console.log('Domain Error caugth\n', err.stack);
        try {
            setTimeout(function () {
                console.error('Failsafe shoutdown.');
                process.exit(1);
            }, 5000);
            var worker = require('cluster').worker;
            if (worker) {
                worker.disconnect();
            }
            //stop taking new request
            server.close();
            try {
                // attempting to use Express error route;
                next(err);

            } catch (err) {
                console.error('Express error mechanism failed. \n', err.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Server error.');
            }
        } catch (err) {
            console.error('Unable to send 500 response.\n', err.stack);
        }
    });
    // add the request and response object to domain
    domain.add(req);
    domain.add(res);
    // execute rest of the request chaing 
    domain.run(next);
});

function startServer() {
    app.listen(app.get('port'), function () {
        console.log('Express started in ' + app.get('env') + 'mode  on http://localhost:' + app.get('port') + ';press ctrl+c to terminate.');
    });
}

if (require.main == module) {
    startServer();
} else {
    module.exports = startServer;

}