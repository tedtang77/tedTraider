var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

var productSchema = {
    name: { type: String, required: true },
    // Pictures must start with "http://"
    images: [{ type: String }],
    //pictures: [{ type: String, match: /^http:\/\//i }],
    price: {
        amount: {
            type: Number,
            required: true,
            set: function(v) {
                this.internal.approximateMarketPriceUSD =
                    v / (fx()[this.price.currency] || 1);
                return v;
            }
        },
        // Only 3 supported currencies for now
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP'],
            required: true,
            set: function(v) {
                if(this.price.amount) {
                    this.internal.approximateMarketPriceUSD =
                        this.price.amount / (fx()[v] || 1);
                }
                if(this.offerPriceAmount) {
                    this.internal.approximateOfferPriceUSD =
                        this.offerPriceAmount / (fx()[v] || 1);
                }
                return v;
            }
        }
    },
    category: Category.categorySchema,
    internal: {
        approximateMarketPriceUSD: Number,
        approximateOfferPriceUSD: Number
    },
    description: {
        type: String
    },
    offerPriceAmount: {
        type: Number,
        set: function(v) {
            this.internal.approximateOfferPriceUSD =
                v / (fx()[this.price.currency] || 1);
            return v;
        }
    },
    stock: { type: Number }
};

var schema = new mongoose.Schema(productSchema);

var currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
};

/*
 * Human-readable string form of price - "$25" rather
 * than "25 USD"
 */
schema.virtual('displayMarketPrice').get(function() {
    return currencySymbols[this.price.currency] +
        '' + this.price.amount;
});

schema.virtual('displayOfferPrice').get(function() {
    return currencySymbols[this.price.currency] +
        '' + this.offerPriceAmount;
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.productSchema = productSchema;