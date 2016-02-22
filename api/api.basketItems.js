//var expressSession = require("express-session");
var requestJson = require("request-json");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    router.get('/api/basketItems/Add/:productId', addItem);
    router.get('/api/basketItems/', list);
};

var list = function(req, res) {
    alert("BasketItem API list");

    var sess = req.session;
    if (sess.products) {
        return res.json(sess.products);
    } else {
        return res.json({});
    }

};

var addItem = function(req, res) {
    alert("BasketItem API addItem: " + productId);

    var productId = req.params.productId;


    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function(err, result, data) {
        if (err) {
            return res.send(500);
        }

        var productInfo = {
            "productId": data.id,
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

};