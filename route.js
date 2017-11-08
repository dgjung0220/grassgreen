var express = require('express');
var router = express.Router();
var fs = require('fs');
var Models = require('./models');

router.get('/', function(req,res) {
    res.render('index');
});

router.post('/addMarker', function(req, res) {
    
    var newMarker = new Models.Locations({
        location_lat : req.body.location_lat,
        location_lng : req.body.location_lng
    });
    newMarker.save(function(err, marker) {
        if(err) res.send('fail');

        console.log('Successfully inserted marker : ' + marker.uniqueId);
        
        Models.Locations.find({_id : marker._id}, function(err, doc) {
            if(err) {
                res.send('fail');
            } else {
                res.send(doc[0]._id);    
            }
        })
    });
});

router.get('/getAllMarker', function(req, res) {
    Models.Locations.find({}, function(err, doc) {
        res.send(doc);
    });
});

router.post('/removeMarker', function(req, res) {
    console.log(req.body._id);
    Models.Locations.remove({_id : req.body._id}, function(err) {
        if (err) {
            res.send('fail');
        } else {
            res.send('success');
        }
    })
})


/** memo **/
router.post('/updateMemo', function(req, res) {
    Models.Locations.findOne({_id: req.body._id}, function(err, location) {
        if (err) {
            console.log('error');
            res.send('fail');
        } else {
            if (location) {
                location.location_memo = req.body.location_memo;
                location.save();
                res.send(location.location_memo);
            }
        }
    });
});

router.post('/getMemo', function(req, res) {
    Models.Locations.findOne({_id: req.body._id}, function(err, location) {
        if (err) {
            console.log('error');
            res.send('fail');
        } else {
            if (location) {
                res.send(location.location_memo);
            }
        }
    });
});

module.exports = router;