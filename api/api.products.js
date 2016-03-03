var db = require("../db/db.products");

// define the routes for /api/users
module.exports = function attachHandlers(router) { //, passport) {
    // get requests

    // [Replacement by Ted Tang]
    // api.put('/admin/product/seed',...);
    router.get('/api/products/seed', seed);

    // [Replacement by Ted Tang]
    // api.get('/products,...);
    router.get('/api/products', list);

    // [Replacement by Ted Tang]
    // api.get('/product/id/:id',...);
    router.get('/api/products/:id', view);
    console.log("product module api.productItems import success");
};


function list(req, res) {
    db.getAll(function(data) {
        res.json(data);
    });
}

function seed(req, res) {
    db.insert({
        "id": "motorola-xoom-with-wi-fi",
        "images": [
            "img/phones/motorola-xoom-with-wi-fi.0.jpg",
            "img/phones/motorola-xoom-with-wi-fi.1.jpg",
            "img/phones/motorola-xoom-with-wi-fi.2.jpg",
            "img/phones/motorola-xoom-with-wi-fi.3.jpg",
            "img/phones/motorola-xoom-with-wi-fi.4.jpg",
            "img/phones/motorola-xoom-with-wi-fi.5.jpg"
        ],
        "name": "Motorola XOOM\u2122 with Wi-Fi",
        "description": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb).",
        "price": 129.99,
        "offers": {
            "price": 229.99,
            "stock": 10
        }
    });
}

function seedOld(req, res) {
    db.insert({
        "name": "Horse",
        "description": "A lovely horse",
        "minPrice": 59.99,
        "offers": {
            "price": 59.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "Cow",
        "description": "A lovely cow",
        "minPrice": 59.99,
        "offers": {
            "price": 59.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "cat",
        "description": "A lovely cat",
        "minPrice": 19.99,
        "offers": {
            "price": 19.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "dog",
        "description": "A lovely dog",
        "minPrice": 19.99,
        "offers": {
            "price": 19.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "mouse",
        "description": "A lovely mouse",
        "minPrice": 19.99,
        "offers": {
            "price": 19.99,
            "stock": 10
        }
    });
    res.json({
        "Status": "OK"
    });
}

function view(req, res) {
    db.getById(req.params.id, function(err, data) {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            return res.json({
                "Error": err
            });
        } else {
            return res.json(data);
        }
    });
}