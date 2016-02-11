/usr/bin/env node

var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongo')({
    session: expressSession
});


createServer = function createServer(){
    
    var server = express();
    //specify middleware
    server.use(express.static(__dirname + '/public');
    server.use("/product/*", express.static(__dirname + '/public');
    server.use("/basket/", express.static(__dirname + '/public');

    server.use(cookieParser);
    server.use(expressSession({
        secret: "my secret sign key", 
        store: new MongoStore({
            db: 'traderioSessions'
        });
    }));
    

    //attach router handlers
    reutes.attachHandlers(server);

    return server;
};


var server = createServer();
var port = Number(process.env.PORT || 8080);
server.listen(port, function(){
    console.log("Listening on "+ port);
});
