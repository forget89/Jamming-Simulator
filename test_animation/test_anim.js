// d3.csv("/test_animation/oil.csv").then(function (data) {

// data.forEach(function(d) {
//     d.date = new Date(d.date); // Предполагается, что у вас есть столбец "date" со временными данными в CSV файле
//     d.value = +d.value;
// // Предполагается, что у вас есть столбец "value" с числовыми данными в CSV файле
//   });
// // Создание шкалы времени
// const xScale = d3.scaleTime()
//   .domain(d3.extent(data, function(d) { return d.date; }))
//   .range([0, chartWidth]); // Укажите ширину вашего графика

// // Создание шкалы для данных
// const yScale = d3.scaleLinear()
//   .domain([0, d3.max(data, function(d) { return d.value; })])
//   .range([chartHeight, 0]); // Укажите высоту вашего графика



// // Отображение полоски
// svg.selectAll(".bar")
//   .data(data)
//   .enter()
//   .append("rect")
//   .attr("class", "bar")
//   .attr("x", function(d) { return xScale(d.date); })
//   .attr("y", function(d) { return yScale(d.value); })
//   .attr("width", barWidth) // Ширина полоски
//   .attr("height", function(d) { return chartHeight - yScale(d.value); })
//   .attr("fill", "steelblue");


//     var chart = d3.select("#graph");
    
//     // var yScale = d3.scaleLinear()
//     //     .domain([0, d3.max(data, function(d) { return +d.oil; })])
//     //     .range([0, 0]);

//     var svg = d3.select("svg")
//     var yAxis = d3.axisLeft(yScale);
//     chart.append("g")
//         svg.selectAll("text")
//         .data(data)
//         .enter()
//         .append("text")
//         .attr("x", function(d, i) { return 50; })
//         .attr("y", function(d, i) { return 0 + i * 100; })
//         .text(function(d) { return d.oil; })
//         .style("fill", "#fff")
//         .style("font-size", "12px") 
//         .style("font-family", "Arial") 
//         .call(yAxis);

//     var rect = chart.append("rect")
//         .attr("x", 88)
//         .attr("y", 2) 
//         .attr("width", 52)
//         .attr("height", 0)
//         .style("fill", "darkorange");

//     rect.transition()
//         .attr("height", function() {
//             return +data[0].oil;})
//         .duration(100) 
//         .delay(500); 

//     svg.append("g")
//         .append("rect")
//         .attr("x", 105.5)
//         .attr("y", 0.5)
//         .attr("width", 17)
//         .attr("height", 605)
//         .attr("fill","#292e3c")
//         .attr("stroke", "white")
//         .attr("stroke-opacity", 0.72);
//     svg.append("g")
//         .append("rect")
//         .attr("x", 104.5)
//         .attr("y", 552.5)
//         .attr("width", 19)
//         .attr("height", 47)
//         .attr("fill","#3A3E4A")
//         .attr("stroke", "white");
// });

// d3.csv("/test_animation/jdi_data_daily2.csv").then(function (data) {
//     // console.log(data);

//     var chart = d3.select("#graph");
    
//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(data, function(d) { return +d.oil; })])
//         .range([0, 0]);

//     var svg = d3.select("svg")
//     var yAxis = d3.axisLeft(yScale);
//     chart.append("g")
//         svg.selectAll("text")
//         .data(data)
//         .enter()
//         .append("text")
//         .attr("x", function(d, i) { return 50; })
//         .attr("y", function(d, i) { return 0 + i * 100; })
//         .text(function(d) { return d.oil; })
//         .style("fill", "#fff")
//         .style("font-size", "12px") 
//         .style("font-family", "Arial") 
//         .call(yAxis);

//     var rect1 = chart.append("rect")
//         .attr("x", 107)
//         .attr("y", 2) 
//         .attr("width", 13.5)
//         .attr("height", 0)
//         .style("fill", "GhostWhite");

//     rect1.transition()
//         .attr("height", function() {
//             return +data[0].oil;})
//         .duration(3000) 
//         .delay(1000); 
// });
// // <path d="M106.5 0.5H121.5V605.5H106.5V0.5Z" stroke="white" stroke-opacity="0.72"/>
// // <rect x="104.5" y="552.5" width="19" height="47" fill="#3A3E4A" stroke="white"/>

d3.csv("/test_animation/oil.csv").then(function (data) {
    const chart = d3.select("#chart");
    var height = 2250;
    var svg = d3.select("svg")
    var yScale = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return +d.t; }), d3.max(data, function(d) { return +d.t; })])
        .range([height, 1]);

    var y_axis = d3.axisRight()
        .scale(yScale)
        .ticks(50, "f")
                 
    svg.append("g")
        .attr("transform", "translate(20, 0)")
        .attr("transform", "translate(20, 0)")
        .call(y_axis)
        .selectAll("text")
            .attr("dx", ".1em")
            .attr("dy", ".3em")
            .style("font-family", "Montserrat")  
            .attr("transform", "rotate(15)" )
        .style("font-size", "12px") 
        .style("color", "white")

    var rect = chart.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 1)
        .style("fill", "white");

    rect.transition()
        .attr("height", function() {
            return data[45].t}) // берет время в csv
        .duration(3000) 
        .delay(1000);

        
    })

// d3.csv("/test_animation/oil.csv").then(function (data) {
// var width = 400, height = 400;  
// var svg = d3.select("body")  
//     .append("svg")  
//     .attr("width", width)  
//     .attr("height", height);  

// var yscale = d3.scaleLinear()  
//     .domain([0, d3.max(data, function(d) { return +d.t; })])   
//     .range([height - 50, 0]);  

// var y_axis = d3.axisLeft()
//     .scale(yscale)
//     .ticks(3, "$.2f");  


// svg.append("g")  
//     .attr("transform", "translate(100, 20)")  
//     .call(y_axis) }) 

    // chart.append("g")
    //     .call(yAxis)
    //     .attr("transform", "rotate(0)") // поворот текста для вертикального положения
    //     .attr("y", 150) // сдвиг текста вверх от оси
    //     .attr("x", 150) // сдвиг текста влево от оси
    //     .style("text-anchor", "middle") // выравнивание текста по центру
    //     .style("fill", "white")
    //     .call(d3.axisLeft(y)
    //     .ticks((d3.max(data, d => d.hnkt)))
    //     .tickSize(0)
    //     .tickPadding(10))
    //     .call(g => g.select(".domain").remove()) 
    //     .selectAll(".tick text")
    //     .style("fill", "#777"); 


        // .domain([0,d3.max(data, function(d) {return +d.hnkt;})])