var mongoose = require('mongoose');
var _ = require('underscore');

// this model module can be used to bootstrap Mongoose models by index.js
module.exports = function(wagner) {

    mongoose.connect('mongodb://localhost:27017/test');

    // create a Mongoose model, "Category", by parameters: model name, schema, collection name
    var Category = mongoose.model('Category', require('./category'), 'categories');
    var Product = mongoose.model('Product', require('./product'), 'products');
    var User = mongoose.model('User', require('./user'), 'users');

    var models = {
        Category: Category,
        Product: Product,
        User: User
    };

    // To ensure DRY-ness (Don't Repeat Yourself), register factories in a loop
    //   Service registry with Wagner framework
    _.each(models, function(value, key){
        wagner.factory(key, function(){
            return value;
        });
    });

    /*
    //'Category service registry with Wagner framework
    wagner.factory('Category', function() {
        return Category;
    });
    */

    return models;
    /*
    return {
        Category: Category
    };
    */
};
