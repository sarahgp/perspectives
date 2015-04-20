var MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    fs          = require('fs'),
    RSVP        = require('rsvp');

/////////////////
// URL & files //
/////////////////
var url  = 'mongodb://localhost:27017/books',
    file = './input/books.json';


/**
 * Read in books file
 * @param  {function} resolve   
 * @param  {function} reject
 * @return {array}    array of parsed JSON objects from file
 */
var books = new RSVP.Promise(function(resolve, reject){
  fs.readFile(file, function(err, data){
    err && reject(err);
    var data = JSON.parse(data);
    data.forEach(function(el){
      el.feeling = el.feeling.split(' ')[1];
    })
    resolve(data);
  })
});


/**
 * Connect to database
 * @param  {array} data  read in from from books & passed by resolve
 * @return {object}      returns reference to connect db and the data array
 */
var connect = function(data){
  return new RSVP.Promise(function(resolve, reject){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      err && reject(err);
      
      console.log("Connected correctly to server");
      resolve({db: db, data: data});

    });
  });
};

/**
 * Actually insert the files
 * @param  {object} db   Mongo db reference returned from connect
 * @param  {array}  data Same data from file
 * @return {object}      Same db so it can be acted on or closed
 */
var insert = function(db, data){
  return new RSVP.Promise(function(resolve, reject){    
    db.collection('books').insertMany(data, function(err, result){
      assert.equal(null, err);
      err && reject(err);
      resolve(db);
    });
  });
};


//////////////////////
//Actually do stuff //
//////////////////////
books.then(function(data){
  return connect(data);
}).then(function(obj){
  return insert(obj.db, obj.data);
}).then(function(db){
  db.close();
  console.log("Disconnected from server");
}).catch(function(err){
  console.log("Error: ", err);
});