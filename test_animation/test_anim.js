// var svg = d3.select("svg")

    // .append("rect")
    //     .attr("width","100px")
    //     .attr("height","50px")
    //     .attr("fill","red")

d3.csv("/test_animation/jdi_data_daily.csv").then(function (data) {
    console.log(data);

    var chart = d3.select("#graph");
    
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.oil; })])
        .range([0, 0]);

    var svg = d3.select("svg")
    var yAxis = d3.axisLeft(yScale);
    chart.append("g")
        svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d, i) { return 50; })
        .attr("y", function(d, i) { return 0 + i * 100; })
        .text(function(d) { return d.oil; })
        .style("fill", "#fff")
        .style("font-size", "12px") 
        .style("font-family", "Arial") 
        .call(yAxis);

    var rect = chart.append("rect")
        .attr("x", 88)
        .attr("y", 2) 
        .attr("width", 52)
        .attr("height", 0)
        .style("fill", "darkorange");

    rect.transition()
        .attr("height", function() {
            return +data[0].oil;})
        .duration(0) 
        .delay(500); 

    svg.append("g")
        .append("rect")
        .attr("x", 105.5)
        .attr("y", 0.5)
        .attr("width", 17)
        .attr("height", 605)
        // .attr("height", function() {return +data[0].oil;})
        .attr("fill","#292e3c")
        .attr("stroke", "white")
        .attr("stroke-opacity", 0.72);
    svg.append("g")
        .append("rect")
        .attr("x", 104.5)
        .attr("y", 552.5)
        .attr("width", 19)
        .attr("height", 47)
        .attr("fill","#3A3E4A")
        .attr("stroke", "white");
});

d3.csv("/test_animation/jdi_data_daily2.csv").then(function (data) {
    console.log(data);

    var chart = d3.select("#graph");
    
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.oil; })])
        .range([0, 0]);

    var svg = d3.select("svg")
    var yAxis = d3.axisLeft(yScale);
    chart.append("g")
        svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d, i) { return 50; })
        .attr("y", function(d, i) { return 0 + i * 100; })
        .text(function(d) { return d.oil; })
        .style("fill", "#fff")
        .style("font-size", "12px") 
        .style("font-family", "Arial") 
        .call(yAxis);

    var rect1 = chart.append("rect")
        .attr("x", 107)
        .attr("y", 2) 
        .attr("width", 13.5)
        .attr("height", 0)
        .style("fill", "GhostWhite");

    rect1.transition()
        .attr("height", function() {
            return +data[0].oil;})
        .duration(1000) 
        .delay(1000); 

});
// <path d="M106.5 0.5H121.5V605.5H106.5V0.5Z" stroke="white" stroke-opacity="0.72"/>
// <rect x="104.5" y="552.5" width="19" height="47" fill="#3A3E4A" stroke="white"/>