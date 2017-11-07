var express = require('express');
var router = express.Router();
var fs = require('fs');
var Models = require('./models');

router.get('/', function(req,res) {
    res.render('index');
});


router.post('/addMarker', function(req,res) {
    
    var newMarker = new Models.Locations({
        location_lat : req.body.location_lat,
        location_lng : req.body.location_lng
    });
    newMarker.save(function(err, marker) {
        console.log('Successfully inserted marker : ' + marker.uniqueId);
    });
});

router.get('/getAllMarker', function(req, res) {
    Models.Locations.find({}, function(err, doc) {
        res.send(doc);
    });
});

module.exports = router;