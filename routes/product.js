const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(global.products.length > 0){
        global.city = global.products[0].city
        let result = totalCal();
        res.render('index', {
            city: global.city,
            total: result.total,
            tax: result.tax,
            taxTotal: result.taxTotal
        });
    }
    else
        res.render('index');
});

// Product model
const Product = require('../model/product');

// submit new Product
router.post('/add', function(req, res){
    // Express validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('price', 'Price is not a number').isNumeric();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('quantity', 'Quantity is not a number').isNumeric();
    req.checkBody('quantity', 'Quantity is required').notEmpty();

    // Get errors
    let errors = req.validationErrors();

    if(errors){
        res.render('error', {
            message: 'Add Product Failed',
            error: JSON.stringify(errors)
        });
    }
    else {
        let product = new Product();
        product.city = req.body.city;
        product.name = req.body.name;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        global.products = products.concat(product);
        res.redirect('/');
    }

});


const Category = require('../config/category');

function totalCal(){
    let total = 0;
    let newTotal = 0;
    let tax = 0;
    global.products.map(product => {
        let itemTotal = total + product.price * product.quantity
        total = total + itemTotal;
        if (!Category.food.includes(product.name) && !(Category.cloth.includes(product.name) && product.city === 'ny')){
            newTotal = newTotal + itemTotal;
        }
    })

    switch (global.city) {
        case 'ca':
            tax = (Math.ceil((newTotal * 0.0975)*20)/20).toFixed(2)
            break;
        case 'ny':
            tax = (Math.ceil((newTotal * 0.08875)*20)/20).toFixed(2)
            break;
        default:
            break;
    }

    let taxTotal = Number(total) + Number(tax);

    return {
        total: total,
        tax: tax,
        taxTotal: taxTotal
    }
}

module.exports = router;