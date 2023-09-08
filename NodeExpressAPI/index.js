const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// middlewares
app.use(cors(/* 
              { origin: 'http://site.abc',
                optionsSuccessStatus: 200 } 
             */));
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});