const router = require('express').Router();
const Cart = require('../models/Cart');
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('./verifyToken');

// Create Cart
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Your cart is deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user cart
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all cart info
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const allCart = await Cart.find();
    res.status(200).json(allCart);
  } catch (error) {
    res.status(500).json(500);
  }
});

module.exports = router;
