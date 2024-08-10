const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
// Search for products
router.get('/search', async (req, res) => {
    const { name, supplier } = req.query;
    const query = {};
    
    if (name) {
        query.name = new RegExp(name, 'i'); // Case-insensitive search
    }
    if (supplier) {
        query.supplier = new RegExp(supplier, 'i'); // Case-insensitive search
    }

    try {
        const products = await Product.find(query);
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});
