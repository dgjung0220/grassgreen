var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var moment = require('moment');
var mongoose = require('mongoose');

var app = express();

var configs = require('./configs.js');
var route = require('./route.js');

app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    helpers: {
        timeago: function(timestamp) {
            console.log(timestamp);
            return moment(timestamp).startOf('minute').fromNow();
        }
    }
}).engine);
app.set('view engine', 'handlebars');

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

app.set('port', process.env.PORT || 3000);
app.use('/', route);

app.use('/public/', express.static(path.join(__dirname, 'public')));

/* mongodb */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };      
mongoose.connection.openUri('mongodb://localhost/grassgreen');
//mongoose.connection.openUri('mongodb://'+configs.dbUser+':'+configs.dbpassword+'@ds047075.mlab.com:47075/'+configs.dbName);

mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});

app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});