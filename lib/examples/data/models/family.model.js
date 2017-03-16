/* jshint -W101 */

var $           = require('../../../../src/utils'),
    _           = require('lodash'),
    enums       = require('../enums'),
    mongoose    = require('mongoose');

// var testPlugin = require('../../../../src/to-dto.plugin.js');
var testPlugin = require('../../../../src/audit-trail.plugin.js');
var personSchema = require('./person.model');

var familySchema = mongoose.Schema({

    _id : { type: String, name: 'ID', default: $.uuids.init },

    s   : { type: String, name: 'Sur Name', key: 'surname', required: true, trim: true },
    m   : [ personSchema ]
});
familySchema.plugin(testPlugin);

var model = mongoose.model('Family', familySchema);

module.exports = model;
