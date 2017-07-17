var xhr = new XMLHttpRequest();
var URL2 = 'http://api.population.io/1.0/population/2010/United%20States/';
var URL = 'https://api.github.com/emojis';
xhr.onload = function () {
  console.log('hello');
  console.log(this.readyState);
  console.log(this.status);
  //console.log(this.responseText);
  if (this.status == 200) {
    // displayData(jsonArray);
    var object = JSON.parse(this.responseText);
    console.log(object[0].females);
    var test = '' + object[0].females;
    document.getElementById('data').innerHTML = '<p>' + test + '</p>';
  }
}

xhr.open('GET', URL2, true);
xhr.send();

// function displayData(arr) {
//   var out = arr;
//   document.getElementById('data').innerHTML = out;
// }
