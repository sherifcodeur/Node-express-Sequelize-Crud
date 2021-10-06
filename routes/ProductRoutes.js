// all routes for Product Model
    const express = require('express');
    const router = express.Router();
    const productController = require('../controllers/Product');
    
    
    
    
    router.get('/', productController.product_get)
    
    router.post('/', productController.product_post)
    
    router.get('/show/:id',productController.product_show)
    
    router.put('/update/:id',productController.product_put)
    
    router.delete('/delete/:id',productController.product_delete)
    
    router.get('/search',productController.product_search)
    
    module.exports = router ;
    