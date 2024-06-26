d3.csv("/test_animation/levelwithoutU.csv").then(function (data) {
    const margin = ({top: 150, right: 30, bottom: 30, left: 40})
    
    data.sort(function(a, b) {
        return a.hnkt - b.hnkt})
    data.sort(function(a, b) {
        return a.hek - b.hek})
    data.sort(function(a, b) {
        return a.hnktjg - b.hnktjg})
    const maxHkp = d3.max(data, function(d) {
        return +d.hkp})
    const maxHek = d3.max(data, function(d) {
        return +d.hek})
    const maxHnkt = d3.max(data, function(d) {
        return +d.hnkt})
    const maxHkpjg = d3.max(data, function(d) {
        return +d.hkpjg})

    const chart = d3.select("#chart");
    var height = maxHkp; // сделать генерацию свг
    var svg = d3.select("#chart")

    var yScaleAllHeihgt = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return +d.height; }), d3.max(data, function(d) { return +d.height; })])
        .range([1, height+margin.top]);

    var y_axis = d3.axisRight()
        .scale(yScaleAllHeihgt)
        .ticks(30, "f")
                 
    svg.append("g") // высота скважины 
        .attr("transform", "translate(180, 0)")
        .call(y_axis)
        .selectAll("text")
            .attr("dx", ".1em")
            .attr("dy", ".3em")
            .style("font-family", "Montserrat")  
            .attr("transform", "rotate(0)" )
        .style("font-size", "12px") 
        .style("color", "white")

    var yScaleHek = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return +d.height; }), d3.max(data, function(d) { return +d.hek; })])
        .range([margin.top+maxHkp, margin.top+maxHkp+maxHek]);

    var y_axisHek = d3.axisRight()
        .scale(yScaleHek)
        .ticks(2, "f")

    svg.append("g") // высота скважины 
        .attr("transform", "translate(150, 0)")
        .call(y_axisHek)
        .selectAll("text")
            .attr("dx", ".1em")
            .attr("dy", ".3em")
            .style("font-family", "Montserrat")  
            .attr("transform", "rotate(0)" )
        .style("font-size", "12px") 
        .style("color", "white")

    for (var i = 0; i < data.length; i++) {

    svg.append("rect")
        .attr("x", 30)
        .attr("y", margin.top)
        .attr("width", 90)
        .attr("height", function(){
            return data[i].hkp; 
        })
        .style("fill", "rgb(28, 34, 28)")
    
    svg.append("rect")
        .attr("x", 30)
        .attr("y", function(){
            return margin.top+maxHkp;
        })
        .attr("width", 90)
        .attr("height", function(){
            return data[i].hek;
        })
        .style("fill", "rgb(28, 34, 28)")
        
    svg.append("rect")
        .attr("x", 60)
        .attr("y", margin.top)
        .attr("width", 30)
        .attr("height", function(){
            return data[i].hnkt; 
        })
        .style("fill", "rgb(28, 34, 28)")
        
    svg.append("rect")
        .attr("x", 28)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")

    svg.append("rect")
        .attr("x", 120)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")
    
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")

    svg.append("rect")
        .attr("x", 150)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")    
    }
    
    svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 150)
    .attr("height", 2)
    .style("fill", "white")

    svg.append("rect")
    .attr("x", 0)
    .attr("y", margin.top + maxHkp + maxHek - 2)
    .attr("width", 152)
    .attr("height", 3)
    .style("fill", "white")

    svg.append("rect")
    .attr("x", 30)
    .attr("y", margin.top + maxHkp + maxHek)
    .attr("width", 92)
    .attr("height", 70)
    .style("fill", "gray")



    

        for (var i = 0; i < data.length; i++) {
            var delay1 = i * 20;
            var delay2 = i * 50;
            var delay3 = i * 70; 


            svg.append("rect")
            .attr("x", 60)
            .attr("y", 0)
            .attr("width", 30)
            .attr("height", 0) // Начальная высота 0
            .style("stroke", "black")
            .style("fill", "rgb(100, 121, 145)")
            .transition()
            .delay(delay1) // Применяем задержку
            .duration(500) // Продолжительность анимации
            .attr("height", function() {
                return +data[i].hnktjg+margin.top; // Изменяем высоту на значение из данных
            })

            svg.append("rect")
            .attr("x", 30)
            .attr("y", function() {
                return margin.top+maxHkp ; // Начальная позиция по оси Y
            })
            .attr("width", 90)
            .attr("height", 0) // Начальная высота 0
            .style("fill", "rgb(100, 121, 145)")
            .transition()
            .delay(delay2) // Применяем задержку
            .duration(100) // Продолжительность анимации
            .attr("height", function() {
                return +data[i].hekjg; // Изменяем высоту на значение из данных
            })

            svg.append("rect")
            .attr("x", 30)
            .attr("y", function() {
                return  maxHkp - data[i].hkpjg; // Начальная позиция по оси Y
            })
            .attr("width", 30)           
            .style("fill", "rgb(100, 121, 145)")
            .transition()
            .delay(delay3) // Применяем задержку
            .duration(500) // Продолжительность анимации
            .attr("height", function() {
                return +data[i].hkpjg+margin.top; // Изменяем высоту на значение из данных
            })

            svg.append("rect")
            .attr("x", 90)
            .attr("y", function() {
                return  maxHkp- data[i].hkpjg ; // Начальная позиция по оси Y
            })
            .attr("width", 30)
            .style("fill", "rgb(100, 121, 145)")
            .transition()
            .delay(delay3) // Применяем задержку
            .duration(500) // Продолжительность анимации
            .attr("height", function() {
                return +data[i].hkpjg+margin.top; // Изменяем высоту на значение из данных
            })
            }
            
        }
    )

    d3.csv("/test_animation/levelwithoutUReserve.csv").then(function (data) {

    const margin = ({top: 200, right: 30, bottom: 30, left: 40})
    
    data.sort(function(a, b) {
        return a.hnkt - b.hnkt})
    data.sort(function(a, b) {
        return a.hek - b.hek})
    data.sort(function(a, b) {
        return a.hnktjg - b.hnktjg})
    const maxHkp = d3.max(data, function(d) {
        return +d.hkp})
    const maxHkpjg = d3.max(data, function(d) {
        return +d.hkpjg})
    const maxHnkt = d3.max(data, function(d) {
        return +d.hnkt})
    const maxHek = d3.max(data, function(d) {
        return +d.hek})

    var svg = d3.select("#chart2")

    for (var i = 0; i < data.length; i++) {
    svg.append("rect")
        .attr("x", 30)
        .attr("y", function(){
            return margin.top;
        })
        .attr("width", 90)
        .attr("height", function(){
            return data[i].hkp;    
        })
        .style("fill", "orange")
    
    svg.append("rect")
        .attr("x", 30)
        .attr("y", function(){
            return margin.top+maxHkp;
        })
        .attr("width", 90)
        .attr("height", function(){
            return data[i].hek;
        })
        .style("fill", "orange")
        

        
    svg.append("rect")
        .attr("x", 28)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return  margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")

    svg.append("rect")
        .attr("x", 120)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return  margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")
    
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return  margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")

    svg.append("rect")
        .attr("x", 150)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", function(){
            return  margin.top + maxHkp + maxHek; 
        })
        .style("fill", "white")}
    
    svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 150)
    .attr("height", 2)
    .style("fill", "white")

    svg.append("rect")
    .attr("x", 0)
    .attr("y",  margin.top + maxHkp + maxHek)
    .attr("width", 152)
    .attr("height", 3)
    .style("fill", "white")

    svg.append("rect")
    .attr("x", 30)
    .attr("y",  margin.top + maxHkp + maxHek)
    .attr("width", 92)
    .attr("height", 20)
    .style("fill", "gray")

        for (var i = 1; i < data.length; i++) {
            var delay1 = i * 10;
            var delay2 = i * 30;
            var delay3 = i * 20; //hek
            var delay4 = i * 250; //hek

                svg.append("rect")
                .attr("x", 60)
                .attr("y", function() {
                    return  maxHnkt - data[i].hnktjg ;})
                .attr("width", 30)
                .attr("height", 0)
                .style("stroke", "black")
                .style("fill", "rgb(100, 121, 145)")
                .transition()
                .delay(delay2) 
                .duration(500) 
                .attr("height", function() {
                    return data[i].hnktjg; 
                })

                svg.append("rect")
                .attr("x", 60)
                .attr("y", function() {
                    return margin.top ;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("fill", "orange")
                .transition()
                .delay(delay4)
                .duration(500)
                .attr("y", function() {
                    return margin.top + maxHkp - data[i].hnkt;
                })
                .attr("height", function() {
                    return data[i].hnkt;
                });

                svg.append("rect")
                .attr("x", 30)
                .attr("y", function() {
                    return maxHnkt;})
                .attr("width", 90)
                .attr("height", 0)
                // .style("stroke", "black")
                .style("fill", "rgb(100, 121, 145)")
                .transition()
                .delay(delay3)
                .duration(500)
                .attr("height", function() {
                    return data[i].hekjg; 
                })
                    
                svg.append("rect")
                .attr("x", 30)
                .attr("y", function() {
                    return ; 
                })
                .attr("width", 30)
                .attr("height", 0) 
                .style("fill", "rgb(100, 121, 145)")
                .transition()
                .delay(delay1)
                .duration(500)
                .attr("height", function() {
                    return data[i].hkpjg; 
                })

                svg.append("rect")
                .attr("x", 90)
                .attr("y", function() {
                    return ; })
                .attr("width", 30)
                .attr("height", 0) 
                .style("fill", "rgb(100, 121, 145)")
                .transition()
                .delay(delay1)
                .duration(500)
                .attr("height", function() {
                    return data[i].hkpjg; 
                })}})

// // // Создание данных
// // var data = [10, 20, 30, 40, 50];

// // // Создание холста для отрисовки
// // var svg = d3.select("body")
// //             .append("svg")
// //             .attr("width", 500)
// //             .attr("height", 500);

// // // Отрисовка кругов по данным
// // svg.selectAll("circle")
// //    .data(data)
// //    .enter()
// //    .append("circle")
// //    .attr("cx", function(d, i) { return 50 + i*100; })
// //    .attr("cy", 250)
// //    .attr("r", 0)
// //    .style("fill", "blue")
// //    .transition()
// //    .duration(1000)
// //    .attr("r", function(d) { return d; });

// // // Анимация по данным
// // svg.selectAll("circle")
// //    .data(data)
// //    .each(function(d, i) {
// //       d3.select(this)
// //         .transition()
// //         .delay(i*1000)
// //         .duration(1000)
// //         .attr("cy", Math.random()*500)
// //    });

 
//    // Загрузка данных из CSV файла

