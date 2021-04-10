const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1000,
  max: 300,
});

app.use(limiter);
app.use(express.static('./dist/covid'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/covid/'}),
);

app.listen(process.env.PORT || 8080);
