const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const router = express.Router();

router.post('/products/:productId/review', async (req, res) => {
  // console.log(req.body);
  let { rating, comment } = req.body;
  let { productId } = req.params;
  let product = await Product.findById(productId);
  let newReview = new Review({ rating, comment });
  await newReview.save();
  product.reviews.push(newReview); // objectId jaaegi only
  await product.save();
  res.redirect(`/products/${productId}`);
});

module.exports = router;
