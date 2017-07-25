var xhr = new XMLHttpRequest();
var URL2 = 'http://api.population.io/1.0/population/2010/United%20States/';

var femalePopulation = [];
var malePopulation = [];

xhr.onload = function () {
  console.log('hello');
  console.log(this.readyState);
  console.log(this.status);
  console.log(this.responseText);
  if (this.status == 200) {
    var object = JSON.parse(this.responseText);

    for (var i = 0; i < object.length; i++) {
      femalePopulation.push(object[i].females);
      malePopulation.push(object[i].males);
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
            .style('background-color','red')
        })
        .on('mouseout', function () {
          d3.select(this)
            .style('background-color', function (d) { return 'black'; })
        })
        .text(function(d) { return d.females; });
    }
  }
}

xhr.open('GET', URL2, true);
xhr.send();
