let express = require('express');
let app = express();
let add = require('../routes/add.js');
app.use(add);
app.listen(18686);
// let server = require('http').createServer(app);
// server.listen(18686);