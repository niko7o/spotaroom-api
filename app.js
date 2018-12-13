require('dotenv').config();
require('./configs/cors.config')

const express = require('express');
const port = process.env.PORT || 8000;
const logger = require('morgan');
const app = express();
const cors = require('cors');
const homeRouter = require('./routes/home.routes');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', homeRouter);

// 404
app.get('*', function (req, res) {
    res.status(404).json({
        message: 'Page not found'
    })
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json({
        error: err.status
    });
  });

app.listen(port);

console.info(`Spotaroom REST api listening @ port ${port} with CORS enabled`);