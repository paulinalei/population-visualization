var xhr = new XMLHttpRequest();
var URL = 'https://api.github.com/emojis';
xhr.onreadystatechange = function () {
  console.log('hello');
  console.log(this.readyState);
  console.log(this.status);
  console.log(this.responseText);
  if (this.status == 200) {
    var jsonArray = JSON.stringify(this.responseText);
    displayData(jsonArray);
  }
}

xhr.open('GET', URL, true);
xhr.send();

function displayData(arr) {
  var out = arr;
  document.getElementById('data').innerHTML = out;
}
