var upgrades = IBMData.downtime.upgrades.slice(0),
    upgradeZero = [],
    categories = IBMData.downtime.categories.slice(0),
    max = 0,
    barW = 34,
    barH = 241,
    barYMargin = 10,
    arrowW = 3,
    arrowH = 21,
    barOffset = 20,
    svgW = 394,
    svgH = barH + 2,
    transDuration = 1000;
 
// Init data & scales  
for (var i=0; i < upgrades.length; i++) {
    if (max < d3.max(upgrades[i])) max = d3.max(upgrades[i]);
}

for (var i=0; i < upgrades[0].length; i++) {
    upgradeZero.push(0);
};

var x = d3.scale.ordinal()
    .domain(categories)
    .rangeRoundBands([0, svgW + barOffset]);

var y = d3.scale.linear()
    .domain([0, max])
    .rangeRound([0, barH - barYMargin]);

// Set up svg & upgrade groups
var chart = d3.select('.chart .graphic').append('svg')
    .attr('width', svgW)
    .attr('height', svgH);
    
var firstGroup = chart.append('g')
        .attr('id', 'first')
    secondGroup = chart.append('g')
        .attr('id', 'second')
        .attr('transform', 'translate('+ (barW - arrowW * 2) +', 0)');

// These are the actual 'arrow' bars that get animated
firstGroup.selectAll('path')
        .data(upgradeZero)
    .enter().append('path')
        .attr('d', createPathAttr);
        
secondGroup.selectAll('path')
        .data(upgradeZero)
    .enter().append('path')
        .attr('d', createPathAttr);

// The text labels
firstGroup.selectAll('text')
        .data(upgrades[0])
    .enter().append('text')
        .attr('x', function(d, i) { return x(i) + barW * 0.5; }) // center text
        .attr('text-anchor', 'middle')
        .attr('y', 0)
        .text(formatLabel);
        
secondGroup.selectAll('text')
        .data(upgrades[1])
    .enter().append('text')
        .attr('x', function(d, i) { return x(i) + barW * 0.5; }) // center text
        .attr('text-anchor', 'middle')
        .attr('y', 0)
        .text(formatLabel);

// These are the small rects of color directly below the category labels.
firstGroup.selectAll('rect')
        .data(upgrades[0])
    .enter().append('rect')
        .attr('x', function(d,i) { return x(i) + arrowW; })
        .attr('y', 0)
        .attr('width', barW - arrowW * 2)
        .attr('height', barYMargin/2);
        
secondGroup.selectAll('rect')
        .data(upgrades[1])
    .enter().append('rect')
        .attr('x', function(d,i) { return x(i) + arrowW; })
        .attr('y', 0)
        .attr('width', barW - arrowW * 2)
        .attr('height', barYMargin/2);

// A horizontal bar that runs across the entire chart.
chart.append('rect')
    .attr('class', 'coverup')
    .attr('x', 0)
    .attr('y', barYMargin/2)
    .attr('width', svgW)
    .attr('height', barYMargin/2);

        
$('.slider').on('stop.constrained', onConstrainedStop);
animateGroup(firstGroup, upgrades[0]);


       
function createPathAttr(d, i) {
    return  'M '+(x(i)+arrowW)+' 0 '+
            'v '+(y(d)-arrowH+barYMargin)+' '+
            'h '+(-arrowW)+' '+
            'l '+(barW/2)+' '+arrowH+' '+
            'l '+(barW/2)+' '+(-arrowH)+' '+
            'h '+(-arrowW)+' '+
            'v '+(-y(d)+arrowH-barYMargin)+' '+
            'Z';
}

function formatLabel(d, i) {
    return (d * 100) + '%';
}

function onConstrainedStop(e) {
    switch(e.constrainedIndex) {
        case(0):
            animateGroup(firstGroup, upgrades[0]);
            animateGroup(secondGroup, upgradeZero);
            break;
        case(1):
            animateGroup(firstGroup, upgradeZero);
            animateGroup(secondGroup, upgrades[1]);
            break;
        case(2):
            animateGroup(firstGroup, upgrades[0]);
            animateGroup(secondGroup, upgrades[1]);
            break;
        default:
            break;
    }
}

function animateGroup(group, data) {
    group.selectAll('path')
            .data(data)
        .transition()
            .duration(transDuration)
            .attr('d', createPathAttr);
            
    group.selectAll('text')
            .data(data)
        .transition()
            .duration(transDuration)
            .attr('y', function(d) { return y(d) - 14; });
}