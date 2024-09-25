const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;
app.use(cors());

let taxRate = 5; // 5%
let discountPercentage = 10 //10%
let loyaltyRate = 2; // 2 points per $1

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let updatedCartTotal = cartTotal + newItemPrice;

  res.send(updatedCartTotal.toString())
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let result;

  if(isMember){
    result = (cartTotal - (cartTotal / discountPercentage));
  } else {
    result = cartTotal;
  }

  res.send(result.toString())
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(((taxRate / 100) * cartTotal).toString())
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let days;

  if (shippingMethod === 'express') {
    days = distance / 100
  } else {
    days = distance / 50
  }

  res.send(days.toString())
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send((weight * distance * 0.1).toString())
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send((purchaseAmount * loyaltyRate).toString())
});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
