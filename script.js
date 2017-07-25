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
      var width = 400;
      var barHeight = 20;

      var x = d3.scaleLinear()
        .domain([0, d3.max(femalePopulation)])
        .range([0, width]);

      var chart = d3.select('.chart')
        .attr('width', width)
        .attr('height', barHeight * femalePopulation.length);

      var bar = chart.selectAll('g')
        .data(femalePopulation)
        .enter()
          .append('g')
          .attr('transform', function(d, i) {
            return 'translate(0,' + i * barHeight + ')';
          });

      bar.append('rect')
        .attr('width', x)
        .attr('height', barHeight - 1);

      bar.append('text')
        .attr('x', function(d) {
          return x(d) - 3;
        })
        .attr('y', barHeight/2)
        .attr('dy', '.35em')
        .text(function(d) {
          return d;
        });

    }
  }
}

xhr.open('GET', URL2, true);
xhr.send();
