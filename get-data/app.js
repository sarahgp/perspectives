var MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    fs          = require('fs'),
    RSVP        = require('rsvp');

// URL & files
var url  = 'mongodb://localhost:27017/books',
    file = './input/books.json';

// Read in books
var books = new RSVP.Promise(function(resolve, reject){
  fs.readFile(file, function(err, data){
    err && reject(err);
    resolve(JSON.parse(data));
  })
});

// Connect to database
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

var insert = function(db, data){
  return new RSVP.Promise(function(resolve, reject){    
    db.collection('books').insertMany(data, function(err, result){
      assert.equal(null, err);
      err && reject(err);
      resolve(db);
    });
  });
};


//Actually do stuff
books.then(function(data){
  console.log(data.length);
  return connect(data);
}).then(function(obj){
  return insert(obj.db, obj.data);
}).then(function(db){
  db.close();
  console.log("Disconnected from server");
}).catch(function(err){
  console.log("Error: ", err);
});