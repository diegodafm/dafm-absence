/**
 * Created by avenuecode on 12/3/14.
 */
var express  = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var users = require(__dirname + '/routes/users');
var absences = require(__dirname + '/routes/absences');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://diego:diego@proximus.modulusmongo.net:27017/hemi9baG');

/*
mongoose.connection.collections['absences'].drop( function(err) {
    console.log('collection dropped');
});
*/

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(express.static(__dirname + '/'));


app.use('/api', users);
app.use('/api', absences);

app.listen(process.env.PORT || 5000);
console.log('Express server listening on port ' );




