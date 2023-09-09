const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

/**
 * Products array
 */
const products = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 9.99 },
  { id: 3, name: 'Product 3', price: 12.99 }
];

/**
 * Aux to create incremental product ID
 */
let idCounter = products.length; // starts with value 3 

/**
 * Express App instance
 */
const app = express();


/* --------- Middlewares --------- */

app.use(cors(/* 
              { origin: 'http://site.abc',
                optionsSuccessStatus: 200 } 
             */));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());


/* --------- Routes --------- */

/**
 * Return all products
 */
app.get('/products', (req, res) => {
  // return 200 OK + products array
  res.json(products);
});

/**
 * Return product by id
 */
app.get('/products/:id', (req, res) => {
  // get param
  const id = parseInt(req.params.id);
  // find
  const product = products.find(p => p.id === id);
  // if found
  if(product){
    // return 200 OK + product
    res.json(product);
  } 
  else{ 
    // return 404 Not Found + message
    res.status(404).json({ message: 'Product not found.' });
  }
});

/**
 * Insert new product
 */
app.post('/products', (req, res) => {
  // create a new product (++ before, first increments then recovers the value)
  const newProduct = { id: ++idCounter, ...req.body };
  // add to array
  products.push(newProduct);
  // return 201 Created + product 
  res.status(201).json(newProduct);
});

/**
 * Update product
 */
app.put('/products/:id', (req, res) => {
  // get params
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  // find product index
  const index = products.findIndex(product => product.id === productId);
  // if not found
  if(index === -1){
    // return 404 Not Found + message
    res.status(404).json({ message: 'Product not found.' });
  }
  else{
    // updates the product using destructuring assignment
    products[index] = { ...products[index], ...updatedProduct };
    // return 200 OK + product
    res.json(products[index]);
  }
});

/**
 * Delete product
 */
app.delete('/products/:id', (req, res) => {
  // get param
  const productId = parseInt(req.params.id);
  // find product index
  const index = products.findIndex(product => product.id === productId);
  if(index === -1){
    // return 404 Not Found + message
    res.status(404).json({ message: 'Product not found.' });
  }
  else{
    // delete
    products.splice(index, 1);
    // return 200 OK + product ID
    res.json({ id: productId });
  }
});


/* --------- App start --------- */

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});