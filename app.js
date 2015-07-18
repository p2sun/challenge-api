var Hapi = require('hapi'),
	Bell = require('bell'),
    RequestModule = require('request');

var clientId = "57acad3f5f1aa298c29d";
var clientSecret = process.env.CLIENT_SECRET;

var server = new Hapi.Server();
server.connection({ port: 9000 });


/* // remove these comments when ready to test with github integration using Bell.
server.register(Bell, function (err) {

    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'password',
        isSecure: false,
        // Make sure to set a "Callback URL" and
        // check the "Allow this application to be used to Sign in with Twitter"
        // on the "Settings" tab in your Twitter application
        clientId: '',                               // Set client id
        clientSecret: ''                            // Set client secret
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            auth: {
                strategy: 'github',
                mode: 'try'
            },
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                return reply.redirect('/home');
            }
        }
    });

*/
	server.route({
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	        reply('Hello, world!');
	    }
	});

	server.route({
	    method: 'GET',
	    path: '/{name}',
	    handler: function (request, reply) {
	        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	    }
	});

    server.route({
        method: 'GET',
        path: '/github/authorize',
        handler: function (request, reply) {
            var singleUseCode = request.query.singleUseCode;
            console.log(clientSecret);
            RequestModule({
                url: 'https://github.com/login/oauth/access_token', //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: singleUseCode,
                    async: false
                }
                }, function(error, response, body){
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(body);
                        reply(body)
                        // reply back with access tokens
                    }
                });
        }
    });

    server.start(function (err) {
        console.log('Server started at:', server.info.uri);
    });
/*
});
*/
