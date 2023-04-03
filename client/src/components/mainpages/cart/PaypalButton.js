const express = require('express');
const router = express.Router();
const { Payment } = require('../models/payment.model');

router.post('/', async (req, res) => {
  try {
    const { cart, paymentID, address } = req.body;

    // Save payment information to database
    const payment = new Payment({
      cart,
      paymentID,
      address,
    });
    await payment.save();

    // Send a response indicating the payment was successful
    res.status(200).json({ message: 'Payment successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
