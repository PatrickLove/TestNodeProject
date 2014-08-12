var fs = require('fs'),
    mongodb = require('mongodb');

var JSONpath = __dirname + '/../json/users.json';
var DBpath = "mongodb://192.168.1.47:27017/test"

exports.addAccount = function(usrname, pwrd){
//    var users = JSON.parse(fs.readFileSync(JSONpath));
//    users[usrname] = pwrd;
//    fs.writeFileSync(JSONpath, JSON.stringify(users));
    runWithDb(function(err, db){
        if(err) throw err;
        var users = db.collection('users');
        users.insert({username: usrname, password: pwrd}, function(){});
    });
}

exports.validateLogin = function (usrname, pwrd, callback){
//    var users = JSON.parse(fs.readFileSync(JSONpath));
//    var pwd = users[usrname];
//    if(pwd && pwd === pwrd){
//        return true;
//    }
//    return false;
    runWithDb(function(err, db){
        var users = db.collection('users');
        users.findOne({username: usrname, password: pwrd}, function(err, res){
            callback(res);
        });
    });
}

function runWithDb(code){
    mongodb.connect(DBpath, code);
}

