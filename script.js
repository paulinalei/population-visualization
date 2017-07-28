var xhr = new XMLHttpRequest();
var URL2 = 'http://api.population.io/1.0/population/2010/United%20States/';

var femalePopulation1 = [];
var malePopulation = [];

var femalePopulation = [
  {females: 5, age: 1},
  {females: 10, age: 2},
  {females: 7, age: 100},
];

xhr.onload = function () {
  console.log('hello');
  //console.log(this.readyState);
  //console.log(this.status);
  //console.log(this.responseText);
  if (this.status == 200) {
    var object = JSON.parse(this.responseText);

    for (var i = 0; i < object.length; i++) {
      femalePopulation1.push(object[i].females);
      malePopulation.push(object[i].males);
    }
    console.log(femalePopulation);
    if (femalePopulation.length > 0) {
      console.log('we in here');
      // Width and height
      var w = 500;
      var h = 500;
      var barPadding = 1;
      var transformValue = 5;

      document.getElementById("chart").setAttribute("width", w);
      document.getElementById("chart").setAttribute("height", h);

      var xScale = d3.scaleLinear()
        .domain(d3.extent(femalePopulation, function (d) {
          return d.age;
        }))
        .range([0, w]);

      var xAxis = d3.axisBottom(xScale)
        .ticks(4);

      var svg = d3.select(".chart")
        .append("svg")
          .attr("width", w)
          .attr("height", h);

      svg.append("g")
        .attr("class", "axis axis--x")
        .call(xAxis);

    }
  }
}

xhr.open('GET', URL2, true);
xhr.send();
