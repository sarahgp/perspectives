console.log('vanilla!');

var look  = document.getElementById('look'),
    words = document.getElementById('words'),
    input = document.getElementsByTagName("input");

function getAndFilter(val){
  words.innerHTML = '';
  fetch('http://0.0.0.0:3000/books/books/')
    .then(function(response) {
      if (response.status !== 200) {  
              console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
              return;  
      }
      return response.json();
    }).then(function(json) {
      var keys  = _.pull(Object.keys(json[0]), '_id');

      keys.forEach(function(el){
          var th = document.createElement("th")
          th.innerHTML = el;
          words.appendChild(th);
      });

      val[1] = val[1].trim();

      json.forEach(function(el){
        if (el[val[0]] === val[1] || el[val[0]].toLowerCase() === val[1]){
          var tr = document.createElement("tr");

          keys.forEach(function(key){
            var td = document.createElement("td");
            td.innerHTML = el[key];
            tr.appendChild(td);
          });

          words.appendChild(tr);
        }
      })
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
}

look.onsubmit = function(){
  event.preventDefault();
  getAndFilter(input.lookFor.value.split(':'));
  console.log('Submit!', input.lookFor.value);
}
