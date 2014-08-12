var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    loginManager = require('./js/loginManager');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req, res){
    console.dir(req.query);
    var context = req.query.dispText ? req.query : {dispText: ""};
    res.render('login', context);
});

app.post('/main', function(req, res){
    var usrname = req.body.username,
        pwd = req.body.password;
    if(pwd && usrname){
        loginManager.validateLogin(usrname, pwd, function(vaild){
            if(vaild){
                res.render('TestHTML.html');
            }
            else{
                res.redirect('/login?dispText=Invalid%20Username%20or%20Password');
            }
        });
    }
    else{
        res.redirect('/login?dispText=Missing%20Field');
    }
})

app.get('/addAccount', function(req, res){
    res.render('account-setup.html');
});

app.post('/addAccount', function(req, res){
    var usrname = req.body.username,
        pwd = req.body.password;
    if(pwd && usrname){
        loginManager.addAccount(usrname, pwd);
    }
    res.redirect('/login');
});
app.listen(3000);