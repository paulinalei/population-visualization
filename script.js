var xhr = new XMLHttpRequest();
var URL2 = 'http://api.population.io/1.0/population/2010/United%20States/';
var URL = 'https://api.github.com/emojis';

var femalePopulation = [];

xhr.onload = function () {
  console.log('hello');
  console.log(this.readyState);
  console.log(this.status);
  //console.log(this.responseText);
  if (this.status == 200) {
    var object = JSON.parse(this.responseText);

    for (var i = 0; i < object.length; i++) {
      femalePopulation.push(object[i].females);
    }
    console.log(femalePopulation);
    if (femalePopulation.length > 0) {
      console.log('we in here');
      d3.select(".data")
        .data(femalePopulation)
        .enter()
        .append("svg")
        .style("width", function(d) { return d/10000 + "px"; })
        .style('background-color', function (d) { return 'black'; })
        // add mouseover effect to change background color to black
        .on('mouseover', function() {
          d3.select(this)
            .style('background-color','blue')
        })
        .on('mouseout', function () {
          d3.select(this)
            .style('background-color', function (d) { return 'red'; })
        })
        .text(function(d) { return d; });
    }
  }
}

xhr.open('GET', URL2, true);
xhr.send();
