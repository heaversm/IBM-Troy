var styleData = { textColorLabels: "white", textColorUS: "#008A52", circleColorUS: "#8CC640", textColorWorld: "#82D1F5", circleColorWorld: "#008ABF"}

var metrics = IBMData.budgetSchedule.metrics.slice(0),
    data = metrics[0]; //get the figures we will be using for this visualization

var maxRad = 100, //maximum radius a circle will be on stage
	cw = 798, //chart width
	ch = 300, //chart height
	circleOverlap = 10,
	metricTrans = 135, 
	labelTrans = "5.1em", //MH - calculate dynamically
	budgetW, scheduleW;

var maxPerc = 0; //stores largest of all data values (percentages) 

for (var i=0; i < metrics.length; i++) {
       if (maxPerc < d3.max(metrics[i].budget)) maxPerc = d3.max(metrics[i].budget);
       if (maxPerc < d3.max(metrics[i].schedule)) maxPerc = d3.max(metrics[i].schedule);
}

var tweenTime = 500; //milliseconds to animate a circle in or out

var circleRad = d3.scale.linear()
	.domain([0, maxPerc])
	.range([0, maxRad]); //convert data percentage into a pixel value based on the largest radius a circle can have to use as a baseline for scaling all other figures
	
	
var metricArray = ["budget","schedule","compare"], //metrics available to choose from
	activeMetric = 0, //used to store number of metric currently on screen
	comingMetric; //used to store the number of the metric chosen by the slider

	
$('.slider').on('stop.constrained', onConstrainedStop);	//called when slider reaches one of the slide options
               

/* BUILD SVG ELEMENT */
   var chart = d3.select('.chart').append('svg')
       .attr('class', 'svgChart')
       .attr('width', "100%")
       .attr('height', ch + ""); 

function init(){
	buildBudget()
	buildSchedule();
}

function translateCircle(d,region){
	var circleSize = circleRad(d);
	var circleTrans; //how much the circle will be moved right or left
	if (region == "world"){
		circleTrans = circleSize - (circleOverlap/2); //distance to move the circle
	} else {
		circleTrans = -circleSize + (circleOverlap/2);
	}
	return "translate(" + circleTrans + "," + -10 + ")"; //MH - don't hardcode this
}

function buildBudget(){
	var metricGroup = chart.append('g')
       		.attr('id', 'g_budget')
			.attr('class','metric')
			.attr("transform", "translate(" + cw/2 + "," + metricTrans + ")")

	var worldData = data.budget[0];
	var USData = data.budget[1];
	
	var metricWorld = metricGroup
			.append('g')
			.attr('class', 'g_world metricChild')
			.attr("transform", translateCircle(worldData,"world"))
			.append("circle")
				.attr("r", 0 )
		    	.attr('class', 'circlePath world')
				.style("fill", styleData.circleColorWorld)
				.each(function(d,i){ tweenInCircle(this,worldData, tweenTime,0,"budget","world") }); //nodeRef, data, duration, delay, metric, region
				
	var metricUS = metricGroup
			.append('g')
			.attr('class', 'g_us metricChild')
			.attr("transform", translateCircle(USData,"us"))
			.append("circle")
				.attr("r", 0 )
		    	.attr('class', 'circlePath us')
				.style("fill", styleData.circleColorUS)
				.each(function(d){ tweenInCircle(this,USData, tweenTime,0,"budget","us") }); //nodeRef, data, duration, delay, metric, region
	
	var metricLabel = d3.select('#g_budget')
			.append("text")
			.attr("text-anchor", "middle")
			.attr("fill", styleData.textColorLabels)
			.attr("dy", labelTrans) //MH - calculate dynamically
			.attr("class", "metricLabel budget")
			.text("Over Budget"); //MH - calculate dynamically
	
}

function buildSchedule(){
	
	var worldData = data.schedule[0];
	var USData = data.schedule[1];
	
	var metricGroup = chart.append('g')
       		.attr('id', 'g_schedule')
			.attr('class','metric')
			.attr("transform", "translate(" + cw/2 + "," + metricTrans + ")"); //MH - calculate dynamically

	var metricWorld = metricGroup
			.append('g')
			.attr('class', 'g_world metricChild')
			.attr("transform", translateCircle(worldData,"world"))
			.append("circle")
				.attr("r", 0 )
		    	.attr('class', 'circlePath world')
				.style("fill", styleData.circleColorWorld)
				.each(function(d){ addText(worldData, "schedule","world","hidden") }); //data, metric, region, visibility
	
	var metricUS = metricGroup
			.append('g')
			.attr('class', 'g_us metricChild')
			.attr("transform", translateCircle(USData,"us"))
			.append("circle")
				.attr("r", 0 )
		    	.attr('class', 'circlePath us')
				.style("fill", styleData.circleColorUS)
				.each(function(d){ addText(USData, "schedule","us","hidden") }); //data, metric, region
	
	var metricLabel = d3.select('#g_schedule')
			.append("text")
			.attr("text-anchor", "middle")
			.attr("fill", styleData.textColorLabels)
			.attr("dy", labelTrans) //MH - calculate dynamically
			.attr("class", "metricLabel schedule")
			.attr("visibility","hidden")
			.text("Behind Schedule"); //MH - calculate dynamically
				
}

