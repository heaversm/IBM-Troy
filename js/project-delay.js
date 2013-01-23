var width = 720,
height = 720, //used for calculating the portion of the circle
svgWidth = 460,
svgHeight = 400, 
bgRect = 36, //width of background rectangles
bgRectSpace = 8,
rectHeight = 41,
rectTrans = 356, //MH - calculate dynamically
r = Math.min(width, height) / 1.8,
s = .09;

function pText(d){
	var pText = Math.round(d*100) + "%";
	return pText;
}

var setA_0= [.45,.45,.29];
var setA_1= [0,0,0];
var setA_2= [.45,.45,.29];

var setB_0= [0,0,0];
var setB_1= [.41,.35,.34];
var setB_2= [.41,.35,.34];

var currSetA = [];
var currSetB = [];

var currState = 0;

var arc_a = d3.svg.arc()
.startAngle(0)
.endAngle(function(d) { return d.init * .75 * Math.PI; })
.innerRadius(function(d) { return d.index * r; })
.outerRadius(function(d) { return (d.index + s) * r; });

var arc_b = d3.svg.arc()
.startAngle(0)
.endAngle(function(d) { return d.init * .75 * Math.PI; })
.innerRadius(function(d) { return d.index * r; })
.outerRadius(function(d) { return (d.index + s) * r; });

var arcBackground = d3.svg.arc()
.startAngle(0)
.endAngle(.50 * Math.PI)
.innerRadius(function(d) { return d.index * r; })
.outerRadius(function(d) { return (d.index + s) * r; });


var svg = d3.select("#chart").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
		.attr("class","svgChart")
    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    	//.attr("transform", "translate(" + 300 + "," + 360 + ")")
		

var bgBars = d3.select('.svgChart').append("g").attr("class","bgBars");
var bgArcs = bgBars.append("g").attr("class","bgArcs");
var bgRects = bgBars.append("g").attr("class","bgRects").attr("transform","translate(" + -rectTrans + ",0)"); //MH Calculate Dynamically
var dataBars = d3.select('.svgChart').append("g").attr("class","dataBars");
var dataArcs = d3.select('.dataBars').append("g").attr("class","dataArcs");
var dataRects = d3.select('.dataBars').append("g").attr("class","dataRects").attr("transform","translate(" + -rectTrans + "," + rectHeight + ") scale(1,-1)");

// Draw Background
var background_bars = bgArcs.selectAll("backgroundBars")
    .data(buildBackground)
    .enter().append("g").append("path")
    .attr("fill", "#008abf")
    .attr("d",arcBackground)
    .attr("transform", "rotate(-90)");

bgRects.selectAll("straightBars")
	.data(buildBackground)
	.enter().append("rect")
	.attr("fill","#008abf")
	.attr("width",function(d,i){ var modVal = i%2; return bgRect-modVal })
	.attr("height",rectHeight)
	.attr("x",function(d,i){ 
		
		var modVal = i%2;
		var rectX;
		rectX = (i*bgRect) + (((i-modVal)/2)*bgRectSpace);
		return rectX;
	});

dataRects.selectAll("rectBars")
	.data(buildBackground)
	.enter().append("rect")
	.attr("fill",function(d,i){ //USE FOR ALTERNATING COLORS
		var modVal = i%2;
		if(modVal ==0){
			return "#93cfeb";
		} else {
			return "#ffd74e";
		}
	})
	.attr("width",function(d,i){ var modVal = i%2; return bgRect-modVal })
	.attr("height",function(d,i){ 
		var modVal = i%2;
		if (modVal == 0){ 
			return rectHeight 
		} else {
			return 0
		}
		 
	})
	.attr("class", function(d,i){ 
		return "dataRect rect" + d.count;
	})
	.attr("x",function(d,i){ 
		
		var modVal = i%2;
		var rectX;
		rectX = (i*bgRect) + (((i-modVal)/2)*bgRectSpace);
		return rectX;
	});

// Draw Dataset A
var dataset_a = dataArcs.selectAll("datasetA")
    .data(buildDatasetA)
    .enter().append("g")
    .attr("class", "data_bar_a")

    dataset_a.append("path")
    .attr("fill", "#93cfeb")
    .attr("d", arc_a)
	.attr("class","arc arcB")
    .attr("transform", "rotate(-90)");
addText(dataset_a);

// Draw Dataset B
var dataset_b = dataArcs.selectAll("datasetB")
    .data(buildDatasetB)
    .enter().append("g")
    .attr("class","data_bar_b");

    dataset_b.append("path")
    .attr("fill", "#ffd74e")
    .attr("d", arc_b)
	.attr("class","arc arcB")
    .attr("transform", "rotate(-90)");
addText(dataset_b);



//Initialize Visualzation
init();
function init(){
animateArcs();
}


