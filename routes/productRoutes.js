const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); //mini instance/application;

// READ
router.get('/products', async (req, res) => {
  let allProducts = await Product.find();
  res.render('product/index', { allProducts });
});

//show a new form

router.get('/product/new', (req, res) => {
  res.render('product/new');
});

//add new product in form

router.post('/products', async (req, res) => {
  let { name, img, price, desc } = req.body;
  await Product.create({ name, img, price, desc });
  res.redirect('/products');
});
//show a particular product
router.get('/products/:id', async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Product.findById(id).populate('reviews');
  res.render('product/show', { foundProduct });
});
//product get krna hai
router.get('/products/:id/edit', async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Product.findById(id);
  res.render('product/edit', { foundProduct });
});

//edited product
router.patch('/products/:id', async (req, res) => {
  let { id } = req.params;
  //   let foundProduct = await ;
  let { name, img, price, desc } = req.body;
  await Product.findByIdAndUpdate(id, { name, img, price, desc });
  res.redirect(`/products/${id}`);
});

//deleting the product
router.delete('/products/:id', async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Product.findByIdAndDelete(id, {});
  res.redirect('/products');
});

// export so that you can use it in app.ja
module.exports = router;
