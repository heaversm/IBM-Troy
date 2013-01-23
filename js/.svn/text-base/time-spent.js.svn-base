var projects = IBMData.timeSpent.projects.slice(0),
    data = projects[0],
    max = 0,
    barW = 47,
    barH = 225,
    barTopperH = 8,
    hardOffset = 10,
    textH = 33,
    textOffset = -8,
    svgH = barH + textH + textOffset + 6,
    svgW = 545,
    transDuration = 1000;

for (var i=0; i < projects.length; i++) {
    if (max < d3.max(projects[i].hardware)) max = d3.max(projects[i].hardware);
    if (max < d3.max(projects[i].software)) max = d3.max(projects[i].software);
}
  
/* TODO - remove magic 42 */
var x = d3.scale.linear()
    .domain([0, data.hardware.length])
    .rangeRound([0, svgW + 42]);

var y = d3.scale.linear()
    .domain([0, max])
    .rangeRound([0, barH]);
            
var chart = d3.select('.chart .graphic').append('svg')
    .attr('width', svgW)
    .attr('height', svgH);
    
var softGroup = chart.append('g')
        .attr('id', 'software'),
    hardGroup = chart.append('g')
        .attr('id', 'hardware')
        .attr('transform', 'translate('+ (barW + hardOffset) +', 0)');

hardGroup.selectAll('path')
        .data(data.hardware)
    .enter().append('path')
        .attr('d', createPathAttr);
        
hardGroup.selectAll('text')
        .data(data.hardware)
    .enter().append('text')
        .attr('x', function(d, i) { return x(i) + barW * 0.5; }) // center text
        .attr('text-anchor', 'middle')
        .attr('y', function(d) { return svgH - y(d) + textOffset; })
        .text(String);
        
softGroup.selectAll('path')
        .data(data.software)
    .enter().append('path')
        .attr('d', createPathAttr);
        
softGroup.selectAll('text')
        .data(data.software)
    .enter().append('text')
        .attr('x', function(d, i) { return x(i) + barW * 0.5; }) // center text
        .attr('text-anchor', 'middle')
        .attr('y', function(d) { return svgH - y(d) + textOffset; })
        .text(String);
        

$('.slider').on('stop.constrained', onConstrainedStop);

function onConstrainedStop(e) {
    data = IBMData.timeSpent.projects[e.constrainedIndex];
    redraw();
}

function redraw() {
    hardGroup.selectAll('path')
            .data(data.hardware)
        .transition()
            .duration(transDuration)
            .attr('d', createPathAttr);
            
    hardGroup.selectAll('text')
            .data(data.hardware)
        .transition()
            .duration(transDuration)
            .attr('y', function(d) { return svgH - y(d) + textOffset; })
            .text(String);
            
    softGroup.selectAll('path')
            .data(data.software)
        .transition()
            .duration(transDuration)
            .attr('d', createPathAttr);
            
    softGroup.selectAll('text')
            .data(data.software)
        .transition()
            .duration(transDuration)
            .attr('y', function(d) { return svgH - y(d) + textOffset; })
            .text(String);
}

function createPathAttr(d, i) {
    return  'M '+x(i)+' '+(svgH-y(d))+' '+
            'v '+y(d)+' '+
            'h '+barW+' '+
            'v -'+(y(d)-barTopperH)+' '+
            'Z';
}