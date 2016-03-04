var expressSession = require("express-session");
var requestJson = require("request-json");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests4x
    // [Replacement by Ted Tang]
    // api.put('/me/cart',...);
    router.get('/api/basketItems/Add/:productId', addItem);
    // [Replacement by Ted Tang]
    // api.get('/me',...);
    router.get('/api/basketItems/', list);
    console.log("basket module api.basketItems import success");
};

var list = function(req, res) {
    console.log("basketItem API list!!!");
    var sess = req.session;
    debugger;
    try {
        if (sess.products) {
            return res.json(sess.products);
        } else {
            return res.json({});
        }
    }catch(e){
        console.log(e);
    }
};

var addItem = function(req, res) {
    var productId = req.params.productId.slice(0,12); //Extra ADD: to shorten ProductId to 12 character string to fit the length
    debugger;
    console.log("basketItem API addItem:"+productId.slice(0,12));

    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId.slice(0,12), function(err, result, data) {
        if (err) {
            return res.send(500);
        }

        console.log(data);
        //console.log("productId:" + data.id + "\nname:" + data.name + "\nprice:" + data.offers.price );
        var productInfo = {
            "productId": data.id,
            "name": data.name,
            //"price": String(data.offers.price)
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