function switchGraph(state){

currState = state;

switch(currState)
{
    case 0:
    currSetA = setA_0;
    currSetB = setB_0;
    break;

    case 1:
    currSetA = setA_1;
    currSetB = setB_1;
    break;

    case 2:
    currSetA = setA_2;
    currSetB = setB_2;
    break;

    default:
    currSetA = setA_0;
    currSetB = setB_0;
    break;
}

d3.selectAll(".data_bar_a > path")
    .each(switchVal);


d3.selectAll(".data_bar_b > path")
    .each(switchVal);

      
}


function switchVal(d,i){

	if(d.type == "a")
	    d.value = currSetA[i];

	else if (d.type == "b")
	    d.value = currSetB[i];

	if(d.value == 0){
		animateBarsOut(this);
	}

	if(d.value > 0){
		animateBarsIn(this,d.count,d.value);
	}


	function animateBarsIn(obj,i,val){

		console.log("");
		var selectorString = ".rect" + i;
		d3.select(selectorString).transition().duration(200).ease("cubic-in") // Animate the Rectangle first 
		.attr("height",function(d,i){ 
			return rectHeight; 
		})
		.each("end",function(){ //Animate the Arc after the rectangle finishes animating
			d3.select(obj)
		    .transition().duration(500).ease("cubic-out")
		    .attrTween("d", tweenArc({ init : d.value }));
		});

		
	}

	function animateBarsOut(obj){
		d3.select(obj)
		    .transition().duration(500).ease("cubic-in") // Animate the Arc first 
		    .attrTween("d", tweenArc({ init : d.value }))
			.each("end",function(d,i){ //Animate the Rectangle after the arc finishes animating
					var selectorString = ".rect" + d.count;
					d3.select(selectorString).transition().duration(200).ease("cubic-out")
					.attr("height",function(d,i){ 
						return 0; 
					});
			});
		}
}



function addText(dataset){
dataset.append("text")
.attr("text-anchor", "middle")
.attr("dy", "1em")
.style("fill",function(){
    return dataset.select("path").style("fill");
})
.attr('class',function(d){
	var classString = "arcText at" + d.count;
	return classString;
})
.text(function(d) { return d.text; });

dataset.select("text")
.attr("dy", function(d) { return d.value < .5 ? "-.5em" : "1em"; }) //moves text inside bars
.attr("transform", function(d) {
    return "rotate(" + 0 * (d.value-.25) + ")" + "translate(-27," + -(((d.index + s / 2) * r)-17) + ")" + "rotate(" + (d.value < .5 ? 0 : 0) + ")" //rotate brings text to end of bar, 
})
    

}

function animateArcs() {
d3.selectAll(".data_bar_a > path")
  	.each(arcTween);

d3.selectAll(".data_bar_b > path")
  .each(arcTween);


}


function arcTween(d,i){
d3.select(this)
	.transition().duration(1000)
    .attrTween("d", tweenArc({ init : d.value }));
}

function tweenArc(b) {
return function(a) {
	var i = d3.interpolate(a, b);
	for (var key in b) a[key] = b[key]; // update data
	return function(t) {
		var count = i(t).count;
		var textString = ".arcText.at" + count;
		var textVal = i(t).init.toFixed(2);
		if(textVal > 0) d3.select(textString).text(pText(textVal));
  		else d3.select(textString).text(""); //Erase Numbers if when you hit 0%
  		return arc_a(i(t));
	};
};
}

// Data object for background bars
function buildBackground() {
    var d= [0,0,0,0,0,0];
    return [
    {value: d[0],  index: .8, text: pText(d[0]), count: 0},
    {value: d[1],  index: .712, text: pText(d[0]), count: 1},
    {value: d[2],  index: .6, text: pText(d[1]), count: 2},
    {value: d[3],  index: .512, text: pText(d[1]), count: 3},
    {value: d[4],  index: .4, text: pText(d[2]), count: 4},
    {value: d[5],  index: .312, text: pText(d[2]), count: 5},
    ];
}

// Data object for dataset a
function buildDatasetA() {
var d = [.45,.45,.29];

return [
    {value: d[0],  init:0, index: .8, text: pText(d[0]), type:"a", count: 0},
    {value: d[1],  init:0, index: .6, text: pText(d[1]), type:"a", count: 2},
    {value: d[2],  init:0, index: .4, text: pText(d[2]), type:"a", count: 4},
];
}

// Data object for dataset b
function buildDatasetB() {
var d = [0,0,0];

return [
    {value: d[0],  init:0, index: .712, text: pText(d[0]), type:"b", count: 1},
    {value: d[1],  init:0, index: .512, text: pText(d[1]), type:"b", count: 3},
    {value: d[2],  init:0, index: .312, text: pText(d[2]), type:"b", count: 5},
];
}


$('.slider').on('stop.constrained', onConstrainedStop);

function onConstrainedStop(e) {
switchGraph(parseInt(e.constrainedIndex));
}


