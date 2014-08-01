var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('TestHTML.html');
});


app.listen(3000);