var chartStyles = { hardColor: '#3197D3', softColor: '#8CC640', barTextColor: 'white' }

var w = 400,
    h = 185,
    barSpace = 23; //horiz spacing between bars
	barWidth = 40,
	transTime = 500,
	textIndent = 3,
	sTrans = barWidth + textIndent; //milliseconds for animation of bars

var metrics = IBMData.ongoingSupport.projects.slice(0),
	curDataSet = 0,
    barData = metrics[curDataSet], //get the figures we will be using for this visualization. Start with the first array, 1-2 days
	dataSets = metrics.length -1; //Total number of datasets we can switch between

var setLength = barData.hardware.length-1;
var totLength = barData.hardware.length + barData.software.length -1;
	

var maxBarHeight = 185; //stores largest of all data values (percentages) 
var maxDataVal = 0; //will hold the largest of the values in the data array

for (var i=0; i < metrics.length; i++) {
       if (maxDataVal < d3.max(metrics[i].hardware)) maxDataVal = d3.max(metrics[i].hardware);
       if (maxDataVal < d3.max(metrics[i].software)) maxDataVal = d3.max(metrics[i].software);
}

var barHeight = d3.scale.linear()
.domain([0, maxDataVal])
.range([0, maxBarHeight]); //convert data percentage into a pixel value based on largest height a bar can attain

$('.slider').on('stop.constrained', onConstrainedStop);	//called when slider reaches one of the slide options
	
	
/* BUILD STUFF */	
var chart = d3.select(".chart").append("svg")
    .attr("width", w)
    .attr("height", h)
	.attr("class","chart_svg")
  	.append("g")
	.attr("class","bars")
	.attr("transform", "translate(" + 0 + "," + maxBarHeight + ") scale(1,-1)"); //this sets the bottom of the coordinate system to the height of the bars, and flips the coordinate system so it is in the lower left
	
var hBars = d3.select('.bars')
	.append("g")
	.attr("class","hBars"); //hardware

var sBars = d3.select('.bars')
	.append("g")
	.attr('class','sBars'); //software
	

function initChart(){
	buildHBars();
	buildSBars();
}

function buildHBars(){
	d3.select('.hBars').selectAll("hRect")
		.data(barData.hardware)
		.enter().append("rect")
		.attr("x", function(d, i) { return ((i+i) * barWidth) + (i*barSpace)})
		.attr("height", function(d, i) { return barHeight(0) })
		.attr("width", barWidth)
		.attr("class","bar hBar")
		.style("fill", chartStyles.hardColor)
		.each(barIn);
		
	d3.select('.hBars').selectAll("hText")
		.data(barData.hardware)
		.enter().append("text")
		.attr("x", function(d, i) { return ((i+i) * barWidth) + (i*barSpace)})
		.attr("transform", "scale(1,-1)")
		.attr("dx","3px") //MH - Calculate dynamically
		.attr("fill", chartStyles.barTextColor)
		.attr("class", "barText hText")
		.text(function(d,i){ return d + "%" })
		.each(textIn);
}

function buildSBars(){
	d3.select('.sBars').selectAll("sRect")
		.data(barData.software)
		.enter().append("rect")
		.attr("x", function(d, i) { return (((i+i) * barWidth) + (i*barSpace)) + barWidth })
		.attr("height", function(d, i) { return barHeight(0) })
		.attr("width", barWidth)
		.attr("class","bar sBar")
		.style("fill", chartStyles.softColor)
		.each(barIn);

	d3.select('.sBars').selectAll("sText")
		.data(barData.software)
		.enter().append("text")
		.attr("x", function(d, i) { return ((i+i) * barWidth) + (i*barSpace)})
		.attr("transform", "scale(1,-1)")
		.attr("dx","44px") //MH - calculate dynamically
		.attr("fill", chartStyles.barTextColor)
		.attr("class", "barText sText")
		.text(function(d,i){ return d + "%" })
		.each(textIn);
	
}

function barIn(d,i){
	
	var curIndex = i;
	
	d3.select(this)
		.transition().duration(transTime).ease("cubic-out")
	    .attr("height", function(d, i) { return barHeight(d) })
		.each("end", function(d){ 
			if (curIndex == setLength){
				
			}
		});
}

function barOut(d,i){ 
	var curIndex = i;
	d3.select(this)
		.transition().duration(transTime).ease("cubic-out")
	    .attr("height", 0)
		.each("end", function(d,i){ 
			if (curIndex == totLength){
				switchDataSet();
			}
		});
}

function textIn(d,i){
	d3.select(this)
		.text(function(d){ return d + "%" })
		.transition().duration(transTime).ease("cubic-out")
		.attr("dy", function(d){ console.log(d,i); var textHeight = -barHeight(d); textHeight = textHeight+20; return textHeight }) 
}

function switchDataSet(){
	if (curDataSet == 0){
		curDataSet = 1;
	} else {
		curDataSet = 0;
	}
	
	barData = metrics[curDataSet];
	
	d3.selectAll('.sBars > rect')
		.data(barData.software)
		.each(barIn);
	
	d3.selectAll('.hBars > rect')
		.data(barData.hardware)
		.each(barIn);
		
	d3.selectAll('.hBars > text')
		.data(barData.hardware)
		.each(textIn);
	
	d3.selectAll('.sBars > text')
		.data(barData.software)
		.each(textIn);
}

function onConstrainedStop(e) {
	var selDataSet = parseInt(e.constrainedIndex);
	
	if (selDataSet == curDataSet){
		//Do nothing
	} else {
		switchDataSet();
	}
	
    
}

initChart();