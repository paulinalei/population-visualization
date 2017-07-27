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
      // Width and height
      var w = 901;
      var h = 901;
      var barPadding = 1;
      var transformValue = 5;

      // TODO: fix scales
      var xScale = d3.scaleLinear()
        .domain(d3.extent(femalePopulation, function(d) {
          return d.age;
        }))
        .range([0, w - 1]);

      var yScale = d3.scaleLinear()
        .domain(d3.extent(femalePopulation, function(d) {
          return d.females/5000;
        }))
        .range([h - 1, 0]);

      var xAxis = d3.axisBottom(xScale)
        .ticks(4);

      var yAxis = d3.axisLeft(yScale)
        .ticks(4);

      // Create SVG element
      var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      svg.selectAll("rect")
        .data(femalePopulation)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return i * (w / femalePopulation.length) + transformValue;
        })
        .attr("y", function(d) {
          return h - (d/5000);
        })
        .attr("width", w / femalePopulation.length - barPadding)
        .attr("height", function(d) {
          return (d/5000);
        })
        .attr("fill", "teal");

      svg.selectAll("text")
        .data(femalePopulation)
        .enter()
        .append("text")
        .text(function(d) {
          return Number(Math.round((d/1000000)+"e1") + "e-1");
        })
        .attr("x", function(d, i) {
          return i * (w / femalePopulation.length) + (w / femalePopulation.length - barPadding) /2 + transformValue;
        })
        .attr("y", function(d) {
          return h - (d/5000) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "6px")
        .attr("fill", "black");

      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${transformValue}, 0)`)
        .call(xAxis);

      svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${transformValue}, 0)`)
        .call(yAxis);
    }
  }
}

xhr.open('GET', URL2, true);
xhr.send();
