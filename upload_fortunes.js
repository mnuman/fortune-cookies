"use strict";
var fs = require("fs");
var mongo = require('mongodb').MongoClient;
// set DB_URL in format mongodb://username:password@host:port/database
mongo.connect(process.env.DB_URL, (err, db) => {
    if (err) throw err;
    var fortune_cookies = db.collection('fortunecookies');
    console.log('We\'re connected to MONGO now ...');
    fs.readFile("fortunes.txt", "utf-8", (err, data) => {
        if (err) throw err;
        var fortunes = data.split('\n%\n');

        for (var i = 0; i < fortunes.length; i++) {
            fortune_cookies.insert({
                seq: i,
                fortune: fortunes[i]
            }, (err, data) => {
                if (err) throw err;
            });
        }
    });
    fortune_cookies.ensureIndex("seq", (err, data => {
        if (err) {
            console.log("Tandjes, het aanmaken van de index ging niet erg lekker ... " + err);
            throw err;
        }
    }));
    console.log('Done ... End the upload process');
});