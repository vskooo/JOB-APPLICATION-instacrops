const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config()

// RUTAS

const products = require('./routes/productsRoutes');

const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

// LLAMANDO RUTAS

products(app);

// server.listen(3000, '0.0.0.0' || 'localhost', function() {
//     console.log('API de INSTACROPS🔬 ' + port + ' INICIADA CORRECTAMENTE✓✓');
// });

app.listen(port || 3000, () => {
console.log('API de INSTACROPS🔬 ' + port + ' INICIADA CORRECTAMENTE✓✓');
})

app.get('/', (req, res) => {
    res.send('Ruta raíz api')
});

app.get('/test', (req, res) => {
    res.send('Ruta Testing')
});

// ERROR HANDLER
app.use((err, req, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}