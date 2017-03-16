var config      = require('./config'),
    enums       = require('./data/enums'),
    models      = require('./data/models'),
    mongoose    = require('mongoose'),
    seeds       = require('./data/seed');

// var toItemPlugin = require('../../src/to-item.plugin.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db.options);
mongoose.connection.on('error', function (err) {
    if (err) { throw err; }
});
mongoose.connection.once('open', function (err) {
    if (err) { throw err; }

    // mongoose.plugin(toItemPlugin);

    seeds.doSeed(function(err){
        if (err) { return process.exit(1); }

        models.Person.find({}, function(err, people){
            if (err) { throw err; }

            var person = people[0];
            var oPerson = person.toJSON({
                hide: 'by'
                // level: 49
            });

            console.log(oPerson);
        });
    });
});
