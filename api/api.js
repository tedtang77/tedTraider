var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
// Http-status has a map of readable strings to HTTP status codes.
// So instead of writing 404, you just write status.notfound.


//module.exports = function (wagner) {
module.exports = function(wagner) {

    var api = express.Router();

    //create a router that can accept JSON
    api.use(bodyparser.json());

    /*
    Wagner has this handy function called invoke.
    Wagner's invoke function behaves much like AngularJS's invoke function. It takes a function and executes it.
    However, invoke also inspects the function's parameter list and pulls in services that match the parameter names.
    The function specified in this call to invoke takes a single parameter called Category.
    Wagner looks for a service named Category and calls the function with the correct service.
    */


    // Category API: "/category/id/:id"
    var categoryIdHandler = wagner.invoke(function(Category) {
        return function(req, res) {
            Category.findOne({ _id: req.params.id }, function(error, category) {
                if (error) {
                    return res.
                    status(status.INTERNAL_SERVER_ERROR).
                    json({ error: error.toString() });
                }
                if (!category) {
                    return res.
                    status(status.NOT_FOUND).
                    json({ error: 'Not found' });
                }
                res.json({ category: category });
            });
        };
    });
    api.get('/category/id/:id', categoryIdHandler);

    // Category API: "/category/parent/:id"
    var categoryParentHandler = wagner.invoke(function(Category) {
        return function(req, res) {
            // 1: ascending; -1: descending
            Category
                .find({ parent: req.params.id })
                .sort({ _id: 1 })
                .exec(function(error, categories) {
                    if (error) {
                        return res.
                        status(status.INTERNAL_SERVER_ERROR).
                        json({ error: error.toString() });
                    }
                    res.json({ categories: categories });
                });
        };
    });
    api.get('/category/parent/:id', categoryParentHandler);

    // Product API: "/product/id/:id"
    var productIdHandler = wagner.invoke(function(Product){
        return function(req, res){
            Product.findOne({ _id : req.params.id },
            handleOne.bind(null, 'product', res) );
        };
    });
    api.get('/product/id/:id', productIdHandler);

    // Product API: "/product/category/:id"
    var productCategoryHandler = wagner.invoke(function(Product){
        return function(req, res){
            var sort = { name: 1 };
            if( req.query.price === "1" ) {
                // 1: ascending
                sort = {'internal.approximateOfferPriceUSD': 1 };
            }else if( req.query.price === "-1" ){
                // -1: descending
                sort = {'internal.approximateOfferPriceUSD': -1 };
            }

            Product
                .find({ 'category.ancestors' : req.params.id } )
                .sort(sort)
                .exec(handleMany.bind(null, 'products', res));
        };
    });
    api.get('/product/category/:id', productCategoryHandler);

    // Product API: /products (added by Ted)
    var productsListHandler = wagner.invoke(function(Product){
        return function(req, res){
            var sort = { name: 1 };
            if( req.query.price === "1" ) {
                // 1: ascending
                sort = {'internal.approximateOfferPriceUSD': 1 };
            }else if( req.query.price === "-1" ){
                // -1: descending
                sort = {'internal.approximateOfferPriceUSD': -1 };
            }

            Product
                .find({})
                .sort(sort)
                .exec(handleMany.bind(null, 'products', res));
        };
    });
    api.get('/products', productsListHandler);


    // Administrative Product API to add seed data: /admin/product/seed (added by Ted)
    var adminProductSeedHandler = wagner.invoke(function(Product, Category){
        return function(req, res){
            var categories = [
                { _id: 'Electronics' },
                { _id: 'Phones', parent: 'Electronics' },
                { _id: 'Laptops', parent: 'Electronics' },
                { _id: 'Bacon' }
            ];

            var products = [
                {
                    name: 'LG G4',
                    category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
                    images: [
                        "img/phones/lg-axis.0.jpg",
                        "img/phones/lg-axis.1.jpg",
                        "img/phones/lg-axis.2.jpg"
                    ],
                    price: {
                        amount: 300,
                        currency: 'USD'
                    },
                    description: "Android Powered, Google Maps Navigation, 5 Customizable Home Screens",
                    offerPriceAmount: 259,
                    stock: 50
                },
                {
                    name: 'Asus Zenbook Prime',
                    category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
                    images: [
                        "img/phones/nexus-s.0.jpg",
                        "img/phones/nexus-s.1.jpg",
                        "img/phones/nexus-s.2.jpg",
                        "img/phones/nexus-s.3.jpg"
                    ],
                    price: {
                        amount: 2000,
                        currency: 'USD'
                    },
                    description: "Fast just got faster with Nexus S. A pure Google experience, Nexus S is the first phone to run Gingerbread (Android 2.3), the fastest version of Android yet.",
                    offerPriceAmount: 1800,
                    stock: 100
                },
                {
                    name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
                    category: {_id: 'Bacon', ancestors: ['Bacon']},
                    images: [
                        "img/phones/dell-streak-7.0.jpg",
                        "img/phones/dell-streak-7.1.jpg",
                        "img/phones/dell-streak-7.2.jpg",
                        "img/phones/dell-streak-7.3.jpg",
                        "img/phones/dell-streak-7.4.jpg"
                    ],
                    price: {
                        amount: 20,
                        currency: 'USD'
                    },
                    description: "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb).",
                    offerPriceAmount: 15,
                    stock: 10
                }
            ];

            Category.create(categories, function(error, docs) {
                if (error) {
                    return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
                }
                Product.create(products, function (error, docs) {
                    if (error) {
                        return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
                    }
                    return res.json({products: products, categories: categories});
                });
            });

        };
    });
    api.get('/admin/product/seed', adminProductSeedHandler);

    // Administrative Product API to clean seed data: /admin/product/clean (added by Ted)
    var adminProductCleanHandler = wagner.invoke(function(Product){
        return function(req, res){
            Product.remove({}, function(error){
                if (error) {
                    return res.
                    status(status.INTERNAL_SERVER_ERROR).
                    json({ error: error.toString() });
                }
            });
            return res.json({});
        };
    });
    api.get('/admin/product/clean', adminProductCleanHandler);



    // User API: /me/cart     save user cart
    var meCartHandler = wagner.invoke(function(User){
        return function(req, res){
            try {
                var cart = req.body.data.cart;
            }catch(e){
                return res
                    .status(status.BAD_REQUEST)
                    .json( {error: 'No cart specified!'} );
            }

            req.user.data.cart = cart;
            req.user.save(function(error, user){
                if(error){
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json( { error: error.toString()} );
                }
                return res.json({ user: user });
            });
        }
    });
    api.put('/me/cart', meCartHandler);

    // User API: /me    load user cart
    api.get('/me', function(req, res){
        if(!req.user){
            return res
                .status(status.UNAUTHORIZED)
                .json({ error: 'Not logged in' });
        }

        req.user.populate(
            { path: 'data.cart.product', model: 'Product' },
            handleOne.bind(null, 'user', res)
        );

    });

    return api;
};


function handleOne(property, res, error, result){
    if(error){
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
    if(!result){
        return res
            .status(status.NOT_FOUND)
            .json({ error: 'NOT FOUND' });
    }

    var json = {};
    json[property] = result;
    res.json(json);

}

function handleMany(property, res, error, result){
    if(error){
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }

    var json = {};
    json[property] = result;
    res.json(json);
}
