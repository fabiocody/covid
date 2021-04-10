const express = require('express');
const RateLimit = require('express-rate-limit');

const app = express();

const limiter = new RateLimit({
  windowMs: 1000,
  max: 10,
});

app.use(limiter);
app.use(express.static('./dist/covid'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/covid/'}),
);

app.listen(process.env.PORT || 8080);
