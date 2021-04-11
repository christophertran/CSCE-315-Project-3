const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');
const autocompleteRoutes = require('./routes/autocomplete');
const searchRoutes = require('./routes/search');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(indexRoutes);
app.use("/autocomplete", autocompleteRoutes);
app.use("/search", searchRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('PoliLime has been served.');
});