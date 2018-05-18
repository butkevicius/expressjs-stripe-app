const express = require('express');
const router = express.Router();
const config = require('../src/config');
const stripe = require('stripe')(config.stripeSecret);

router.get('/', function(req, res, next) {
  res.render('payment', { title: 'Pay with stripe', user: req.user });
});

router.post('/charge', async function(req, res, next) {
  const token = req.body.stripeToken;
  console.log(token);
  const amount = Math.round(Number.parseFloat(req.body.amount) * 100);
  if (amount < 50) {
    req.flash('error', 'Amount must be at least 50 cents');
    return res.redirect('/payment');
  }

  req.session.charge = await stripe.charges.create({
    amount: amount,
    currency: 'usd',
    description: 'Example charge',
    source: token,
    capture: false,
  });

  req.flash('success', 'Charge created');
  res.redirect('/payment/created');
});

router.get('/created', function(req, res, next) {
  if (!req.session.charge) {
    req.flash('error', 'Charge is missing');
    return res.redirect('/payment');
  }

  res.render('payment-created',
    { title: 'Payment created', user: req.user, charge: req.session.charge });
});

router.post('/capture', async function(req, res, next) {
  if (!req.session.charge) {
    req.flash('error', 'Charge is missing');
    return res.redirect('/payment');
  }
  const charge = req.session.charge;
  await stripe.charges.capture(charge.id);

  req.flash('success', 'Charge captured');
  res.redirect('/payment');
});

router.post('/refund', async function(req, res, next) {
  if (!req.session.charge) {
    req.flash('error', 'Charge is missing');
    return res.redirect('/payment');
  }
  const charge = req.session.charge;
  await stripe.refunds.create({ charge: charge.id });

  req.flash('success', 'Charge refunded');
  res.redirect('/payment');
});

module.exports = router;
