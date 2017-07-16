var xhr = new XMLHttpRequest();
var URL = 'http://cors.io/?http://api.population.io:80/1.0/countries';
xhr.onreadystatechange = function () {
  console.log('hello');
  console.log(this.readyState);
  console.log(this.status);
  //console.log(this.responseText);
  if (this.status == 200) {
    var jsonArray = JSON.parse(this.responseText);
    displayData(jsonArray);
  }
}

xhr.open('GET', URL, true);
xhr.send();

function displayData(arr) {
  var out = '';
  var i;
  for (i = 0; i < arr.length; i++) {
    out +=  '<p>' + arr[i] + '</p> <br/>';
  }
  document.getElementByID('data').innerHTML = out;
}
