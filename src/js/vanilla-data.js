console.log('vanilla!');

fetch('http://0.0.0.0:3000/books/books')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    var words = document.getElementById('words');
    json.forEach(function(el){
      var p = document.createElement("p");
      p.innerHTML = JSON.stringify(el.color);
      words.appendChild(p);
    })
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });