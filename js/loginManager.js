var fs = require('fs');

var JSONpath = __dirname + '/../json/users.json';

exports.addAccount = function(usrname, pwrd){
    var users = JSON.parse(fs.readFileSync(JSONpath));
    users[usrname] = pwrd;
    fs.writeFileSync(JSONpath, JSON.stringify(users));
}

exports.validateLogin = function (usrname, pwrd){
    var users = JSON.parse(fs.readFileSync(JSONpath));
    var pwd = users[usrname];
    if(pwd && pwd === pwrd){
        return true;
    }
    return false;
}