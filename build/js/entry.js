var genre     = document.getElementById('genre'),
    subgenre  = document.getElementById('subgenre'),
    entry     = document.getElementById('entry'),
    obj = {
      "grab bag": [],
       "book on books": [],
       "comic": [],
       "art and design": [],
       "fiction": [],
       "literary theory": [],
       "mystery": [],
       "nonfiction": [],
       "sports": []
    };

// Populating things

function subgenrePop(genre){
  var options = obj[genre];
  options.forEach(function(option){
    var op = document.createElement('option');
    op.value = option;
    op.innerText = option;
    subgenre.appendChild(op);
  });
}

fetch('http://0.0.0.0:3000/books/books/')
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    json.forEach(function(el){
      obj.hasOwnProperty(el.genre) && obj[el.genre].push(el.subgenre);
    });

    var keys = Object.keys(obj);
    keys.forEach(function(key){
      obj[key] = _.uniq(obj[key]);
    })
    genre.addEventListener('change', function(event){
      var genre = event.target.value;
      subgenrePop(genre);
    });
  });

// Adding things
entry.onsubmit = function(event){
  event.preventDefault();
  var eEls     = entry.elements,
      entryObj = {
        color:  eEls.color.value,
        height: eEls.height.value,
        pages: eEls.pages.value,
        author: eEls.author.value,
        feeling: eEls.feeling.value,
        genre: eEls.genre.value,
        subgenre: eEls.subgenre.value
      };

  fetch('http://0.0.0.0:3000/books/books/',{
    method: 'post',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(entryObj)
  });
}