function tweenInCircle(nodeRef,cData,dur,del,metric,region){
	
	d3.select(nodeRef)
		.transition().delay(del).duration(dur).ease("back-out")
		.attr("r", circleRad(cData))
		.each("end", function(){ addText(cData,metric,region,"visible") });
}

function addText(cData, metric,region,visibility){
	var textString = cData + "%";
	
	var nodeString = "#g_" + metric + " > .g_" + region;
	var nodeRef = d3.select(nodeString)
		.append("text")
		.attr("text-anchor", "middle")
		.attr("fill", setTextColor(region))
		.attr("dy", ".4em") //MH - calculate dynamically
		.attr("visibility",visibility)
		.attr("class", "regionText " + region)
		.text(textString);
}

function setTextColor(region){
	switch(region){
		case "us": 
			return styleData.textColorUS
			break;
		case "world": 
			return styleData.textColorWorld
			break;
	}
}

function onConstrainedStop(e) {
	
       comingMetric = parseInt(e.constrainedIndex);
	if (comingMetric == activeMetric){
		//DO NOTHING IF SLIDER IS NOT AT A NEW METRIC
	} else {
		if (activeMetric == 2){ 
			hideBothMetrics();
		} else {
			exitMetric(); 
		}
	}
}

function hideBothMetrics(){
	d3.selectAll('.metric > .metricChild > text').each(hideText);
	d3.selectAll('.metric > .metricChild > circle').each(hideAllCircles);
	d3.selectAll('.metric > .metricLabel').each(hideText);
}

function exitMetric(){ //Hide metrics and clear text
	
	var gStringLabel = "#g_" + metricArray[activeMetric] + " > .metricLabel";
	var gRefLabel = d3.selectAll(gStringLabel).each(hideText);
	
	var gStringText = "#g_" + metricArray[activeMetric] + " > .metricChild > text";
	var gRefText = d3.selectAll(gStringText)
		.each(hideText);
	
	var gStringCircle = "#g_" + metricArray[activeMetric] + " > .metricChild > circle";
	var gRefCircle = d3.selectAll(gStringCircle)
		.each(hideCircle);
}

function hideCircle(d,i){
	d3.select(this)
		.transition().delay(100).duration(500).ease("back-in")
	    .attr("r", 0)
		.each("end", function(){ evalNewMetric(i) });
}

function hideAllCircles(d,i){
	d3.select(this)
		.transition().delay(100).duration(500).ease("back-in")
	    .attr("r", 0)
		.each("end",function(){
			if (i == 0){
				centerBothMetrics();
			}
		})
}

function centerBothMetrics(){
	d3.select('#g_budget').attr("transform", "translate(" + cw/2 + "," + metricTrans + ")"); //center the element
	d3.select('#g_schedule').attr("transform", "translate(" + cw/2 + "," + metricTrans + ")"); //center the element
	activeMetric = comingMetric;
	comingMetric = null;
	openMetric();
}

function hideText(d){
	d3.select(this)
		.attr('visibility','hidden');
}

function showText(d,i){
	d3.select(this)
		.transition().delay(tweenTime)
		.attr('visibility','visible');
}

function showCircle(d,i){
	d3.select(this)
		.transition().duration(tweenTime).ease("back-out")
		.attr("r", circleRad(d));
}

function evalNewMetric(i){
	if (i == 1){ //if the last circle has been tweened out...
		activeMetric = comingMetric;
		comingMetric = null;
		openMetric();
	}
}

function openMetric(){

	switch(activeMetric){
		case 0: //budget
			d3.selectAll('#g_budget > .metricChild > circle')
				.data(data.budget)
				.attr("fnCircle",showCircle);
			d3.selectAll("#g_budget > .metricChild > text")
				.attr("fnText",showText);
			d3.selectAll("#g_budget > .metricLabel").attr("fnLabel",showText);
			break;
		case 1: //schedule
			d3.selectAll('#g_schedule > .metricChild > circle')
				.data(data.schedule)
				.attr("fnCircle",showCircle);
			d3.selectAll("#g_schedule > .metricChild > text")
				.attr("fnText",showText);
			d3.selectAll("#g_schedule > .metricLabel").attr("fnLabel",showText);
			break;
		case 2: //compare
			d3.select('#g_budget').attr("transform", "translate(" + (.25*cw) + "," + metricTrans + ")"); //MH - calculate dynamically
			d3.selectAll('#g_budget > .metricChild > circle')
				.data(data.budget)
				.attr("fnCircle",showCircle);
			d3.selectAll("#g_budget > .metricChild > text")
				.attr("fnText",showText);
			d3.selectAll("#g_budget > .metricLabel").attr("fnLabel",showText);	
			
			d3.select('#g_schedule').attr("transform", "translate(" + (.75*cw) + "," + metricTrans + ")"); //MH - calculate dynamically
			d3.selectAll('#g_schedule > .metricChild > circle')
				.data(data.schedule)
				.attr("fnCircle",showCircle);
			d3.selectAll("#g_schedule > .metricChild > text")
				.attr("fnText",showText);
			d3.selectAll("#g_schedule > .metricLabel").attr("fnLabel",showText);
			break;
	}
}

init(); //start building elements

