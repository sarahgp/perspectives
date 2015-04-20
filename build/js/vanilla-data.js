console.log('vanilla!');

var look  = document.getElementById('look'),
    input = document.getElementsByTagName("input");

look.onsubmit = function(){
  event.preventDefault();
  console.log('Submit!', input.lookFor.value);
  var val = input.lookFor.value.split(':');
  fetch('http://0.0.0.0:3000/books/books/')
    .then(function(response) {
      console.log(val);
      if (response.status !== 200) {  
              console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
              return;  
      }
      return response.json();
    }).then(function(json) {
      var words = document.getElementById('words');
      val[1] = val[1].trim();
      console.log(val);
      json.forEach(function(el){
        if (el[val[0]] === val[1] || el[val[0]].toLowerCase() === val[1]){
          var p = document.createElement("p");
          p.innerHTML = JSON.stringify(el.color);
          words.appendChild(p);
        }
      })
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
}
