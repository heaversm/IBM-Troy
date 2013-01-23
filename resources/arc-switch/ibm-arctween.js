//THIS CODE ADOPTED FROM CLOCK EXAMPLE
var w = 960,
    h = 700,
    r = Math.min(w, h) / 1.8,
    s = .09;

var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d) { return d.init * 2 * Math.PI; })
    .innerRadius(function(d) { return d.index * r; })
    .outerRadius(function(d) { return (d.index + s) * r; });

var vis = d3.select("#chart").append("svg")
    .attr("width", w)
    .attr("height", h)
  	.append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

var g;

g = vis.selectAll("g")
    .data(buildPercBars)
  	.enter().append("g")
	.attr("class", "arc");

g.append("path")
    .style("fill", "93cfeb")
    .attr("d", arc)

var newDataArr = [.23,.45];

// Generate the percentage bars
function buildPercBars() {

	return [
	    {value: .45,  index: .5, init:0},
		{value: .23,  index: .4, init:0},
	];
	
}

//THIS CODE ADOPTED FROM DONUT EXAMPLE
function selectArcs() {
  	d3.selectAll("g.arc > path")
      	.each(arcTween);
}


function arcTween(d,i){
	console.log(d,i);

	d3.select(this)
		.transition().duration(1000)
	    .attrTween("d", tweenArc({ init : d.value }));
}



function tweenArc(b) {
  	return function(a) {
    	var i = d3.interpolate(a, b);
    	for (var key in b) a[key] = b[key]; // update data
    	return function(t) {
      		return arc(i(t));
    	};
  	};
}

$('.switch').click(function(){
	d3.selectAll('g.arc > path')
	.each(switchVal);
})

function switchVal(d,i){
	d.value = newDataArr[i];
	
	d3.select(this)
		.transition().duration(500*(i+1)).ease("cubic-out")
	    .attrTween("d", tweenArc({ init : d.value }));
		
}

selectArcs();