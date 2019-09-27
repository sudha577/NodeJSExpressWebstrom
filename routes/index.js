var express = require('express');
var router = express.Router();
var app = express.Router();
var mongodb= require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://heroku_8nmkpln3:ddtp1e5qmkck0j4158iaqb749k@ds119489.mlab.com:19489/heroku_8nmkpln3';

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//**************************
//*** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
router.get('/mongodb', function (request, response) {

  MongoClient.connect(url, function(err, db) {
    console.log(db);
    if(err) throw err;
    //get collection of routes
    var Routes = db.db('heroku_8nmkpln3').collection('Routes');
    console.log(Routes)
    //get all Routes with frequency >=1
    Routes.find({ frequency : { $gte: '1' } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;

      response.render('pages/mongodb', {results: docs});

    });

    //close connection when your app is terminating.
    db.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get