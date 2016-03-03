var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');


var routes = require('./routes/routes.js');

var MongoStore = require('connect-mongo')({
    session: expressSession
});



module.exports = function(){

    var server = express();
    //specify middleware
    server.use(express.static(__dirname + '/public'));
    server.use("/product/*", express.static(__dirname + '/public'));
    server.use("/basket/", express.static(__dirname + '/public'));

    //attach router handlers
    routes.attachHandlers(server);

    server.use(cookieParser);
    server.use(expressSession({
        secret: 'ABCDEFGHIGJLMNOPQRSTUVWXYZ27312777',
        store: new MongoStore({
            db: 'traiderioSessions'
        }),
        resave: true,
        saveUninitialized: true
    }));

    return server;
};


// TODO: to switch into HTTPS protocol instead before production deployment
// TODO: to add Login

/*

 server.get('/api/basketItems/Add/:productId', function(req, res) {
 alert("basketItem API addItem!!!");
 var productId = req.params.productId;

 var client = requestJson.newClient('http://127.0.0.1:5000/');

 client.get('api/products/' + productId, function(err, result, data) {
 if (err) {
 return res.send(500);
 }

 var productInfo = {
 "productId": data._id,
 "name": data.name,
 "price": data.offers.price
 };


 var sess = req.session;
 if (!sess.products) {
 sess.products = new Array();
 }
 sess.products.push(productInfo);
 return res.send({
 ItemCount: sess.products.length
 });

 //return console.log(body.rows[0].title);
 });
 });
 server.get('/api/basketItems/', function(req, res) {
 alert("basketItem API list!!!");
 var sess = req.session;
 if (sess.products) {
 return res.json(sess.products);
 } else {
 return res.json({});
 }
 });
 */