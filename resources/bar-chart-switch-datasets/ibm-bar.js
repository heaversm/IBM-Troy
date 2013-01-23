var w = 960,
    h = 250,
    s = 10; //vertical spacing between bars
	barHeight = 20;

var chart = d3.select("#chart").append("svg")
    .attr("width", w)
    .attr("height", h)
	.attr("class","chart_svg")
  	.append("g")
	.attr("class","bars");

var hBars = d3.select('.bars')
	.append("g")
	.attr("class","hBars");
	
var sBars = d3.select('.bars')
	.append("g")
	.attr('class','sBars');

var hValArr = [114, 84, 67, 61, 53];
var sValArr = [93, 74, 57, 51, 63];

var hValArr2 = [93, 74, 57, 51, 63];
var sValArr2 = [114, 84, 67, 61, 53];

var combinedArr = hValArr.concat(sValArr);
var arrLength = hValArr.length;

var barW = d3.scale.linear()
	.domain([0, d3.max(combinedArr)])
	.range([0, w]);


function initChart(){
	buildHBars();
	buildSBars();
}

function buildHBars(){
	d3.select('.hBars').selectAll("hRect")
		.data(barData)
		.enter().append("rect")
		.attr("y", function(d, i) { return ((i+i) * barHeight) + ((i/2)*s)})
		.attr("width", function(d, i) { return barW(0) })
		.attr("height", barHeight)
		.attr("class","bar hBar")
		.style("fill", "24B0E6")
		.each(barHTween);
}

function buildSBars(){
	d3.select('.sBars').selectAll("sRect")
		.data(barData)
		.enter().append("rect")
		.attr("y", function(d, i) { return (((i+i) * barHeight) + ((i/2)*s)) + barHeight })
		.attr("width", function(d, i) { return barW(0) })
		.attr("height", barHeight)
		.attr("class","bar sBar")
		.style("fill", "FCB715")
		.each(barSTween);
}

function barHTween(d,i){

	d3.select(this)
		.transition().duration(500*(i+1)).ease("cubic-out")
	    .attr("width", function(d, i) { return barW(d.hVal) })
		.each("end", function(d,i){ 
			var barWidth = d3.select(this).attr('width');
			
			endHTween(d,i);
		});
}

function endHTween(d,i){
	console.log(d,i);
	if (i == arrLength-1){
		addTips();
	}
}

function addTips(){
	// var barWidth = d3.selectAll('.hBar').attr('width');
	// 	console.log(barWidth);
}

function barSTween(d,i){
	d3.select(this)
		.transition().duration(500*(i+1)).ease("cubic-out")
	    .attr("width", function(d, i) { return barW(d.sVal) })
}

function barData() {
	return [
	    {hVal: hValArr[0], sVal: sValArr[0], label: "Design"},
		{hVal: hValArr[1], sVal: sValArr[1], label: "Implement"},
		{hVal: hValArr[2], sVal: sValArr[2], label: "Deploy"},
		{hVal: hValArr[3], sVal: sValArr[3], label: "Training"},
		{hVal: hValArr[4], sVal: sValArr[4], label: "Troubleshoot"},
	];
}

$('.switch').click(function(){
	d3.selectAll('.hBar')
	.each(switchHVal);
	
	d3.selectAll('.sBar')
	.each(switchSVal);
	
})

function switchHVal(d,i){
	d.hVal = hValArr2[i];
	
	d3.select(this)
		.transition().duration(500*(i+1)).ease("cubic-out")
	    .attr("width", function(d, i) { return barW(d.hVal) })
		
}

function switchSVal(d,i){
	d.sVal = sValArr2[i];
	
	d3.select(this)
		.transition().duration(500*(i+1)).ease("cubic-out")
	    .attr("width", function(d, i) { return barW(d.sVal) });
}

initChart();



