var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationsSchema = new Schema({
    location_lat  : { type: String },
    location_lng  : { type: String },
    location_memo : { type: String },
    timestamp     : { type: Date, 'default': Date.now }
});

LocationsSchema.virtual('uniqueId')
    .get(function() {
        return this.location_lat+this.location_lng+this.timestamp;
    })

module.exports = mongoose.model('Locations', LocationsSchema);