const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');
const autocompleteRoutes = require('./routes/autocomplete');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(indexRoutes);
app.use("/autocomplete", autocompleteRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('PoliLime has been served.');
});