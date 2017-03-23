/**
 * Created by yuanchao on 2017/3/23.
 */

var express = require('express');
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/public'));


var fortunes = [
    '123',
    '4',
    '5',
    '6',
];

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

// 定制 404
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

// 定制 500

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started ');
});