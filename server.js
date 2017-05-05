//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var numberOfFortunes = 3000;         // need to dynamically derive the number of fortune cookies present
var mongo = require('mongodb').MongoClient;

app.use(morgan('dev'));

mongo.connect( process.env.MONGODB_URI, (err, db) => {
  if (err) throw err;
  console.log('Connected to MONGODB now ...');
  // push all other work to the router
  app.get('/', (req, res) => {
      var randomIdx = Math.floor(Math.random() * numberOfFortunes); // random number [0, numberOfFortunes)
      db.collection('fortunecookies').find({ seq: randomIdx}).toArray((err,fortunes) => {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');  // barf back JSON to client
        res.send(fortunes[0].fortune);
    });
  });
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
