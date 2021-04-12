const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('PoliLime has been served.');
});