

function direct_animation (data) {
        // top исправить
        console.log(data)
        const margin = ({ top: 150, right: 30, bottom: 30, left: 40 })

        data.sort(function (a, b) {
            return a.hnkt - b.hnkt
        })
        data.sort(function (a, b) {
            return a.hek - b.hek
        })
        data.sort(function (a, b) {
            return a.hnktjg - b.hnktjg
        })
        const maxHkp = d3.max(data, function (d) {
            return +d.hkp
        })
        const maxHek = d3.max(data, function (d) {
            return +d.hek
        })
        const maxHnkt = d3.max(data, function (d) {
            return +d.hnkt
        })
        
        // console.log(maxHkp)
        // console.log(data)
        // for (var i = 0; i < data.length; i++) {
        //     console.log(data[i].t);
        // }
        const chart = d3.select("#chart");
        var height = maxHkp;
        var svg = d3.select("#chart")

        var yScaleAllHeihgt = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.hkp; }), d3.max(data, function (d) { return +d.height; })])
            .range([1, height + margin.top]);

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
            .attr("transform", "rotate(0)")
            .style("font-size", "12px")
            .style("color", "white")

        var yScaleHek = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.hkp; }), d3.max(data, function (d) { return +d.hek; })])
            .range([margin.top + maxHkp, margin.top + maxHkp + maxHek]);

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
            .attr("transform", "rotate(0)")
            .style("font-size", "12px")
            .style("color", "white")

        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].hnkt)
            svg.append("rect")
                .attr("x", 30)
                .attr("y", margin.top)
                .attr("width", 90)
                .attr("height", function () {
                    return data[i].hkp;
                })
                .style("fill", "rgb(184, 110, 20")

            svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return margin.top + maxHkp;
                })
                .attr("width", 90)
                .attr("height", function () {
                    return data[i].hek;
                })
                .style("fill", "rgb(184, 110, 20")

            svg.append("rect")
                .attr("x", 60)
                .attr("y", margin.top)
                .attr("width", 30)
                .attr("height", function () {
                    return data[i].hnkt;
                })
                .style("fill", "rgb(184, 110, 20")

            svg.append("rect")
                .attr("x", 28)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
                    return margin.top + maxHkp + maxHek;
                })
                .style("fill", "white")

            svg.append("rect")
                .attr("x", 120)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
                    return margin.top + maxHkp + maxHek;
                })
                .style("fill", "white")

            svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
                    return margin.top + maxHkp + maxHek;
                })
                .style("fill", "white")

            svg.append("rect")
                .attr("x", 150)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
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
            .attr("height", 20)
            .style("fill", "gray")



        for (var i = 1; i < data.length; i++) {
            var delay1 = i * 12; //hnkt зависит от каких данных, от кол ва массивов, у нас же прогоняется цикл, поэтому тут только меняя delay можно подогнать 1 время выполнения 
            var delay2 = i * 35; //hkp 
            var delay3 = i * 20; //hek
            var delay4 = i * 2000;
            // Создаем прямоугольник
            var rectAnimFirst = svg.append("rect")
                .attr("x", 60)
                .attr("y", 0)
                .attr("width", 30)
                .attr("height", 0) // Начальная высота 0
                .style("stroke", "black")
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay1) // Применяем задержку
                .duration(500) // Продолжительность анимации
                .attr("height", function () {
                    return data[i].hnktjg+margin.top    ; // Изменяем высоту на значение из данных
                })

            var rectAnimSmall = svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return margin.top + maxHkp; // Начальная позиция по оси Y
                })
                .attr("width", 90)
                .attr("height", 0) // Начальная высота 0
                .style("fill", "rgb(11, 11, 100)")
                // .style("stroke", "black")
                .transition()
                .delay(delay3) // Применяем задержку
                .duration(100) // Продолжительность анимации
                .attr("height", function () {
                    return data[i].hekjg; // Изменяем высоту на значение из данных
                })


                svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return  maxHkp - data[i].hkpjg; // Начальная позиция по оси Y
                })
                .attr("width", 30)
                .attr("height", 0) // Начальная высота 0
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay2) // Применяем задержку
                .duration(500) // Продолжительность анимации
                .attr("height", function () {
                    return  +data[i].hkpjg+margin.top; // Изменяем высоту на значение из данных
                })



                svg.append("rect")
                .attr("x", 30)
                .attr("y", function() {
                    return margin.top;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("fill", "rgb(184, 110, 20")
                .transition()
                .delay(delay4)
                .duration(1000)
                .attr("y", function() {
                    return  maxHnkt - data[i].hnkt;
                })
                .attr("height", function() {
                    return +data[i].hnkt;
                });

                svg.append("rect")
                .attr("x", 90)
                .attr("y", function() {
                    return margin.top;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("fill", "rgb(184, 110, 20")
                .transition()
                .delay(delay4)
                .duration(1000)
                .attr("y", function() {
                    return  maxHnkt - data[i].hnkt;
                })
                .attr("height", function() {
                    return +data[i].hnkt;
                });

            svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return  maxHkp - data[i].hkpjg; // Начальная позиция по оси Y
                })
                .attr("width", 30)
                .attr("height", 0) // Начальная высота 0
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay2) // Применяем задержку
                .duration(500) // Продолжительность анимации
                .attr("height", function () {
                    return  +data[i].hkpjg+margin.top; // Изменяем высоту на значение из данных
                })

            svg.append("rect")
                .attr("x", 90)
                .attr("y", function () {
                    return  maxHkp - data[i].hkpjg; // Начальная позиция по оси Y
                })
                .attr("width", 30)
                .attr("height", 0) // Начальная высота 0
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay2) // Применяем задержку
                .duration(500) // Продолжительность анимации
                .attr("height", function () {
                    return +data[i].hkpjg+margin.top; // Изменяем высоту на значение из данных
                })

        }
    }
    


function back_animation(data) {
        const margin = ({ top: 200, right: 30, bottom: 30, left: 40 })

        data.sort(function (a, b) {
            return a.hnkt - b.hnkt
        })
        data.sort(function (a, b) {
            return a.hek - b.hek
        })
        data.sort(function (a, b) {
            return a.hnktjg - b.hnktjg
        })
        const maxHkp = d3.max(data, function (d) {
            return +d.hkp
        })
        const maxHkpjg = d3.max(data, function (d) {
            return +d.hkpjg
        })
        const maxHnkt = d3.max(data, function (d) {
            return +d.hnkt
        })
        const maxHek = d3.max(data, function (d) {
            return +d.hek
        })

        var svg = d3.select("#chart2")

        var height = maxHkp; // сделать генерацию свг

        var yScaleAllHeihgt = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.hkp; }), d3.max(data, function (d) { return +d.height; })])
            .range([1, height + margin.top]);

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
            .attr("transform", "rotate(0)")
            .style("font-size", "12px")
            .style("color", "white")

            var yScaleHek = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.hkp; }), d3.max(data, function (d) { return +d.hek; })])
            .range([margin.top + maxHkp, margin.top + maxHkp + maxHek]);

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
            .attr("transform", "rotate(0)")
            .style("font-size", "12px")
            .style("color", "white")

        for (var i = 0; i < data.length; i++) {
            svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return margin.top;
                })
                .attr("width", 90)
                .attr("height", function () {
                    return data[i].hkp;
                })
                .style("fill", "rgb(184, 110, 20")

            svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return margin.top + maxHkp;
                })
                .attr("width", 90)
                .attr("height", function () {
                    return data[i].hek;
                })
                .style("fill", "rgb(184, 110, 20")

            // svg.append("rect")
            //     .attr("x", 60)
            //     .attr("y", 0)
            //     .attr("width", 30)
            //     .attr("height", function () {
            //         return data[i].hnkt;
            //     })
            //     .style("fill", "rgb(184, 110, 20")

            svg.append("rect")
                .attr("x", 28)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
                    return margin.top + maxHkp + maxHek;
                })
                .style("fill", "white")

            svg.append("rect")
                .attr("x", 120)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
                    return margin.top + maxHkp + maxHek;
                })
                .style("fill", "white")

            svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
                    return margin.top + maxHkp + maxHek;
                })
                .style("fill", "white")

            svg.append("rect")
                .attr("x", 150)
                .attr("y", 0)
                .attr("width", 2)
                .attr("height", function () {
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
            .attr("y", margin.top + maxHkp + maxHek)
            .attr("width", 152)
            .attr("height", 3)
            .style("fill", "white")

        svg.append("rect")
            .attr("x", 30)
            .attr("y", margin.top + maxHkp + maxHek)
            .attr("width", 92)
            .attr("height", 20)
            .style("fill", "gray")

        for (var i = 1; i < data.length; i++) {
            var delay1 = i * 10; //hnkt зависит от колва данных, от кол ва массивов, у нас же прогоняется цикл, поэтому тут только меняя delay можно подогнать 1 время выполнения 
            var delay2 = i * 30; //hkp
            var delay3 = i * 20; //hek
            var delay4 = i * 250; //hek

            svg.append("rect")
                .attr("x", 60)
                .attr("y", function () {
                    return maxHnkt - data[i].hnktjg;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("stroke", "black")
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay2)
                .duration(500)
                .attr("height", function () {
                    return data[i].hnktjg;
                })


                svg.append("rect")
                .attr("x", 60)
                .attr("y", function() {
                    return margin.top ;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("fill", "rgb(184, 110, 20")
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
                .attr("y", function () {
                    return maxHnkt;
                })
                .attr("width", 90)
                .attr("height", 0)
                // .style("stroke", "black")
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay3)
                .duration(500)
                .attr("height", function () {
                    return data[i].hekjg;
                })

            svg.append("rect")
                .attr("x", 30)
                .attr("y", function () {
                    return;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay1)
                .duration(500)
                .attr("height", function () {
                    return data[i].hkpjg;
                })

            svg.append("rect")
                .attr("x", 90)
                .attr("y", function () {
                    return;
                })
                .attr("width", 30)
                .attr("height", 0)
                .style("fill", "rgb(11, 11, 100)")
                .transition()
                .delay(delay1)
                .duration(500)
                .attr("height", function () {
                    return data[i].hkpjg;
                })
        }
    }




data_for_direct = [{ 't': 0, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 0, 'hekjg': 0, 'height': 1191.0932721712538 },
{ 't': 30, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 99.36833075456526, 'hkpjg': 0, 'hekjg': 0, 'height': 1191.0932721712538 },
{ 't': 60, 'hnkt': 1089.6030504613657, 'hkp': 1213.8134639045722, 'hek': 100.0, 'hnktjg': 198.73666150913053, 'hkpjg': 0, 'hekjg': 0, 'height': 1213.8134639045722 },
{ 't': 90, 'hnkt': 974.356666703196, 'hkp': 1222.777493589609, 'hek': 100.0, 'hnktjg': 298.1049922636958, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1222.777493589609 },
{ 't': 120, 'hnkt': 871.7176009465406, 'hkp': 1244.3488412761603, 'hek': 100.0, 'hnktjg': 397.47332301826106, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1244.3488412761603 },
{ 't': 150, 'hnkt': 769.7785974244869, 'hkp': 1266.620251197313, 'hek': 100.0, 'hnktjg': 496.8416537728263, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1266.620251197313 },
{ 't': 180, 'hnkt': 667.2124380727327, 'hkp': 1288.2645052887656, 'hek': 100.0, 'hnktjg': 596.2099845273916, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1288.2645052887656 },
{ 't': 210, 'hnkt': 564.621016243277, 'hkp': 1309.8834969025165, 'hek': 100.0, 'hnktjg': 695.5783152819569, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1309.8834969025165 },
{ 't': 240, 'hnkt': 462.06973036186594, 'hkp': 1331.542624464312, 'hek': 100.0, 'hnktjg': 794.9466460365221, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1331.542624464312 },
{ 't': 270, 'hnkt': 359.52804374980917, 'hkp': 1353.2113512954618, 'hek': 100.0, 'hnktjg': 894.3149767910874, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1353.2113512954618 },
{ 't': 300, 'hnkt': 256.9923299513355, 'hkp': 1374.8860509401948, 'hek': 100.0, 'hnktjg': 993.6833075456526, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1374.8860509401948 },
{ 't': 330, 'hnkt': 154.4636933334366, 'hkp': 1396.5678277655024, 'hek': 100.0, 'hnktjg': 1093.051638300218, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1396.5678277655024 },
{ 't': 360, 'hnkt': 33.68545212472736, 'hkp': 1400.0, 'hek': 100.0, 'hnktjg': 1192.4199690547832, 'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1400.0 },
{ 't': 390, 'hnkt': 0.0, 'hkp': 1381.8513906603312, 'hek': 99.84941775561741, 'hnktjg': 1210.596122441438, 'hkpjg': 18.14860933966891, 'hekjg': 0.1505822443825891, 'height': 1400.0 },
{ 't': 420, 'hnkt': 0.0, 'hkp': 1363.5876264896394, 'hek': 100.32838253879518, 'hnktjg': 1228.7722758280927, 'hkpjg': 36.41237351036052, 'hekjg': -0.32838253879518536, 'height': 1400.0 },
{ 't': 450, 'hnkt': 0.0, 'hkp': 1345.593236964658, 'hek': 99.3346865052201, 'hnktjg': 1246.9484292147474, 'hkpjg': 54.40676303534202, 'hekjg': 0.6653134947798949, 'height': 1400.0 },
{ 't': 480, 'hnkt': 0.0, 'hkp': 1327.6006122050044, 'hek': 98.33134256754306, 'hnktjg': 1265.1245826014022, 'hkpjg': 72.39938779499552, 'hekjg': 1.6686574324569456, 'height': 1400.0 },
{ 't': 510, 'hnkt': 0.0, 'hkp': 1309.6068453578487, 'hek': 97.33424237826853, 'hnktjg': 1283.3007359880569, 'hkpjg': 90.39315464215129, 'hekjg': 2.6657576217314736, 'height': 1400.0 },
{ 't': 540, 'hnkt': 0.0, 'hkp': 1291.6119555338287, 'hek': 96.34328146027461, 'hnktjg': 1301.4768893747116, 'hkpjg': 108.38804446617124, 'hekjg': 3.6567185397253943, 'height': 1400.0 },
{ 't': 570, 'hnkt': 0.0, 'hkp': 1273.6159901406413, 'hek': 95.35820063750816, 'hnktjg': 1319.6530427613664, 'hkpjg': 126.3840098593587, 'hekjg': 4.641799362491837, 'height': 1400.0 },
{ 't': 600, 'hnkt': 0.0, 'hkp': 1255.6189934287593, 'hek': 94.37875799433762, 'hnktjg': 1337.829196148021, 'hkpjg': 144.38100657124073, 'hekjg': 5.6212420056623795, 'height': 1400.0 },
{ 't': 630, 'hnkt': 0.0, 'hkp': 1237.6210065024172, 'hek': 93.40472881549516, 'hnktjg': 1356.0053495346758, 'hkpjg': 162.37899349758274, 'hekjg': 6.595271184504833, 'height': 1400.0 },
{ 't': 660, 'hnkt': 0.0, 'hkp': 1219.6220676284634, 'hek': 92.43590389759453, 'hnktjg': 1374.1815029213305, 'hkpjg': 180.37793237153662, 'hekjg': 7.564096102405475, 'height': 1400.0 },
{ 't': 690, 'hnkt': 0.0, 'hkp': 1201.6222125096717, 'hek': 91.47208805494537, 'hnktjg': 1392.3576563079853, 'hkpjg': 198.37778749032822, 'hekjg': 8.52791194505463, 'height': 1400.0 },
{ 't': 720, 'hnkt': 0.0, 'hkp': 1179.5917245501128, 'hek': 90.51309880755652, 'hnktjg': 1400.0, 'hkpjg': 220.40827544988713, 'hekjg': 9.48690119244348, 'height': 1400.0 },
{ 't': 750, 'hnkt': 0.0, 'hkp': 1157.4947956734652, 'hek': 89.85089857872384, 'hnktjg': 1400.0, 'hkpjg': 242.50520432653474, 'hekjg': 10.149101421276155, 'height': 1400.0 },
{ 't': 780, 'hnkt': 0.0, 'hkp': 1135.25110008319, 'hek': 89.84429960891788, 'hnktjg': 1400.0, 'hkpjg': 264.7488999168099, 'hekjg': 10.155700391082119, 'height': 1400.0 },
{ 't': 810, 'hnkt': 0.0, 'hkp': 1113.0058839583753, 'hek': 89.84449280835851, 'hnktjg': 1400.0, 'hkpjg': 286.9941160416248, 'hekjg': 10.155507191641487, 'height': 1400.0 },
{ 't': 840, 'hnkt': 0.0, 'hkp': 1090.7606520809313, 'hek': 89.84475637418564, 'hnktjg': 1400.0, 'hkpjg': 309.23934791906873, 'hekjg': 10.155243625814368, 'height': 1400.0 },
{ 't': 870, 'hnkt': 0.0, 'hkp': 1068.5154200402162, 'hek': 89.84502066933912, 'hnktjg': 1400.0, 'hkpjg': 331.4845799597839, 'hekjg': 10.154979330660876, 'height': 1400.0 },
{ 't': 900, 'hnkt': 0.0, 'hkp': 1046.270187997734, 'hek': 89.84528497238682, 'hnktjg': 1400.0, 'hkpjg': 353.72981200226616, 'hekjg': 10.154715027613172, 'height': 1400.0 },
{ 't': 930, 'hnkt': 0.0, 'hkp': 1024.0249559551573, 'hek': 89.84554927585481, 'hnktjg': 1400.0, 'hkpjg': 375.9750440448426, 'hekjg': 10.1544507241452, 'height': 1400.0 },
{ 't': 960, 'hnkt': 0.0, 'hkp': 1001.7797239125042, 'hek': 89.84581357966562, 'hnktjg': 1400.0, 'hkpjg': 398.2202760874958, 'hekjg': 10.154186420334389, 'height': 1400.0 },
{ 't': 990, 'hnkt': 0.0, 'hkp': 979.5344918697745, 'hek': 89.84607788381847, 'hnktjg': 1400.0, 'hkpjg': 420.46550813022554, 'hekjg': 10.153922116181533, 'height': 1400.0 },
{ 't': 1020, 'hnkt': 0.0, 'hkp': 957.289259826968, 'hek': 89.84634218831334, 'hnktjg': 1400.0, 'hkpjg': 442.710740173032, 'hekjg': 10.153657811686658, 'height': 1400.0 },
{ 't': 1050, 'hnkt': 0.0, 'hkp': 935.0440277840853, 'hek': 89.84660649315026, 'hnktjg': 1400.0, 'hkpjg': 464.95597221591476, 'hekjg': 10.153393506849742, 'height': 1400.0 },
{ 't': 1080, 'hnkt': 0.0, 'hkp': 912.7987957411258, 'hek': 89.8468707983292, 'hnktjg': 1400.0, 'hkpjg': 487.2012042588742, 'hekjg': 10.15312920167079, 'height': 1400.0 },
{ 't': 1110, 'hnkt': 0.0, 'hkp': 890.5535636980898, 'hek': 89.8471351038502, 'hnktjg': 1400.0, 'hkpjg': 509.44643630191024, 'hekjg': 10.15286489614979, 'height': 1400.0 },
{ 't': 1140, 'hnkt': 0.0, 'hkp': 868.3083316549771, 'hek': 89.84739940971325, 'hnktjg': 1400.0, 'hkpjg': 531.6916683450229, 'hekjg': 10.152600590286749, 'height': 1400.0 },
{ 't': 1170, 'hnkt': 0.0, 'hkp': 846.0630996117878, 'hek': 89.84766371591834, 'hnktjg': 1400.0, 'hkpjg': 553.9369003882122, 'hekjg': 10.152336284081663, 'height': 1400.0 },
{ 't': 1200, 'hnkt': 0.0, 'hkp': 823.8178675685222, 'hek': 89.84792802246548, 'hnktjg': 1400.0, 'hkpjg': 576.1821324314778, 'hekjg': 10.152071977534519, 'height': 1400.0 },
{ 't': 1230, 'hnkt': 0.0, 'hkp': 801.5726355251797, 'hek': 89.84819232935467, 'hnktjg': 1400.0, 'hkpjg': 598.4273644748203, 'hekjg': 10.151807670645324, 'height': 1400.0 },
{ 't': 1260, 'hnkt': 0.0, 'hkp': 779.327403481761, 'hek': 89.84845663658594, 'hnktjg': 1400.0, 'hkpjg': 620.672596518239, 'hekjg': 10.151543363414065, 'height': 1400.0 },
{ 't': 1290, 'hnkt': 0.0, 'hkp': 757.0821714382654, 'hek': 89.84872094415925, 'hnktjg': 1400.0, 'hkpjg': 642.9178285617346, 'hekjg': 10.151279055840748, 'height': 1400.0 },
{ 't': 1320, 'hnkt': 0.0, 'hkp': 734.8369393946933, 'hek': 89.84898525207463, 'hnktjg': 1400.0, 'hkpjg': 665.1630606053067, 'hekjg': 10.15101474792537, 'height': 1400.0 },
{ 't': 1350, 'hnkt': 0.0, 'hkp': 712.5917073510448, 'hek': 89.84924956033208, 'hnktjg': 1400.0, 'hkpjg': 687.4082926489552, 'hekjg': 10.150750439667918, 'height': 1400.0 },
{ 't': 1380, 'hnkt': 0.0, 'hkp': 690.3464753073196, 'hek': 89.8495138689316, 'hnktjg': 1400.0, 'hkpjg': 709.6535246926804, 'hekjg': 10.1504861310684, 'height': 1400.0 },
{ 't': 1410, 'hnkt': 0.0, 'hkp': 668.101243263518, 'hek': 89.8497781778732, 'hnktjg': 1400.0, 'hkpjg': 731.898756736482, 'hekjg': 10.1502218221268, 'height': 1400.0 },
{ 't': 1440, 'hnkt': 0.0, 'hkp': 645.8560112196394, 'hek': 89.85004248715687, 'hnktjg': 1400.0, 'hkpjg': 754.1439887803606, 'hekjg': 10.149957512843129, 'height': 1400.0 },
{ 't': 1470, 'hnkt': 0.0, 'hkp': 623.6107791756845, 'hek': 89.85030679678262, 'hnktjg': 1400.0, 'hkpjg': 776.3892208243155, 'hekjg': 10.14969320321738, 'height': 1400.0 },
{ 't': 1500, 'hnkt': 0.0, 'hkp': 601.365547131653, 'hek': 89.85057110675046, 'hnktjg': 1400.0, 'hkpjg': 798.634452868347, 'hekjg': 10.149428893249542, 'height': 1400.0 },
{ 't': 1530, 'hnkt': 0.0, 'hkp': 579.1203150875449, 'hek': 89.85083541706038, 'hnktjg': 1400.0, 'hkpjg': 820.8796849124551, 'hekjg': 10.149164582939612, 'height': 1400.0 },
{ 't': 1560, 'hnkt': 0.0, 'hkp': 556.8750830433602, 'hek': 89.8510997277124, 'hnktjg': 1400.0, 'hkpjg': 843.1249169566398, 'hekjg': 10.148900272287605, 'height': 1400.0 },
{ 't': 1590, 'hnkt': 0.0, 'hkp': 534.629850999099, 'hek': 89.8513640387065, 'hnktjg': 1400.0, 'hkpjg': 865.370149000901, 'hekjg': 10.148635961293499, 'height': 1400.0 },
{ 't': 1620, 'hnkt': 0.0, 'hkp': 512.3846189547613, 'hek': 89.85162835004272, 'hnktjg': 1400.0, 'hkpjg': 887.6153810452387, 'hekjg': 10.148371649957289, 'height': 1400.0 },
{ 't': 1650, 'hnkt': 0.0, 'hkp': 490.13938691034673, 'hek': 89.85189266172101, 'hnktjg': 1400.0, 'hkpjg': 909.8606130896533, 'hekjg': 10.148107338278985, 'height': 1400.0 },
{ 't': 1680, 'hnkt': 0.0, 'hkp': 467.89415486585574, 'hek': 89.85215697374142, 'hnktjg': 1400.0, 'hkpjg': 932.1058451341443, 'hekjg': 10.147843026258581, 'height': 1400.0 },
{ 't': 1710, 'hnkt': 0.0, 'hkp': 445.6489228212881, 'hek': 89.85242128610393, 'hnktjg': 1400.0, 'hkpjg': 954.3510771787119, 'hekjg': 10.147578713896065, 'height': 1400.0 },
{ 't': 1740, 'hnkt': 0.0, 'hkp': 423.40369077664377, 'hek': 89.85268559880856, 'hnktjg': 1400.0, 'hkpjg': 976.5963092233562, 'hekjg': 10.147314401191434, 'height': 1400.0 },
{ 't': 1770, 'hnkt': 0.0, 'hkp': 401.15845873192336, 'hek': 89.85294991185529, 'hnktjg': 1400.0, 'hkpjg': 998.8415412680766, 'hekjg': 10.147050088144704, 'height': 1400.0 },
{ 't': 1800, 'hnkt': 0.0, 'hkp': 378.91322668712576, 'hek': 89.85321422524416, 'hnktjg': 1400.0, 'hkpjg': 1021.0867733128742, 'hekjg': 10.146785774755843, 'height': 1400.0 },
{ 't': 1830, 'hnkt': 0.0, 'hkp': 356.66799464225187, 'hek': 89.85347853897512, 'hnktjg': 1400.0, 'hkpjg': 1043.3320053577481, 'hekjg': 10.146521461024877, 'height': 1400.0 },
{ 't': 1860, 'hnkt': 0.0, 'hkp': 334.42276259730124, 'hek': 89.85374285304822, 'hnktjg': 1400.0, 'hkpjg': 1065.5772374026988, 'hekjg': 10.146257146951783, 'height': 1400.0 },
{ 't': 1890, 'hnkt': 0.0, 'hkp': 312.177530552274, 'hek': 89.85400716746344, 'hnktjg': 1400.0, 'hkpjg': 1087.822469447726, 'hekjg': 10.145992832536557, 'height': 1400.0 },
{ 't': 1920, 'hnkt': 0.0, 'hkp': 289.9322985071706, 'hek': 89.8542714822208, 'hnktjg': 1400.0, 'hkpjg': 1110.0677014928294, 'hekjg': 10.145728517779206, 'height': 1400.0 },
{ 't': 1950, 'hnkt': 0.0, 'hkp': 267.6870664619903, 'hek': 89.85453579732028, 'hnktjg': 1400.0, 'hkpjg': 1132.3129335380097, 'hekjg': 10.145464202679719, 'height': 1400.0 },
{ 't': 1980, 'hnkt': 0.0, 'hkp': 245.4418344167334, 'hek': 89.8548001127619, 'hnktjg': 1400.0, 'hkpjg': 1154.5581655832666, 'hekjg': 10.1451998872381, 'height': 1400.0 },
{ 't': 2010, 'hnkt': 0.0, 'hkp': 223.19660237139988, 'hek': 89.85506442854566, 'hnktjg': 1400.0, 'hkpjg': 1176.8033976286001, 'hekjg': 10.144935571454347, 'height': 1400.0 },
{ 't': 2040, 'hnkt': 0.0, 'hkp': 200.9513703259895, 'hek': 89.85532874467155, 'hnktjg': 1400.0, 'hkpjg': 1199.0486296740105, 'hekjg': 10.144671255328447, 'height': 1400.0 },
{ 't': 2070, 'hnkt': 0.0, 'hkp': 178.70613828050296, 'hek': 89.8555930611396, 'hnktjg': 1400.0, 'hkpjg': 1221.293861719497, 'hekjg': 10.144406938860397, 'height': 1400.0 },
{ 't': 2100, 'hnkt': 0.0, 'hkp': 156.46090623493956, 'hek': 89.8558573779498, 'hnktjg': 1400.0, 'hkpjg': 1243.5390937650604, 'hekjg': 10.144142622050204, 'height': 1400.0 },
{ 't': 2130, 'hnkt': 0.0, 'hkp': 134.21567418929976, 'hek': 89.85612169510213, 'hnktjg': 1400.0, 'hkpjg': 1265.7843258107002, 'hekjg': 10.143878304897862, 'height': 1400.0 },
{ 't': 2160, 'hnkt': 0.0, 'hkp': 111.97044214358334, 'hek': 89.85638601259663, 'hnktjg': 1400.0, 'hkpjg': 1288.0295578564167, 'hekjg': 10.143613987403363, 'height': 1400.0 },
{ 't': 2190, 'hnkt': 0.0, 'hkp': 89.72521009779007, 'hek': 89.8566503304333, 'hnktjg': 1400.0, 'hkpjg': 1310.27478990221, 'hekjg': 10.143349669566708, 'height': 1400.0 },
{ 't': 2220, 'hnkt': 0.0, 'hkp': 67.47997805192063, 'hek': 89.8569146486121, 'hnktjg': 1400.0, 'hkpjg': 1332.5200219480794, 'hekjg': 10.143085351387889, 'height': 1400.0 },
{ 't': 2250, 'hnkt': 0.0, 'hkp': 45.23474600597433, 'hek': 89.8571789671331, 'hnktjg': 1400.0, 'hkpjg': 1354.7652539940257, 'hekjg': 10.1428210328669, 'height': 1400.0 },
{ 't': 2280, 'hnkt': 0.0, 'hkp': 22.98951395995141, 'hek': 89.85744328599625, 'hnktjg': 1400.0, 'hkpjg': 1377.0104860400486, 'hekjg': 10.142556714003748, 'height': 1400.0 },
{ 't': 2310, 'hnkt': 0.0, 'hkp': 0.7442819138518644, 'hek': 89.85770760520157, 'hnktjg': 1400.0, 'hkpjg': 1399.2557180861481, 'hekjg': 10.14229239479843, 'height': 1400.0 },
{ 't': 2340, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.85797192474907, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142028075250932, 'height': 1400.0 },
{ 't': 2370, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.85798341458101, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.14201658541898, 'height': 1400.0 },
{ 't': 2400, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.85798353359209, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016466407915, 'height': 1400.0 },
{ 't': 2430, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348248, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465175196, 'height': 1400.0 },
{ 't': 2460, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.85798353483757, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162433, 'height': 1400.0 },
{ 't': 2490, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162305, 'height': 1400.0 },
{ 't': 2520, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2550, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2580, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2610, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2640, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2670, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2700, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2730, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 },
{ 't': 2760, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.8579835348377, 'hnktjg': 1400.0, 'hkpjg': 1400.0, 'hekjg': 10.142016465162294, 'height': 1400.0 }
];


data_for_back = [
    {
        't': 0, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 0, 'hekjg': 0,
        'height': 1191.0932721712538
    },
    {
        't': 30, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 0,
        'hkpjg': 22.245172874063762, 'hekjg': 0, 'height': 1191.0932721712538
    },
    {
        't': 60, 'hnkt': 1213.8134639045722, 'hkp': 1186.0069978119925, 'hek': 100.0, 'hnktjg': 0,
        'hkpjg': 44.490345748127524, 'hekjg': 0, 'height': 1213.8134639045722
    },
    {
        't': 90, 'hnkt': 1233.45412113707, 'hkp': 1177.8411889519105, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 66.7355186221913, 'hekjg': 0.0, 'height': 1233.45412113707
    },
    {
        't': 120, 'hnkt': 1254.3663214820237, 'hkp': 1170.9469232042848, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 88.98069149625505, 'hekjg': 0.0, 'height': 1254.3663214820237
    },
    {
        't': 150, 'hnkt': 1275.6581300775472, 'hkp': 1164.4322657072285, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 111.22586437031882, 'hekjg': 0.0, 'height': 1275.6581300775472
    },
    {
        't': 180, 'hnkt': 1296.9371769586585, 'hkp': 1157.90484649576, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 133.4710372443826, 'hekjg': 0.0, 'height': 1296.9371769586585
    },
    {
        't': 210, 'hnkt': 1318.254462994904, 'hkp': 1151.4156664394259, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 155.71621011844636, 'hekjg': 0.0, 'height': 1318.254462994904
    },
    {
        't': 240, 'hnkt': 1339.6236109933861, 'hkp': 1144.9783483453282, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 177.9613829925101, 'hekjg': 0.0, 'height': 1339.6236109933861
    },
    {
        't': 270, 'hnkt': 1361.031674842469, 'hkp': 1138.5799461018314, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 200.20655586657386, 'hekjg': 0.0, 'height': 1361.031674842469
    },
    {
        't': 300, 'hnkt': 1382.4711811643003, 'hkp': 1132.212986331083, 'hek': 100.0, 'hnktjg': 0.0,
        'hkpjg': 222.45172874063763, 'hekjg': 0.0, 'height': 1382.4711811643003
    },
    {
        't': 330, 'hnkt': 1400.0, 'hkp': 1121.935339074203, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 244.6969016147014,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 360, 'hnkt': 1400.0, 'hkp': 1094.1288729816233, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 266.9420744887652,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 390, 'hnkt': 1400.0, 'hkp': 1066.3224068890436, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 289.1872473628289,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 420, 'hnkt': 1400.0, 'hkp': 1038.5159407964638, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 311.4324202368927,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 450, 'hnkt': 1400.0, 'hkp': 1010.7094747038841, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 333.6775931109564,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 480, 'hnkt': 1400.0, 'hkp': 982.9030086113045, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 355.9227659850202,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 510, 'hnkt': 1400.0, 'hkp': 955.0965425187247, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 378.167938859084,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 540, 'hnkt': 1400.0, 'hkp': 927.290076426145, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 400.41311173314773,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 570, 'hnkt': 1400.0, 'hkp': 899.4836103335654, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 422.6582846072115,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 600, 'hnkt': 1400.0, 'hkp': 871.6771442409856, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 444.90345748127527,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 630, 'hnkt': 1400.0, 'hkp': 843.8706781484059, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 467.148630355339,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 660, 'hnkt': 1400.0, 'hkp': 816.0642120558263, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 489.3938032294028,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 690, 'hnkt': 1400.0, 'hkp': 788.2577459632464, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 511.6389761034666,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 720, 'hnkt': 1400.0, 'hkp': 760.4512798706668, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 533.8841489775303,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 750, 'hnkt': 1400.0, 'hkp': 732.6448137780872, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 556.1293218515941,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 780, 'hnkt': 1400.0, 'hkp': 704.8383476855074, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 578.3744947256578,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 810, 'hnkt': 1400.0, 'hkp': 677.0318815929277, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 600.6196675997215,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 840, 'hnkt': 1400.0, 'hkp': 649.225415500348, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 622.8648404737854,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 870, 'hnkt': 1400.0, 'hkp': 621.4189494077683, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 645.1100133478492,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 900, 'hnkt': 1400.0, 'hkp': 593.6124833151885, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 667.3551862219128,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 930, 'hnkt': 1400.0, 'hkp': 565.806017222609, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 689.6003590959767,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 960, 'hnkt': 1400.0, 'hkp': 537.9995511300292, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 711.8455319700404,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 990, 'hnkt': 1400.0, 'hkp': 510.19308503744946, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 734.0907048441042,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1020, 'hnkt': 1400.0, 'hkp': 482.38661894486984, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 756.335877718168,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1050, 'hnkt': 1400.0, 'hkp': 454.58015285229, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 778.5810505922317,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1080, 'hnkt': 1400.0, 'hkp': 426.77368675971036, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 800.8262234662955,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1110, 'hnkt': 1400.0, 'hkp': 398.96722066713073, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 823.0713963403592,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1140, 'hnkt': 1400.0, 'hkp': 371.160754574551, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 845.316569214423,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1170, 'hnkt': 1400.0, 'hkp': 343.35428848197125, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 867.5617420884868,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1200, 'hnkt': 1400.0, 'hkp': 315.5478223893915, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 889.8069149625505,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1230, 'hnkt': 1400.0, 'hkp': 287.7413562968118, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 912.0520878366143,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1260, 'hnkt': 1400.0, 'hkp': 259.93489020423226, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 934.297260710678,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1290, 'hnkt': 1400.0, 'hkp': 232.12842411165252, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 956.5424335847418,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1320, 'hnkt': 1400.0, 'hkp': 204.32195801907278, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 978.7876064588056,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1350, 'hnkt': 1400.0, 'hkp': 176.5154919264928, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1001.0327793328693,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1380, 'hnkt': 1400.0, 'hkp': 148.7090258339133, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1023.2779522069332,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1410, 'hnkt': 1400.0, 'hkp': 120.90255974133356, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1045.5231250809968,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1440, 'hnkt': 1400.0, 'hkp': 93.09609364875405, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1067.7682979550607,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1470, 'hnkt': 1400.0, 'hkp': 65.28962755617431, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1090.0134708291243,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1500, 'hnkt': 1400.0, 'hkp': 37.48316146359434, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1112.2586437031882,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1530, 'hnkt': 1400.0, 'hkp': 9.67669537101483, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1134.5038165772519,
        'hekjg': 0.0, 'height': 1400.0
    },
    {
        't': 1560, 'hnkt': 1381.823528107789, 'hkp': 0.0, 'hek': 100.0003898080642, 'hnktjg': 18.17647189221115,
        'hkpjg': 1152.680288469463, 'hekjg': -0.0003898080642001097, 'height': 1400.0
    },
    {
        't': 1590, 'hnkt': 1364.1955322602716, 'hkp': 0.0, 'hek': 99.3295185317858, 'hnktjg': 35.80446773972837,
        'hkpjg': 1170.3082843169802, 'hekjg': 0.6704814682142047, 'height': 1400.0
    },
    {
        't': 1620, 'hnkt': 1346.945422410248, 'hkp': 0.0, 'hek': 98.19616549921346, 'hnktjg': 53.05457758975205,
        'hkpjg': 1187.5583941670038, 'hekjg': 1.803834500786531, 'height': 1400.0
    },
    {
        't': 1650, 'hnkt': 1329.6667656807033, 'hkp': 0.0, 'hek': 97.09775001676225, 'hnktjg': 70.33323431929671,
        'hkpjg': 1204.8370508965486, 'hekjg': 2.9022499832377537, 'height': 1400.0
    },
    {
        't': 1680, 'hnkt': 1312.3769772507706, 'hkp': 0.0, 'hek': 96.01295824193761, 'hnktjg': 87.62302274922948,
        'hkpjg': 1222.1268393264813, 'hekjg': 3.987041758062385, 'height': 1400.0
    },
    {
        't': 1710, 'hnkt': 1295.0763945718136, 'hkp': 0.0, 'hek': 94.94137717954939, 'hnktjg': 104.92360542818636,
        'hkpjg': 1239.4274220054383, 'hekjg': 5.058622820450606, 'height': 1400.0
    },
    {
        't': 1740, 'hnkt': 1277.7658827055689, 'hkp': 0.0, 'hek': 93.8819481101059, 'hnktjg': 122.23411729443126,
        'hkpjg': 1256.7379338716833, 'hekjg': 6.118051889894103, 'height': 1400.0
    },
    {
        't': 1770, 'hnkt': 1260.4461709032332, 'hkp': 0.0, 'hek': 92.83377852799259, 'hnktjg': 139.55382909676672,
        'hkpjg': 1274.0576456740187, 'hekjg': 7.16622147200741, 'height': 1400.0
    },
    {
        't': 1800, 'hnkt': 1243.1178988652462, 'hkp': 0.0, 'hek': 91.79608552570689, 'hnktjg': 156.88210113475384,
        'hkpjg': 1291.3859177120057, 'hekjg': 8.20391447429311, 'height': 1400.0
    },
    {
        't': 1830, 'hnkt': 1225.7816310303035, 'hkp': 0.0, 'hek': 90.76817830602064, 'hnktjg': 174.21836896969643,
        'hkpjg': 1308.7221855469484, 'hekjg': 9.231821693979356, 'height': 1400.0
    },
    {
        't': 1860, 'hnkt': 1208.4378687083943, 'hkp': 0.0, 'hek': 89.74944333277344, 'hnktjg': 191.56213129160568,
        'hkpjg': 1326.0659478688576, 'hekjg': 10.250556667226558, 'height': 1400.0
    },
    {
        't': 1890, 'hnkt': 1191.0870597561748, 'hkp': 0.0, 'hek': 88.73933248951127, 'hnktjg': 208.91294024382515,
        'hkpjg': 1343.4167568210771, 'hekjg': 11.26066751048873, 'height': 1400.0
    },
    {
        't': 1920, 'hnkt': 1173.7296064054597, 'hkp': 0.0, 'hek': 87.7373534984644, 'hnktjg': 226.2703935945404,
        'hkpjg': 1360.7742101717924, 'hekjg': 12.262646501535604, 'height': 1400.0
    },
    {
        't': 1950, 'hnkt': 1156.3658716601535, 'hkp': 0.0, 'hek': 86.74306209156066, 'hnktjg': 243.63412833984646,
        'hkpjg': 1378.1379449170986, 'hekjg': 13.256937908439347, 'height': 1400.0
    },
    {
        't': 1980, 'hnkt': 1138.9961845713087, 'hkp': 0.0, 'hek': 85.75605555446494, 'hnktjg': 261.0038154286914,
        'hkpjg': 1395.5076320059436, 'hekjg': 14.24394444553506, 'height': 1400.0
    },
    {
        't': 2010, 'hnkt': 1044.0058700538698, 'hkp': 0.0, 'hek': 84.77596735834848, 'hnktjg': 355.9941299461303,
        'hkpjg': 1400.0, 'hekjg': 15.224032641651522, 'height': 1400.0
    },
    {
        't': 2040, 'hnkt': 945.7480332480689, 'hkp': 0.0, 'hek': 84.52736571959404, 'hnktjg': 454.25196675193115,
        'hkpjg': 1400.0, 'hekjg': 15.472634280405957, 'height': 1400.0
    },
    {
        't': 2070, 'hnkt': 846.3379510309993, 'hkp': 0.0, 'hek': 84.53671244499571, 'hnktjg': 553.6620489690007,
        'hkpjg': 1400.0, 'hekjg': 15.463287555004293, 'height': 1400.0
    },
    {
        't': 2100, 'hnkt': 746.9144583126887, 'hkp': 0.0, 'hek': 84.54906132325762, 'hnktjg': 653.0855416873113,
        'hkpjg': 1400.0, 'hekjg': 15.450938676742384, 'height': 1400.0
    },
    {
        't': 2130, 'hnkt': 647.4908048363825, 'hkp': 0.0, 'hek': 84.56144618974005, 'hnktjg': 752.5091951636175,
        'hkpjg': 1400.0, 'hekjg': 15.43855381025995, 'height': 1400.0
    },
    {
        't': 2160, 'hnkt': 548.0671447628786, 'hkp': 0.0, 'hek': 84.5738325331098, 'hnktjg': 851.9328552371214,
        'hkpjg': 1400.0, 'hekjg': 15.426167466890208, 'height': 1400.0
    },
    {
        't': 2190, 'hnkt': 448.64347988316194, 'hkp': 0.0, 'hek': 84.58621995242606, 'hnktjg': 951.356520116838,
        'hkpjg': 1400.0, 'hekjg': 15.413780047573944, 'height': 1400.0
    },
    {
        't': 2220, 'hnkt': 349.21981021521356, 'hkp': 0.0, 'hek': 84.59860844366399, 'hnktjg': 1050.7801897847864,
        'hkpjg': 1400.0, 'hekjg': 15.40139155633601, 'height': 1400.0
    },
    {
        't': 2250, 'hnkt': 249.7961357563754, 'hkp': 0.0, 'hek': 84.6109980074184, 'hnktjg': 1150.2038642436246,
        'hkpjg': 1400.0, 'hekjg': 15.389001992581592, 'height': 1400.0
    },
    {
        't': 2280, 'hnkt': 150.37245650374598, 'hkp': 0.0, 'hek': 84.62338864433859, 'hnktjg': 1249.627543496254,
        'hkpjg': 1400.0, 'hekjg': 15.376611355661415, 'height': 1400.0
    },
    {
        't': 2310, 'hnkt': 50.94877245442035, 'hkp': 0.0, 'hek': 84.6357803550751, 'hnktjg': 1349.0512275455796,
        'hkpjg': 1400.0, 'hekjg': 15.364219644924903, 'height': 1400.0
    },
    {
        't': 2340, 'hnkt': -48.47491639450982, 'hkp': 0.0, 'hek': 84.64817314027928, 'hnktjg': 1448.4749163945098,
        'hkpjg': 1400.0, 'hekjg': 15.351826859720724, 'height': 1400.0
    },
    {
        't': 2370, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.66056700060311, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.339432999396895, 'height': 1400.0
    },
    {
        't': 2400, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65472830124077, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.34527169875923, 'height': 1400.0
    },
    {
        't': 2430, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466352057838, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.34533647942162, 'height': 1400.0
    },
    {
        't': 2460, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466280183401, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337198165996, 'height': 1400.0
    },
    {
        't': 2490, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.6546627938595, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206140501, 'height': 1400.0
    },
    {
        't': 2520, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377102, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.34533720622898, 'height': 1400.0
    },
    {
        't': 2550, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377004, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229958, 'height': 1400.0
    },
    {
        't': 2580, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    },
    {
        't': 2610, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    },
    {
        't': 2640, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    },
    {
        't': 2670, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    },
    {
        't': 2700, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    },
    {
        't': 2730, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    },
    {
        't': 2760, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 84.65466279377003, 'hnktjg': 1400.0, 'hkpjg': 1400.0,
        'hekjg': 15.345337206229969, 'height': 1400.0
    }]


direct_animation(data_for_direct);
back_animation(data_for_back);

new_data_direct_1 = [{
    't': 0, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 0, 'hekjg': 0,
    'height': 1191.0932721712538
},
{
    't': 30, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 99.36833075456526,
    'hkpjg': 0, 'hekjg': 0, 'height': 1191.0932721712538
},
{
    't': 60, 'hnkt': 1089.6030504613657, 'hkp': 1213.8134639045722, 'hek': 100.0, 'hnktjg': 198.73666150913053,
    'hkpjg': 0, 'hekjg': 0, 'height': 1213.8134639045722
},
{
    't': 90, 'hnkt': 974.356666703196, 'hkp': 1222.777493589609, 'hek': 100.0, 'hnktjg': 298.1049922636958,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1222.777493589609
},
{
    't': 120, 'hnkt': 871.7176009465406, 'hkp': 1244.3488412761603, 'hek': 100.0, 'hnktjg': 397.47332301826106,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1244.3488412761603
},
{
    't': 150, 'hnkt': 769.7785974244869, 'hkp': 1266.620251197313, 'hek': 100.0, 'hnktjg': 496.8416537728263,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1266.620251197313
},
{
    't': 180, 'hnkt': 667.2124380727327, 'hkp': 1288.2645052887656, 'hek': 100.0, 'hnktjg': 596.2099845273916,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1288.2645052887656
},
{
    't': 210, 'hnkt': 564.621016243277, 'hkp': 1309.8834969025165, 'hek': 100.0, 'hnktjg': 695.5783152819569,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1309.8834969025165
},
{
    't': 240, 'hnkt': 462.06973036186594, 'hkp': 1331.542624464312, 'hek': 100.0, 'hnktjg': 794.9466460365221,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1331.542624464312
},
{
    't': 270, 'hnkt': 359.52804374980917, 'hkp': 1353.2113512954618, 'hek': 100.0, 'hnktjg': 894.3149767910874,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1353.2113512954618
},
{
    't': 300, 'hnkt': 256.9923299513355, 'hkp': 1374.8860509401948, 'hek': 100.0, 'hnktjg': 993.6833075456526,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1374.8860509401948
},
{
    't': 330, 'hnkt': 154.4636933334366, 'hkp': 1396.5678277655024, 'hek': 100.0, 'hnktjg': 1093.051638300218,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1396.5678277655024
},
{
    't': 360, 'hnkt': 51.941948099515685, 'hkp': 1418.2564959747883, 'hek': 100.0, 'hnktjg': 1192.4199690547832,
    'hkpjg': 0.0, 'hekjg': 0.0, 'height': 1418.2564959747883
},
{
    't': 390, 'hnkt': 0.0, 'hkp': 1421.9495751678664, 'hek': 99.04843693338077, 'hnktjg': 1210.596122441438,
    'hkpjg': 18.002096359384463, 'hekjg': 0.9515630666192262, 'height': 1439.951671527251
},
{
    't': 420, 'hnkt': 0.0, 'hkp': 1419.7851393239, 'hek': 100.3122625024876, 'hnktjg': 1228.7722758280927,
    'hkpjg': 36.40942488225838, 'hekjg': -0.3122625024875919, 'height': 1456.1945642061585
}, {
    't': 450, 'hnkt': 0.0,
    'hkp': 1425.112739380706,
    'hek': 99.32739441935827,
    'hnktjg': 1246.9484292147474,
    'hkpjg': 54.4054291891344,
    'hekjg': 0.6726055806417359,
    'height': 1479.5181685698403
},
{
    't': 480,
    'hnkt': 0.0,
    'hkp': 1431.7857597292414,
    'hek': 98.32428740343025,
    'hnktjg': 1265.1245826014022,
    'hkpjg': 72.39809728579496,
    'hekjg': 1.6757125965697552,
    'height': 1504.1838570150362
}, {
    't': 510, 'hnkt': 0.0, 'hkp': 1441.9450436515058, 'hek': 97.32732347145294, 'hnktjg': 1283.3007359880569,
    'hkpjg': 90.39188905672187, 'hekjg': 2.672676528547062, 'height': 1532.3369327082276
}, {
    't': 540, 'hnkt': 0.0,
    'hkp': 1454.9778776220019,
    'hek': 96.33649193743909,
    'hnktjg': 1301.4768893747116,
    'hkpjg': 108.38680254726665,
    'hekjg': 3.663508062560903,
    'height': 1563.3646801692685
},
{
    't': 570, 'hnkt': 0.0, 'hkp': 1470.3575545706835, 'hek': 95.35153508004032, 'hnktjg': 1319.6530427613664,
    'hkpjg': 126.38279061582283, 'hekjg': 4.648464919959682, 'height': 1596.7403451865064
}, {
    't': 600, 'hnkt': 0.0,
    'hkp': 1487.653490770868,
    'hek': 94.37221138542864,
    'hnktjg': 1337.829196148021,
    'hkpjg': 144.37980908541414,
    'hekjg': 5.627788614571361,
    'height': 1632.0332998562822
},
{
    't': 630, 'hnkt': 0.0, 'hkp': 1506.5139219566772, 'hek': 93.39829648985979, 'hnktjg': 1356.0053495346758,
    'hkpjg': 162.37781691610562, 'hekjg': 6.601703510140207, 'height': 1668.8917388727828
}, {
    't': 660, 'hnkt': 0.0,
    'hkp': 1526.6514840846417,
    'hek': 92.42958150701861,
    'hnktjg': 1374.1815029213305,
    'hkpjg': 180.3767758990468,
    'hekjg': 7.570418492981392,
    'height': 1707.0282599836885
},
{
    't': 690, 'hnkt': 0.0, 'hkp': 1547.8314290911098, 'hek': 91.46587153819848, 'hnktjg': 1392.3576563079853,
    'hkpjg': 198.37665038395778, 'hekjg': 8.534128461801517, 'height': 1746.2080794750677
}, {
    't': 720, 'hnkt': 0.0,
    'hkp': 1569.8619966226156,
    'hek': 90.50698436392415,
    'hnktjg': 1410.53380969464,
    'hkpjg': 216.37740703980543,
    'hekjg': 9.49301563607586,
    'height': 1786.239403662421
},
{
    't': 750, 'hnkt': 0.0, 'hkp': 1565.6209853561352, 'hek': 89.55274929076054, 'hnktjg': 1428.7099630812947,
    'hkpjg': 234.37901464386482, 'hekjg': 10.447250709239462, 'height': 1800.0
}, {
    't': 780, 'hnkt': 0.0,
    'hkp': 1547.6185561048724,
    'hek': 88.60300613122297,
    'hnktjg': 1446.8861164679495,
    'hkpjg': 252.38144389512755,
    'hekjg': 11.396993868777026,
    'height': 1800.0
}, {
    't': 810,
    'hnkt': 0.0,
    'hkp': 1529.615332751318,
    'hek': 87.65760429834019,
    'hnktjg': 1465.0622698546042,
    'hkpjg': 270.3846672486819,
    'hekjg': 12.34239570165981,
    'height': 1800.0
},
{
    't': 840, 'hnkt': 0.0, 'hkp': 1511.6113412317668, 'hek': 86.71640199938538, 'hnktjg': 1483.238423241259,
    'hkpjg': 288.3886587682331, 'hekjg': 13.283598000614617, 'height': 1800.0
}, {
    't': 870, 'hnkt': 0.0,
    'hkp': 1493.6066060056273,
    'hek': 85.77926551571485,
    'hnktjg': 1501.4145766279137,
    'hkpjg': 306.39339399437256,
    'hekjg': 14.220734484285138,
    'height': 1800.0
}, {
    't': 900,
    'hnkt': 0.0,
    'hkp': 1475.6011501734245,
    'hek': 84.84606855764962,
    'hnktjg': 1519.5907300145684,
    'hkpjg': 324.3988498265755,
    'hekjg': 15.153931442350387,
    'height': 1800.0
},
{
    't': 930, 'hnkt': 0.0, 'hkp': 1457.5949955827973, 'hek': 83.91669168498589, 'hnktjg': 1537.7668834012231,
    'hkpjg': 342.40500441720263, 'hekjg': 16.083308315014108, 'height': 1800.0
}, {
    't': 960, 'hnkt': 0.0,
    'hkp': 1439.5881629239652,
    'hek': 82.99102178509226,
    'hnktjg': 1555.9430367878779,
    'hkpjg': 360.4118370760348,
    'hekjg': 17.008978214907746,
    'height': 1800.0
}, {
    't': 990,
    'hnkt': 0.0,
    'hkp': 1421.5806718159197,
    'hek': 82.06895160169614,
    'hnktjg': 1574.1191901745326,
    'hkpjg': 378.4193281840802,
    'hekjg': 17.931048398303854,
    'height': 1800.0
},
{
    't': 1020, 'hnkt': 0.0, 'hkp': 1403.5725408844323, 'hek': 81.15037930842335, 'hnktjg': 1592.2953435611873,
    'hkpjg': 396.42745911556773, 'hekjg': 18.849620691576643, 'height': 1800.0
}, {
    't': 1050, 'hnkt': 0.0,
    'hkp': 1385.5637878328123,
    'hek': 80.23520812196286,
    'hnktjg': 1610.471496947842,
    'hkpjg': 414.43621216718765,
    'hekjg': 19.764791878037144,
    'height': 1800.0
}, {
    't': 1080,
    'hnkt': 0.0,
    'hkp': 1367.554429506231,
    'hek': 79.32334595041269,
    'hnktjg': 1628.6476503344968,
    'hkpjg': 432.44557049376914,
    'hekjg': 20.67665404958731,
    'height': 1800.0
},
{
    't': 1110, 'hnkt': 0.0, 'hkp': 1349.5444819503157, 'hek': 78.41470507294359, 'hnktjg': 1646.8238037211515,
    'hkpjg': 450.4555180496843, 'hekjg': 21.585294927056406, 'height': 1800.0
}, {
    't': 1140, 'hnkt': 0.0,
    'hkp': 1331.533960464634,
    'hek': 77.50920184741072,
    'hnktjg': 1664.9999571078063,
    'hkpjg': 468.466039535366,
    'hekjg': 22.490798152589278,
    'height': 1800.0
}, {
    't': 1170,
    'hnkt': 0.0,
    'hkp': 1313.522879651602,
    'hek': 76.60675644296674,
    'hnktjg': 1683.176110494461,
    'hkpjg': 486.47712034839805,
    'hekjg': 23.393243557033262,
    'height': 1800.0
},
{
    't': 1200, 'hnkt': 0.0, 'hkp': 1295.5112534612945, 'hek': 75.70729259509145, 'hnktjg': 1701.3522638811157,
    'hkpjg': 504.48874653870564, 'hekjg': 24.292707404908548, 'height': 1800.0
}, {
    't': 1230, 'hnkt': 0.0,
    'hkp': 1277.4990952325684,
    'hek': 74.81073738076478,
    'hnktjg': 1719.5284172677705,
    'hkpjg': 522.5009047674317,
    'hekjg': 25.18926261923522,
    'height': 1800.0
}, {
    't': 1260,
    'hnkt': 0.0,
    'hkp': 1259.4864177308712,
    'hek': 73.91702101177941,
    'hnktjg': 1737.704570654425,
    'hkpjg': 540.5135822691288,
    'hekjg': 26.08297898822058,
    'height': 1800.0
},
{
    't': 1290, 'hnkt': 0.0, 'hkp': 1241.4732331830517, 'hek': 73.0260766444212, 'hnktjg': 1755.88072404108,
    'hkpjg': 558.5267668169483, 'hekjg': 26.9739233555788, 'height': 1800.0
}, {
    't': 1320, 'hnkt': 0.0,
    'hkp': 1223.4595533094675,
    'hek': 72.13784020394783,
    'hnktjg': 1774.0568774277347,
    'hkpjg': 576.5404466905325,
    'hekjg': 27.86215979605217,
    'height': 1800.0
}, {
    't': 1350,
    'hnkt': 0.0,
    'hkp': 1205.445389353638,
    'hek': 71.25225022247274,
    'hnktjg': 1792.2330308143894,
    'hkpjg': 594.554610646362,
    'hekjg': 28.74774977752726,
    'height': 1800.0
},
{
    't': 1380, 'hnkt': 0.0, 'hkp': 1183.3978905660351, 'hek': 70.36924768901284, 'hnktjg': 1800.0,
    'hkpjg': 616.6021094339649, 'hekjg': 29.630752310987162, 'height': 1800.0
}, {
    't': 1410, 'hnkt': 0.0,
    'hkp': 1161.305034244313,
    'hek': 69.68885551412814,
    'hnktjg': 1800.0,
    'hkpjg': 638.6949657556869,
    'hekjg': 30.311144485871868,
    'height': 1800.0
}, {
    't': 1440,
    'hnkt': 0.0,
    'hkp': 1139.0612659372714,
    'hek': 69.68258136731802,
    'hnktjg': 1800.0,
    'hkpjg': 660.9387340627287,
    'hekjg': 30.31741863268198,
    'height': 1800.0
},
{
    't': 1470, 'hnkt': 0.0, 'hkp': 1116.8160523863985, 'hek': 69.68276306905751, 'hnktjg': 1800.0,
    'hkpjg': 683.1839476136014, 'hekjg': 30.31723693094248, 'height': 1800.0
}, {
    't': 1500, 'hnkt': 0.0,
    'hkp': 1094.5708249950453,
    'hek': 69.68300659569073,
    'hnktjg': 1800.0,
    'hkpjg': 705.4291750049547,
    'hekjg': 30.316993404309265,
    'height': 1800.0
}, {
    't': 1530,
    'hnkt': 0.0,
    'hkp': 1072.325597471106,
    'hek': 69.6832507145803,
    'hnktjg': 1800.0,
    'hkpjg': 727.6744025288939,
    'hekjg': 30.3167492854197,
    'height': 1800.0
},
{
    't': 1560, 'hnkt': 0.0, 'hkp': 1050.0803699458552, 'hek': 69.68349483932897, 'hnktjg': 1800.0,
    'hkpjg': 749.9196300541448, 'hekjg': 30.316505160671024, 'height': 1800.0
}, {
    't': 1590, 'hnkt': 0.0,
    'hkp': 1027.8351424205498,
    'hek': 69.68373896432107,
    'hnktjg': 1800.0,
    'hkpjg': 772.1648575794502,
    'hekjg': 30.316261035678927,
    'height': 1800.0
}, {
    't': 1620,
    'hnkt': 0.0,
    'hkp': 1005.5899148952021,
    'hek': 69.68398308950282,
    'hnktjg': 1800.0,
    'hkpjg': 794.4100851047979,
    'hekjg': 30.316016910497183,
    'height': 1800.0
},
{
    't': 1650, 'hnkt': 0.0, 'hkp': 983.3446873698117, 'hek': 69.6842272148737, 'hnktjg': 1800.0,
    'hkpjg': 816.6553126301883, 'hekjg': 30.3157727851263, 'height': 1800.0
}, {
    't': 1680, 'hnkt': 0.0,
    'hkp': 961.0994598443792,
    'hek': 69.68447134043373,
    'hnktjg': 1800.0,
    'hkpjg': 838.9005401556208,
    'hekjg': 30.315528659566272,
    'height': 1800.0
}, {
    't': 1710,
    'hnkt': 0.0,
    'hkp': 938.8542323189043,
    'hek': 69.6847154661829,
    'hnktjg': 1800.0,
    'hkpjg': 861.1457676810957,
    'hekjg': 30.315284533817103,
    'height': 1800.0
},
{
    't': 1740, 'hnkt': 0.0, 'hkp': 916.6090047933869, 'hek': 69.68495959212119, 'hnktjg': 1800.0,
    'hkpjg': 883.3909952066131, 'hekjg': 30.315040407878808, 'height': 1800.0
}, {
    't': 1770, 'hnkt': 0.0,
    'hkp': 894.3637772678278,
    'hek': 69.68520371824862,
    'hnktjg': 1800.0,
    'hkpjg': 905.6362227321722,
    'hekjg': 30.314796281751384,
    'height': 1800.0
}, {
    't': 1800,
    'hnkt': 0.0,
    'hkp': 872.1185497422257,
    'hek': 69.6854478445652,
    'hnktjg': 1800.0,
    'hkpjg': 927.8814502577743,
    'hekjg': 30.314552155434797,
    'height': 1800.0
},
{
    't': 1830, 'hnkt': 0.0, 'hkp': 849.8733222165815, 'hek': 69.68569197107092, 'hnktjg': 1800.0,
    'hkpjg': 950.1266777834185, 'hekjg': 30.31430802892908, 'height': 1800.0
}, {
    't': 1860, 'hnkt': 0.0,
    'hkp': 827.628094690895,
    'hek': 69.68593609776579,
    'hnktjg': 1800.0,
    'hkpjg': 972.371905309105,
    'hekjg': 30.314063902234217,
    'height': 1800.0
}, {
    't': 1890,
    'hnkt': 0.0,
    'hkp': 805.3828671651659,
    'hek': 69.68618022464977,
    'hnktjg': 1800.0,
    'hkpjg': 994.6171328348341,
    'hekjg': 30.313819775350222,
    'height': 1800.0
},
{
    't': 1920, 'hnkt': 0.0, 'hkp': 783.1376396393948, 'hek': 69.68642435172292, 'hnktjg': 1800.0,
    'hkpjg': 1016.8623603606052, 'hekjg': 30.313575648277077, 'height': 1800.0
}, {
    't': 1950, 'hnkt': 0.0,
    'hkp': 760.8924121135813,
    'hek': 69.68666847898523,
    'hnktjg': 1800.0,
    'hkpjg': 1039.1075878864187,
    'hekjg': 30.313331521014778,
    'height': 1800.0
}, {
    't': 1980,
    'hnkt': 0.0,
    'hkp': 738.6471845877254,
    'hek': 69.68691260643665,
    'hnktjg': 1800.0,
    'hkpjg': 1061.3528154122746,
    'hekjg': 30.313087393563347,
    'height': 1800.0
},
{
    't': 2010, 'hnkt': 0.0, 'hkp': 716.401957061827, 'hek': 69.68715673407723, 'hnktjg': 1800.0,
    'hkpjg': 1083.598042938173, 'hekjg': 30.312843265922762, 'height': 1800.0
}, {
    't': 2040, 'hnkt': 0.0,
    'hkp': 694.1567295358861,
    'hek': 69.68740086190697,
    'hnktjg': 1800.0,
    'hkpjg': 1105.8432704641139,
    'hekjg': 30.312599138093038,
    'height': 1800.0
}, {
    't': 2070,
    'hnkt': 0.0,
    'hkp': 671.9115020099034,
    'hek': 69.68764498992584,
    'hnktjg': 1800.0,
    'hkpjg': 1128.0884979900966,
    'hekjg': 30.31235501007416,
    'height': 1800.0
},
{
    't': 2100, 'hnkt': 0.0, 'hkp': 649.6662744838782, 'hek': 69.68788911813388, 'hnktjg': 1800.0,
    'hkpjg': 1150.3337255161218, 'hekjg': 30.312110881866122, 'height': 1800.0
}, {
    't': 2130, 'hnkt': 0.0,
    'hkp': 627.4210469578106,
    'hek': 69.68813324653107,
    'hnktjg': 1800.0,
    'hkpjg': 1172.5789530421894,
    'hekjg': 30.311866753468927,
    'height': 1800.0
}, {
    't': 2160,
    'hnkt': 0.0,
    'hkp': 605.1758194317006,
    'hek': 69.68837737511741,
    'hnktjg': 1800.0,
    'hkpjg': 1194.8241805682994,
    'hekjg': 30.31162262488259,
    'height': 1800.0
},
{
    't': 2190, 'hnkt': 0.0, 'hkp': 582.930591905548, 'hek': 69.6886215038929, 'hnktjg': 1800.0,
    'hkpjg': 1217.069408094452, 'hekjg': 30.311378496107096, 'height': 1800.0
}, {
    't': 2220, 'hnkt': 0.0,
    'hkp': 560.6853643793536,
    'hek': 69.68886563285754,
    'hnktjg': 1800.0,
    'hkpjg': 1239.3146356206464,
    'hekjg': 30.311134367142454,
    'height': 1800.0
}, {
    't': 2250,
    'hnkt': 0.0,
    'hkp': 538.4401368531167,
    'hek': 69.68910976201136,
    'hnktjg': 1800.0,
    'hkpjg': 1261.5598631468833,
    'hekjg': 30.31089023798865,
    'height': 1800.0
},
{
    't': 2280, 'hnkt': 0.0, 'hkp': 516.1949093268372, 'hek': 69.68935389135432, 'hnktjg': 1800.0,
    'hkpjg': 1283.8050906731628, 'hekjg': 30.310646108645685, 'height': 1800.0
}, {
    't': 2310, 'hnkt': 0.0,
    'hkp': 493.94968180051546,
    'hek': 69.68959802088642,
    'hnktjg': 1800.0,
    'hkpjg': 1306.0503181994845,
    'hekjg': 30.31040197911357,
    'height': 1800.0
}, {
    't': 2340,
    'hnkt': 0.0,
    'hkp': 471.7044542741512,
    'hek': 69.68984215060772,
    'hnktjg': 1800.0,
    'hkpjg': 1328.2955457258488,
    'hekjg': 30.31015784939229,
    'height': 1800.0
},
{
    't': 2370, 'hnkt': 0.0, 'hkp': 449.4592267477449, 'hek': 69.69008628051816, 'hnktjg': 1800.0,
    'hkpjg': 1350.5407732522551, 'hekjg': 30.30991371948184, 'height': 1800.0
}, {
    't': 2400, 'hnkt': 0.0,
    'hkp': 427.21399922129604,
    'hek': 69.69033041061776,
    'hnktjg': 1800.0,
    'hkpjg': 1372.786000778704,
    'hekjg': 30.309669589382242,
    'height': 1800.0
}, {
    't': 2430,
    'hnkt': 0.0,
    'hkp': 404.9687716948049,
    'hek': 69.69057454090652,
    'hnktjg': 1800.0,
    'hkpjg': 1395.031228305195,
    'hekjg': 30.309425459093475,
    'height': 1800.0
},
{
    't': 2460, 'hnkt': 0.0, 'hkp': 382.72354416827125, 'hek': 69.69081867138446, 'hnktjg': 1800.0,
    'hkpjg': 1417.2764558317288, 'hekjg': 30.309181328615537, 'height': 1800.0
}, {
    't': 2490, 'hnkt': 0.0,
    'hkp': 360.4783166416955,
    'hek': 69.69106280205156,
    'hnktjg': 1800.0,
    'hkpjg': 1439.5216833583045,
    'hekjg': 30.308937197948445,
    'height': 1800.0
}, {
    't': 2520,
    'hnkt': 0.0,
    'hkp': 338.23308911507775,
    'hek': 69.69130693290782,
    'hnktjg': 1800.0,
    'hkpjg': 1461.7669108849223,
    'hekjg': 30.308693067092182,
    'height': 1800.0
},
{
    't': 2550, 'hnkt': 0.0, 'hkp': 315.98786158841676, 'hek': 69.69155106395326, 'hnktjg': 1800.0,
    'hkpjg': 1484.0121384115832, 'hekjg': 30.308448936046744, 'height': 1800.0
}, {
    't': 2580, 'hnkt': 0.0,
    'hkp': 293.74263406171394,
    'hek': 69.69179519518785,
    'hnktjg': 1800.0,
    'hkpjg': 1506.257365938286,
    'hekjg': 30.30820480481215,
    'height': 1800.0
}, {
    't': 2610,
    'hnkt': 0.0,
    'hkp': 271.49740653496883,
    'hek': 69.69203932661162,
    'hnktjg': 1800.0,
    'hkpjg': 1528.5025934650312,
    'hekjg': 30.30796067338838,
    'height': 1800.0
},
{
    't': 2640, 'hnkt': 0.0, 'hkp': 249.2521790081812, 'hek': 69.69228345822455, 'hnktjg': 1800.0,
    'hkpjg': 1550.7478209918188, 'hekjg': 30.30771654177545, 'height': 1800.0
}, {
    't': 2670, 'hnkt': 0.0,
    'hkp': 227.00695148135173,
    'hek': 69.69252759002666,
    'hnktjg': 1800.0,
    'hkpjg': 1572.9930485186483,
    'hekjg': 30.30747240997334,
    'height': 1800.0
}, {
    't': 2700,
    'hnkt': 0.0,
    'hkp': 204.76172395447907,
    'hek': 69.69277172201795,
    'hnktjg': 1800.0,
    'hkpjg': 1595.238276045521,
    'hekjg': 30.307228277982052,
    'height': 1800.0
},
{
    't': 2730, 'hnkt': 0.0, 'hkp': 182.51649642756456, 'hek': 69.69301585419842, 'hnktjg': 1800.0,
    'hkpjg': 1617.4835035724354, 'hekjg': 30.306984145801582, 'height': 1800.0
}, {
    't': 2760, 'hnkt': 0.0,
    'hkp': 160.27126890060754,
    'hek': 69.69325998656805,
    'hnktjg': 1800.0,
    'hkpjg': 1639.7287310993925,
    'hekjg': 30.306740013431952,
    'height': 1800.0
}, {
    't': 2790,
    'hnkt': 0.0,
    'hkp': 138.02604137360822,
    'hek': 69.69350411912686,
    'hnktjg': 1800.0,
    'hkpjg': 1661.9739586263918,
    'hekjg': 30.306495880873136,
    'height': 1800.0
},
{
    't': 2820, 'hnkt': 0.0, 'hkp': 115.78081384656707, 'hek': 69.69374825187484, 'hnktjg': 1800.0,
    'hkpjg': 1684.219186153433, 'hekjg': 30.306251748125156, 'height': 1800.0
}, {
    't': 2850, 'hnkt': 0.0,
    'hkp': 93.53558631948272,
    'hek': 69.693992384812,
    'hnktjg': 1800.0,
    'hkpjg': 1706.4644136805173,
    'hekjg': 30.30600761518799,
    'height': 1800.0
}, {
    't': 2880,
    'hnkt': 0.0,
    'hkp': 71.2903587923563,
    'hek': 69.69423651793836,
    'hnktjg': 1800.0,
    'hkpjg': 1728.7096412076437,
    'hekjg': 30.30576348206164,
    'height': 1800.0
},
{
    't': 2910, 'hnkt': 0.0, 'hkp': 49.04513126518759, 'hek': 69.6944806512539, 'hnktjg': 1800.0,
    'hkpjg': 1750.9548687348124, 'hekjg': 30.3055193487461, 'height': 1800.0
}, {
    't': 2940, 'hnkt': 0.0,
    'hkp': 26.799903737976592,
    'hek': 69.6947247847586,
    'hnktjg': 1800.0,
    'hkpjg': 1773.2000962620234,
    'hekjg': 30.30527521524139,
    'height': 1800.0
}, {
    't': 2970,
    'hnkt': 0.0,
    'hkp': 4.554676210723528,
    'hek': 69.6949689184525,
    'hnktjg': 1800.0,
    'hkpjg': 1795.4453237892765,
    'hekjg': 30.305031081547494,
    'height': 1800.0
},
{
    't': 3000, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.69521305233557, 'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.30478694766442, 'height': 1800.0
}, {
    't': 3030, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.69526489728025,
    'hnktjg': 1800.0, 'hkpjg': 1800.0, 'hekjg': 30.304735102719746,
    'height': 1800.0
}, {
    't': 3060, 'hnkt': 0.0, 'hkp': 0.0,
    'hek': 69.69526539366959, 'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734606330413,
    'height': 1800.0
}, {
    't': 3090, 'hnkt': 0.0,
    'hkp': 0.0,
    'hek': 69.69526539842225,
    'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601577746,
    'height': 1800.0
}, {
    't': 3120, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.69526539846775, 'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601532243, 'height': 1800.0
}, {
    't': 3150, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.6952653984682,
    'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
}, {
    't': 3180, 'hnkt': 0.0, 'hkp': 0.0,
    'hek': 69.6952653984682, 'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
},
{
    't': 3210, 'hnkt': 0.0,
    'hkp': 0.0,
    'hek': 69.6952653984682,
    'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
}, {
    't': 3240, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.6952653984682, 'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601531806, 'height': 1800.0
}, {
    't': 3270, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.6952653984682,
    'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
}, {
    't': 3300, 'hnkt': 0.0, 'hkp': 0.0,
    'hek': 69.6952653984682, 'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
},
{
    't': 3330, 'hnkt': 0.0,
    'hkp': 0.0,
    'hek': 69.6952653984682,
    'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
}, {
    't': 3360, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.6952653984682, 'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601531806, 'height': 1800.0
}, {
    't': 3390, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.6952653984682,
    'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
}, {
    't': 3420, 'hnkt': 0.0, 'hkp': 0.0,
    'hek': 69.6952653984682, 'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
},
{
    't': 3450, 'hnkt': 0.0,
    'hkp': 0.0,
    'hek': 69.6952653984682,
    'hnktjg': 1800.0,
    'hkpjg': 1800.0,
    'hekjg': 30.304734601531806,
    'height': 1800.0
}, {
    't': 3480, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 69.6952653984682, 'hnktjg': 1800.0, 'hkpjg': 1800.0,
    'hekjg': 30.304734601531806, 'height': 1800.0
}]

new_data_direct_2 = [{'t': 0, 'hnkt': 1100.0, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 0, 'hekjg': 0, 'height': 1100.0},
    {'t': 30, 'hnkt': 1100.0, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 99.36833075456526, 'hkpjg': 0, 'hekjg': 0,
     'height': 1100.0},
    {'t': 60, 'hnkt': 968.5202398959005, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 198.73666150913053, 'hkpjg': 0,
     'hekjg': 0, 'height': 1100.0},
    {'t': 90, 'hnkt': 837.0404797918011, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 298.1049922636958, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 120, 'hnkt': 705.5607196877016, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 397.47332301826106, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 150, 'hnkt': 574.0809595836022, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 496.8416537728263, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 180, 'hnkt': 442.6011994795027, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 596.2099845273916, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 210, 'hnkt': 311.12143937540327, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 695.5783152819569, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 240, 'hnkt': 179.64167927130381, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 794.9466460365221, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 270, 'hnkt': 48.16191916720436, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 894.3149767910874, 'hkpjg': 0.0,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 300, 'hnkt': 0.0, 'hkp': 1081.8238466133453, 'hek': 100.0, 'hnktjg': 912.4911301777421,
     'hkpjg': 18.176153386654715, 'hekjg': 0.0, 'height': 1100.0},
    {'t': 330, 'hnkt': 0.0, 'hkp': 1063.44341035363, 'hek': 101.11680660181285, 'hnktjg': 930.6672835643968,
     'hkpjg': 36.55658964637006, 'hekjg': -1.1168066018128477, 'height': 1100.0},
    {'t': 360, 'hnkt': 0.0, 'hkp': 1045.469909876968, 'hek': 100.0089109453358, 'hnktjg': 948.8434369510516,
     'hkpjg': 54.53009012303201, 'hekjg': -0.0089109453358025, 'height': 1100.0},
    {'t': 390, 'hnkt': 0.0, 'hkp': 1027.500524786748, 'hek': 98.87851662962898, 'hnktjg': 967.0195903377063,
     'hkpjg': 72.49947521325194, 'hekjg': 1.1214833703710247, 'height': 1100.0},
    {'t': 420, 'hnkt': 0.0, 'hkp': 1009.5292394021786, 'hek': 97.75851114996682, 'hnktjg': 985.195743724361,
     'hkpjg': 90.47076059782141, 'hekjg': 2.2414888500331784, 'height': 1100.0},
    {'t': 450, 'hnkt': 0.0, 'hkp': 991.5560866831017, 'hek': 96.64871431616123, 'hnktjg': 1003.3718971110158,
     'hkpjg': 108.44391331689826, 'hekjg': 3.3512856838387743, 'height': 1100.0},
    {'t': 480, 'hnkt': 0.0, 'hkp': 973.5811777732042, 'hek': 95.5485185099561, 'hnktjg': 1021.5480504976705,
     'hkpjg': 126.41882222679578, 'hekjg': 4.451481490043904, 'height': 1100.0},
    {'t': 510, 'hnkt': 0.0, 'hkp': 955.6046136459662, 'hek': 94.45737171322271, 'hnktjg': 1039.7242038843253,
     'hkpjg': 144.39538635403377, 'hekjg': 5.542628286777284, 'height': 1100.0},
    {'t': 540, 'hnkt': 0.0, 'hkp': 937.6264853810346, 'hek': 93.37477599703884, 'hnktjg': 1057.90035727098,
     'hkpjg': 162.37351461896534, 'hekjg': 6.625224002961167, 'height': 1100.0},
    {'t': 570, 'hnkt': 0.0, 'hkp': 919.6468754858183, 'hek': 92.30028029657662, 'hnktjg': 1076.0765106576348,
     'hkpjg': 180.35312451418173, 'hekjg': 7.699719703423389, 'height': 1100.0},
    {'t': 600, 'hnkt': 0.0, 'hkp': 901.6658590093757, 'hek': 91.23347432152227, 'hnktjg': 1094.2526640442895,
     'hkpjg': 198.33414099062426, 'hekjg': 8.766525678477727, 'height': 1100.0},
    {'t': 630, 'hnkt': 0.0, 'hkp': 879.657869926481, 'hek': 90.17398345831636, 'hnktjg': 1100.0,
     'hkpjg': 220.34213007351894, 'hekjg': 9.826016541683641, 'height': 1100.0},
    {'t': 660, 'hnkt': 0.0, 'hkp': 857.5388604028416, 'hek': 89.61041662945662, 'hnktjg': 1100.0,
     'hkpjg': 242.46113959715845, 'hekjg': 10.389583370543379, 'height': 1100.0},
    {'t': 690, 'hnkt': 0.0, 'hkp': 835.2954408537864, 'hek': 89.60258459414842, 'hnktjg': 1100.0,
     'hkpjg': 264.7045591462135, 'hekjg': 10.397415405851577, 'height': 1100.0},
    {'t': 720, 'hnkt': 0.0, 'hkp': 813.0502923450132, 'hek': 89.6024757553339, 'hnktjg': 1100.0,
     'hkpjg': 286.9497076549868, 'hekjg': 10.397524244666094, 'height': 1100.0},
    {'t': 750, 'hnkt': 0.0, 'hkp': 790.8051198095444, 'hek': 89.60247424284329, 'hnktjg': 1100.0,
     'hkpjg': 309.1948801904556, 'hekjg': 10.397525757156714, 'height': 1100.0},
    {'t': 780, 'hnkt': 0.0, 'hkp': 768.5599469401859, 'hek': 89.60247422182479, 'hnktjg': 1100.0,
     'hkpjg': 331.44005305981403, 'hekjg': 10.397525778175213, 'height': 1100.0},
    {'t': 810, 'hnkt': 0.0, 'hkp': 746.3147740661877, 'hek': 89.6024742215327, 'hnktjg': 1100.0,
     'hkpjg': 353.6852259338123, 'hekjg': 10.397525778467298, 'height': 1100.0},
    {'t': 840, 'hnkt': 0.0, 'hkp': 724.0696011921248, 'hek': 89.60247422152864, 'hnktjg': 1100.0,
     'hkpjg': 375.9303988078753, 'hekjg': 10.39752577847136, 'height': 1100.0},
    {'t': 870, 'hnkt': 0.0, 'hkp': 701.8244283180609, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 398.1755716819391, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 900, 'hnkt': 0.0, 'hkp': 679.5792554439972, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 420.4207445560028, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 930, 'hnkt': 0.0, 'hkp': 657.3340825699335, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 442.66591743006654, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 960, 'hnkt': 0.0, 'hkp': 635.0889096958697, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 464.9110903041303, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 990, 'hnkt': 0.0, 'hkp': 612.8437368218059, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 487.1562631781941, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1020, 'hnkt': 0.0, 'hkp': 590.598563947742, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 509.40143605225796, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1050, 'hnkt': 0.0, 'hkp': 568.3533910736784, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 531.6466089263216, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1080, 'hnkt': 0.0, 'hkp': 546.1082181996146, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 553.8917818003854, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1110, 'hnkt': 0.0, 'hkp': 523.8630453255508, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 576.1369546744492, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1140, 'hnkt': 0.0, 'hkp': 501.6178724514871, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 598.3821275485129, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1170, 'hnkt': 0.0, 'hkp': 479.3726995774232, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 620.6273004225768, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1200, 'hnkt': 0.0, 'hkp': 457.12752670335954, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 642.8724732966405, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1230, 'hnkt': 0.0, 'hkp': 434.88235382929565, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 665.1176461707043, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1260, 'hnkt': 0.0, 'hkp': 412.6371809552321, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 687.3628190447679, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1290, 'hnkt': 0.0, 'hkp': 390.3920080811681, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 709.6079919188319, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1320, 'hnkt': 0.0, 'hkp': 368.14683520710435, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 731.8531647928957, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1350, 'hnkt': 0.0, 'hkp': 345.9016623330406, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 754.0983376669594, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1380, 'hnkt': 0.0, 'hkp': 323.6564894589768, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 776.3435105410232, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1410, 'hnkt': 0.0, 'hkp': 301.41131658491327, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 798.5886834150867, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1440, 'hnkt': 0.0, 'hkp': 279.16614371084927, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 820.8338562891507, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1470, 'hnkt': 0.0, 'hkp': 256.9209708367855, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 843.0790291632145, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1500, 'hnkt': 0.0, 'hkp': 234.67579796272173, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 865.3242020372783, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1530, 'hnkt': 0.0, 'hkp': 212.43062508865796, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 887.569374911342, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1560, 'hnkt': 0.0, 'hkp': 190.1854522145942, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 909.8145477854058, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1590, 'hnkt': 0.0, 'hkp': 167.94027934053042, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 932.0597206594696, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1620, 'hnkt': 0.0, 'hkp': 145.69510646646688, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 954.3048935335331, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1650, 'hnkt': 0.0, 'hkp': 123.44993359240289, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 976.5500664075971, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1680, 'hnkt': 0.0, 'hkp': 101.20476071833912, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 998.7952392816609, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1710, 'hnkt': 0.0, 'hkp': 78.95958784427535, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 1021.0404121557247, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1740, 'hnkt': 0.0, 'hkp': 56.714414970211465, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 1043.2855850297885, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1770, 'hnkt': 0.0, 'hkp': 34.46924209614804, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 1065.530757903852, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1800, 'hnkt': 0.0, 'hkp': 12.224069222084154, 'hek': 89.60247422152858, 'hnktjg': 1100.0,
     'hkpjg': 1087.7759307779158, 'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1830, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1860, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1890, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1920, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1950, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 1980, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2010, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2040, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2070, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2100, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2130, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2160, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2190, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0},
    {'t': 2220, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 89.60247422152858, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 10.397525778471412, 'height': 1100.0}]

data_for_back_1 = [{'t': 0, 'hnkt': 1100.0, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 0, 'hekjg': 0, 'height': 1100.0},
    {'t': 30, 'hnkt': 1100.0, 'hkp': 1100.0, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 22.245172874063762, 'hekjg': 0,
     'height': 1100.0},
    {'t': 60, 'hnkt': 1100.0, 'hkp': 1070.5661756542916, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 44.490345748127524,
     'hekjg': 0, 'height': 1100.0},
    {'t': 90, 'hnkt': 1100.0, 'hkp': 1041.1323513085833, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 66.7355186221913,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 120, 'hnkt': 1100.0, 'hkp': 1011.6985269628749, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 88.98069149625505,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 150, 'hnkt': 1100.0, 'hkp': 982.2647026171666, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 111.22586437031882,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 180, 'hnkt': 1100.0, 'hkp': 952.8308782714582, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 133.4710372443826,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 210, 'hnkt': 1100.0, 'hkp': 923.3970539257498, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 155.71621011844636,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 240, 'hnkt': 1100.0, 'hkp': 893.9632295800415, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 177.9613829925101,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 270, 'hnkt': 1100.0, 'hkp': 864.5294052343331, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 200.20655586657386,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 300, 'hnkt': 1100.0, 'hkp': 835.0955808886247, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 222.45172874063763,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 330, 'hnkt': 1100.0, 'hkp': 805.6617565429164, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 244.6969016147014,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 360, 'hnkt': 1100.0, 'hkp': 776.227932197208, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 266.9420744887652,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 390, 'hnkt': 1100.0, 'hkp': 746.7941078514996, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 289.1872473628289,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 420, 'hnkt': 1100.0, 'hkp': 717.3602835057914, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 311.4324202368927,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 450, 'hnkt': 1100.0, 'hkp': 687.9264591600829, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 333.6775931109564,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 480, 'hnkt': 1100.0, 'hkp': 658.4926348143745, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 355.9227659850202,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 510, 'hnkt': 1100.0, 'hkp': 629.0588104686663, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 378.167938859084,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 540, 'hnkt': 1100.0, 'hkp': 599.6249861229578, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 400.41311173314773,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 570, 'hnkt': 1100.0, 'hkp': 570.1911617772495, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 422.6582846072115,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 600, 'hnkt': 1100.0, 'hkp': 540.757337431541, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 444.90345748127527,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 630, 'hnkt': 1100.0, 'hkp': 511.3235130858327, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 467.148630355339,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 660, 'hnkt': 1100.0, 'hkp': 481.8896887401245, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 489.3938032294028,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 690, 'hnkt': 1100.0, 'hkp': 452.45586439441604, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 511.6389761034666,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 720, 'hnkt': 1100.0, 'hkp': 423.0220400487076, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 533.8841489775303,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 750, 'hnkt': 1100.0, 'hkp': 393.58821570299926, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 556.1293218515941,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 780, 'hnkt': 1100.0, 'hkp': 364.15439135729093, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 578.3744947256578,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 810, 'hnkt': 1100.0, 'hkp': 334.7205670115826, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 600.6196675997215,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 840, 'hnkt': 1100.0, 'hkp': 305.28674266587427, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 622.8648404737854,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 870, 'hnkt': 1100.0, 'hkp': 275.8529183201658, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 645.1100133478492,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 900, 'hnkt': 1100.0, 'hkp': 246.4190939744575, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 667.3551862219128,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 930, 'hnkt': 1100.0, 'hkp': 216.98526962874905, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 689.6003590959767,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 960, 'hnkt': 1100.0, 'hkp': 187.55144528304072, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 711.8455319700404,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 990, 'hnkt': 1100.0, 'hkp': 158.1176209373324, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 734.0907048441042,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 1020, 'hnkt': 1100.0, 'hkp': 128.68379659162395, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 756.335877718168,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 1050, 'hnkt': 1100.0, 'hkp': 99.24997224591561, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 778.5810505922317,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 1080, 'hnkt': 1100.0, 'hkp': 69.81614790020717, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 800.8262234662955,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 1110, 'hnkt': 1100.0, 'hkp': 40.38232355449895, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 823.0713963403592,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 1140, 'hnkt': 1100.0, 'hkp': 10.948499208790508, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 845.316569214423,
     'hekjg': 0.0, 'height': 1100.0},
    {'t': 1170, 'hnkt': 1081.8221050071818, 'hkp': 0.0, 'hek': 100.00213149225577, 'hnktjg': 18.177894992818125,
     'hkpjg': 863.4944642072411, 'hekjg': -0.0021314922557764014, 'height': 1100.0},
    {'t': 1200, 'hnkt': 1064.4296041372556, 'hkp': 0.0, 'hek': 99.04304596205655, 'hnktjg': 35.57039586274428,
     'hkpjg': 880.8869650771672, 'hekjg': 0.9569540379434517, 'height': 1100.0},
    {'t': 1230, 'hnkt': 1047.5802472053317, 'hkp': 0.0, 'hek': 97.41922513064503, 'hnktjg': 52.41975279466823,
     'hkpjg': 897.7363220090912, 'hekjg': 2.580774869354967, 'height': 1100.0},
    {'t': 1260, 'hnkt': 1030.6141568070184, 'hkp': 0.0, 'hek': 95.93827039883028, 'hnktjg': 69.38584319298162,
     'hkpjg': 914.7024124074046, 'hekjg': 4.061729601169714, 'height': 1100.0},
    {'t': 1290, 'hnkt': 1013.5938556275903, 'hkp': 0.0, 'hek': 94.52366238911213, 'hnktjg': 86.40614437240967,
     'hkpjg': 931.7227135868327, 'hekjg': 5.476337610887866, 'height': 1100.0},
    {'t': 1320, 'hnkt': 996.5304038005394, 'hkp': 0.0, 'hek': 93.16186498214269, 'hnktjg': 103.46959619946065,
     'hkpjg': 948.7861654138837, 'hekjg': 6.838135017857317, 'height': 1100.0},
    {'t': 1350, 'hnkt': 979.4324072039321, 'hkp': 0.0, 'hek': 91.84234573790255, 'hnktjg': 120.56759279606781,
     'hkpjg': 965.8841620104909, 'hekjg': 8.157654262097456, 'height': 1100.0},
    {'t': 1380, 'hnkt': 962.3057720176104, 'hkp': 0.0, 'hek': 90.55787628475487, 'hnktjg': 137.6942279823896,
     'hkpjg': 983.0107971968126, 'hekjg': 9.44212371524513, 'height': 1100.0},
    {'t': 1410, 'hnkt': 945.1548196311644, 'hkp': 0.0, 'hek': 89.3031678216844, 'hnktjg': 154.84518036883566,
     'hkpjg': 1000.1617495832587, 'hekjg': 10.696832178315605, 'height': 1100.0},
    {'t': 1440, 'hnkt': 927.9828318962706, 'hkp': 0.0, 'hek': 88.07420380259654, 'hnktjg': 172.01716810372946,
     'hkpjg': 1017.3337373181525, 'hekjg': 11.925796197403464, 'height': 1100.0},
    {'t': 1470, 'hnkt': 910.7923767195346, 'hkp': 0.0, 'hek': 86.86784145436752, 'hnktjg': 189.20762328046544,
     'hkpjg': 1034.5241924948884, 'hekjg': 13.132158545632482, 'height': 1100.0},
    {'t': 1500, 'hnkt': 893.5855120417303, 'hkp': 0.0, 'hek': 85.6815621336235, 'hnktjg': 206.41448795826966,
     'hkpjg': 1051.7310571726925, 'hekjg': 14.3184378663765, 'height': 1100.0},
    {'t': 1530, 'hnkt': 876.3639198494063, 'hkp': 0.0, 'hek': 84.51330731451812, 'hnktjg': 223.63608015059364,
     'hkpjg': 1068.9526493650164, 'hekjg': 15.486692685481886, 'height': 1100.0},
    {'t': 1560, 'hnkt': 859.1289976340381, 'hkp': 0.0, 'hek': 83.36136665500017, 'hnktjg': 240.8710023659619,
     'hkpjg': 1086.1875715803847, 'hekjg': 16.638633344999832, 'height': 1100.0},
    {'t': 1590, 'hnkt': 764.8399036671448, 'hkp': 0.0, 'hek': 82.22429914513977, 'hnktjg': 335.16009633285523,
     'hkpjg': 1100.0, 'hekjg': 17.775700854860233, 'height': 1100.0},
    {'t': 1620, 'hnkt': 669.5063338618966, 'hkp': 0.0, 'hek': 81.32105407559385, 'hnktjg': 430.49366613810344,
     'hkpjg': 1100.0, 'hekjg': 18.678945924406158, 'height': 1100.0},
    {'t': 1650, 'hnkt': 570.2005680465624, 'hkp': 0.0, 'hek': 81.30704792415209, 'hnktjg': 529.7994319534376,
     'hkpjg': 1100.0, 'hekjg': 18.692952075847913, 'height': 1100.0},
    {'t': 1680, 'hnkt': 470.83320731622393, 'hkp': 0.0, 'hek': 81.30683076888272, 'hnktjg': 629.1667926837761,
     'hkpjg': 1100.0, 'hekjg': 18.693169231117277, 'height': 1100.0},
    {'t': 1710, 'hnkt': 371.46489160115163, 'hkp': 0.0, 'hek': 81.3068274020544, 'hnktjg': 728.5351083988484,
     'hkpjg': 1100.0, 'hekjg': 18.6931725979456, 'height': 1100.0},
    {'t': 1740, 'hnkt': 272.09656107976184, 'hkp': 0.0, 'hek': 81.30682734985427, 'hnktjg': 827.9034389202382,
     'hkpjg': 1100.0, 'hekjg': 18.693172650145726, 'height': 1100.0},
    {'t': 1770, 'hnkt': 172.7282303288123, 'hkp': 0.0, 'hek': 81.30682734904495, 'hnktjg': 927.2717696711877,
     'hkpjg': 1100.0, 'hekjg': 18.69317265095505, 'height': 1100.0},
    {'t': 1800, 'hnkt': 73.35989957430365, 'hkp': 0.0, 'hek': 81.3068273490324, 'hnktjg': 1026.6401004256963,
     'hkpjg': 1100.0, 'hekjg': 18.693172650967597, 'height': 1100.0},
    {'t': 1830, 'hnkt': -26.00843118026137, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1126.0084311802614,
     'hkpjg': 1100.0, 'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 1860, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 1890, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 1920, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 1950, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 1980, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2010, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2040, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2070, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2100, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2130, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2160, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2190, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0},
    {'t': 2220, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 81.3068273490322, 'hnktjg': 1100.0, 'hkpjg': 1100.0,
     'hekjg': 18.69317265096779, 'height': 1100.0}]


data_for_back_2 = [{'t': 0, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 0, 'hkpjg': 0, 'hekjg': 0,
    'height': 1191.0932721712538},
   {'t': 30, 'hnkt': 1191.0932721712538, 'hkp': 1191.0932721712538, 'hek': 100.0, 'hnktjg': 0,
    'hkpjg': 22.245172874063762, 'hekjg': 0, 'height': 1191.0932721712538},
   {'t': 60, 'hnkt': 1213.8134639045722, 'hkp': 1186.0069978119925, 'hek': 100.0, 'hnktjg': 0,
    'hkpjg': 44.490345748127524, 'hekjg': 0, 'height': 1213.8134639045722},
   {'t': 90, 'hnkt': 1233.45412113707, 'hkp': 1177.8411889519105, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 66.7355186221913, 'hekjg': 0.0, 'height': 1233.45412113707},
   {'t': 120, 'hnkt': 1254.3663214820237, 'hkp': 1170.9469232042848, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 88.98069149625505, 'hekjg': 0.0, 'height': 1254.3663214820237},
   {'t': 150, 'hnkt': 1275.6581300775472, 'hkp': 1164.4322657072285, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 111.22586437031882, 'hekjg': 0.0, 'height': 1275.6581300775472},
   {'t': 180, 'hnkt': 1296.9371769586585, 'hkp': 1157.90484649576, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 133.4710372443826, 'hekjg': 0.0, 'height': 1296.9371769586585},
   {'t': 210, 'hnkt': 1318.254462994904, 'hkp': 1151.4156664394259, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 155.71621011844636, 'hekjg': 0.0, 'height': 1318.254462994904},
   {'t': 240, 'hnkt': 1339.6236109933861, 'hkp': 1144.9783483453282, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 177.9613829925101, 'hekjg': 0.0, 'height': 1339.6236109933861},
   {'t': 270, 'hnkt': 1361.031674842469, 'hkp': 1138.5799461018314, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 200.20655586657386, 'hekjg': 0.0, 'height': 1361.031674842469},
   {'t': 300, 'hnkt': 1382.4711811643003, 'hkp': 1132.212986331083, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 222.45172874063763, 'hekjg': 0.0, 'height': 1382.4711811643003},
   {'t': 330, 'hnkt': 1403.9380241687584, 'hkp': 1125.8733632429612, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 244.6969016147014, 'hekjg': 0.0, 'height': 1403.9380241687584},
   {'t': 360, 'hnkt': 1425.4288601188885, 'hkp': 1119.5577331005115, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 266.9420744887652, 'hekjg': 0.0, 'height': 1425.4288601188885},
   {'t': 390, 'hnkt': 1446.9409258634275, 'hkp': 1113.2633327524711, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 289.1872473628289, 'hekjg': 0.0, 'height': 1446.9409258634275},
   {'t': 420, 'hnkt': 1468.4719833984955, 'hkp': 1106.9879241949593, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 311.4324202368927, 'hekjg': 0.0, 'height': 1468.4719833984955},
   {'t': 450, 'hnkt': 1490.0201866833002, 'hkp': 1100.7296613871843, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 333.6775931109564, 'hekjg': 0.0, 'height': 1490.0201866833002},
   {'t': 480, 'hnkt': 1511.5839855139945, 'hkp': 1094.4869941252991, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 355.9227659850202, 'hekjg': 0.0, 'height': 1511.5839855139945},
   {'t': 510, 'hnkt': 1533.1620621309733, 'hkp': 1088.258604649698, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 378.167938859084, 'hekjg': 0.0, 'height': 1533.1620621309733},
   {'t': 540, 'hnkt': 1554.7532845874134, 'hkp': 1082.0433610135583, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 400.41311173314773, 'hekjg': 0.0, 'height': 1554.7532845874134},
   {'t': 570, 'hnkt': 1576.3566713326697, 'hkp': 1075.8402816662351, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 422.6582846072115, 'hekjg': 0.0, 'height': 1576.3566713326697},
   {'t': 600, 'hnkt': 1597.9713640956418, 'hkp': 1069.6485083366274, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 444.90345748127527, 'hekjg': 0.0, 'height': 1597.9713640956418},
   {'t': 630, 'hnkt': 1619.5966068186863, 'hkp': 1063.4672849670922, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 467.148630355339, 'hekjg': 0.0, 'height': 1619.5966068186863},
   {'t': 660, 'hnkt': 1641.2317290484289, 'hkp': 1057.2959411042552, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 489.3938032294028, 'hekjg': 0.0, 'height': 1641.2317290484289},
   {'t': 690, 'hnkt': 1662.8761326756378, 'hkp': 1051.1338786388842, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 511.6389761034666, 'hekjg': 0.0, 'height': 1662.8761326756378},
   {'t': 720, 'hnkt': 1684.5292812304372, 'hkp': 1044.9805611011038, 'hek': 100.0, 'hnktjg': 0.0,
    'hkpjg': 533.8841489775303, 'hekjg': 0.0, 'height': 1684.5292812304372},
   {'t': 750, 'hnkt': 1700.0, 'hkp': 1032.6448137780872, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 556.1293218515941,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 780, 'hnkt': 1700.0, 'hkp': 1004.8383476855074, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 578.3744947256578,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 810, 'hnkt': 1700.0, 'hkp': 977.0318815929277, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 600.6196675997215,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 840, 'hnkt': 1700.0, 'hkp': 949.225415500348, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 622.8648404737854,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 870, 'hnkt': 1700.0, 'hkp': 921.4189494077683, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 645.1100133478492,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 900, 'hnkt': 1700.0, 'hkp': 893.6124833151885, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 667.3551862219128,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 930, 'hnkt': 1700.0, 'hkp': 865.806017222609, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 689.6003590959767,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 960, 'hnkt': 1700.0, 'hkp': 837.9995511300292, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 711.8455319700404,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 990, 'hnkt': 1700.0, 'hkp': 810.1930850374495, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 734.0907048441042,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1020, 'hnkt': 1700.0, 'hkp': 782.3866189448698, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 756.335877718168,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1050, 'hnkt': 1700.0, 'hkp': 754.58015285229, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 778.5810505922317,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1080, 'hnkt': 1700.0, 'hkp': 726.7736867597104, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 800.8262234662955,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1110, 'hnkt': 1700.0, 'hkp': 698.9672206671307, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 823.0713963403592,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1140, 'hnkt': 1700.0, 'hkp': 671.160754574551, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 845.316569214423,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1170, 'hnkt': 1700.0, 'hkp': 643.3542884819713, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 867.5617420884868,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1200, 'hnkt': 1700.0, 'hkp': 615.5478223893915, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 889.8069149625505,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1230, 'hnkt': 1700.0, 'hkp': 587.7413562968118, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 912.0520878366143,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1260, 'hnkt': 1700.0, 'hkp': 559.9348902042323, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 934.297260710678,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1290, 'hnkt': 1700.0, 'hkp': 532.1284241116525, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 956.5424335847418,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1320, 'hnkt': 1700.0, 'hkp': 504.3219580190728, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 978.7876064588056,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1350, 'hnkt': 1700.0, 'hkp': 476.5154919264928, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1001.0327793328693,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1380, 'hnkt': 1700.0, 'hkp': 448.7090258339133, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1023.2779522069332,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1410, 'hnkt': 1700.0, 'hkp': 420.90255974133356, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1045.5231250809968,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1440, 'hnkt': 1700.0, 'hkp': 393.09609364875405, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1067.7682979550607,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1470, 'hnkt': 1700.0, 'hkp': 365.2896275561743, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1090.0134708291243,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1500, 'hnkt': 1700.0, 'hkp': 337.48316146359434, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1112.2586437031882,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1530, 'hnkt': 1700.0, 'hkp': 309.67669537101483, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1134.5038165772519,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1560, 'hnkt': 1700.0, 'hkp': 281.8702292784351, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1156.7489894513155,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1590, 'hnkt': 1700.0, 'hkp': 254.06376318585535, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1178.9941623253794,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1620, 'hnkt': 1700.0, 'hkp': 226.25729709327584, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1201.239335199443,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1650, 'hnkt': 1700.0, 'hkp': 198.4508310006961, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1223.484508073507,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1680, 'hnkt': 1700.0, 'hkp': 170.64436490811636, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1245.7296809475708,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1710, 'hnkt': 1700.0, 'hkp': 142.83789881553662, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1267.9748538216345,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1740, 'hnkt': 1700.0, 'hkp': 115.03143272295688, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1290.2200266956984,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1770, 'hnkt': 1700.0, 'hkp': 87.22496663037691, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1312.465199569762,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1800, 'hnkt': 1700.0, 'hkp': 59.4185005377974, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1334.7103724438257,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1830, 'hnkt': 1700.0, 'hkp': 31.612034445217887, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1356.9555453178896,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1860, 'hnkt': 1700.0, 'hkp': 3.805568352638147, 'hek': 100.0, 'hnktjg': 0.0, 'hkpjg': 1379.2007181919535,
    'hekjg': 0.0, 'height': 1700.0},
   {'t': 1890, 'hnkt': 1681.823571050215, 'hkp': 0.0, 'hek': 100.00033725229682, 'hnktjg': 18.176428949785176,
    'hkpjg': 1397.3771471417385, 'hekjg': -0.0003372522968094385, 'height': 1700.0},
   {'t': 1920, 'hnkt': 1664.3360624826812, 'hkp': 0.0, 'hek': 99.15752839586285, 'hnktjg': 35.66393751731883,
    'hkpjg': 1414.8646557092723, 'hekjg': 0.8424716041371431, 'height': 1700.0},
   {'t': 1950, 'hnkt': 1646.9590556715978, 'hkp': 0.0, 'hek': 98.17948021662856, 'hnktjg': 53.040944328402276,
    'hkpjg': 1432.2416625203557, 'hekjg': 1.8205197833714424, 'height': 1700.0},
   {'t': 1980, 'hnkt': 1629.5729432514208, 'hkp': 0.0, 'hek': 97.21257608113687, 'hnktjg': 70.42705674857926,
    'hkpjg': 1449.6277749405326, 'hekjg': 2.787423918863128, 'height': 1700.0},
   {'t': 2010, 'hnkt': 1612.1820748912835, 'hkp': 0.0, 'hek': 96.25149257800564, 'hnktjg': 87.81792510871652,
    'hkpjg': 1467.01864330067, 'hekjg': 3.7485074219943577, 'height': 1700.0},
   {'t': 2040, 'hnkt': 1594.786522276806, 'hkp': 0.0, 'hek': 95.29614197365488, 'hnktjg': 105.21347772319399,
    'hkpjg': 1484.4141959151475, 'hekjg': 4.703858026345123, 'height': 1700.0},
   {'t': 2070, 'hnkt': 1577.3864865414562, 'hkp': 0.0, 'hek': 94.3462781077085, 'hnktjg': 122.61351345854388,
    'hkpjg': 1501.8142316504973, 'hekjg': 5.653721892291496, 'height': 1700.0},
   {'t': 2100, 'hnkt': 1559.9821496290006, 'hkp': 0.0, 'hek': 93.4016783054082, 'hnktjg': 140.01785037099938,
    'hkpjg': 1519.2185685629527, 'hekjg': 6.598321694591804, 'height': 1700.0},
   {'t': 2130, 'hnkt': 1542.5736808311337, 'hkp': 0.0, 'hek': 92.46213537643621, 'hnktjg': 157.42631916886629,
    'hkpjg': 1536.6270373608195, 'hekjg': 7.537864623563797, 'height': 1700.0},
   {'t': 2160, 'hnkt': 1525.1612378747848, 'hkp': 0.0, 'hek': 91.52745628419487, 'hnktjg': 174.83876212521514,
    'hkpjg': 1554.0394803171682, 'hekjg': 8.472543715805125, 'height': 1700.0},
   {'t': 2190, 'hnkt': 1507.74496803014, 'hkp': 0.0, 'hek': 90.59746078973699, 'hnktjg': 192.25503196986014,
    'hkpjg': 1571.4557501618133, 'hekjg': 9.402539210263017, 'height': 1700.0},
   {'t': 2220, 'hnkt': 1490.3250090795013, 'hkp': 0.0, 'hek': 89.6719802660122, 'hnktjg': 209.67499092049866,
    'hkpjg': 1588.875709112452, 'hekjg': 10.328019733987807, 'height': 1700.0},
   {'t': 2250, 'hnkt': 1472.9014901724272, 'hkp': 0.0, 'hek': 88.75085665129068, 'hnktjg': 227.09850982757283,
    'hkpjg': 1606.299228019526, 'hekjg': 11.249143348709321, 'height': 1700.0},
   {'t': 2280, 'hnkt': 1455.4745325830218, 'hkp': 0.0, 'hek': 87.83394152234106, 'hnktjg': 244.52546741697836,
    'hkpjg': 1623.7261856089315, 'hekjg': 12.166058477658934, 'height': 1700.0},
   {'t': 2310, 'hnkt': 1438.0442503828303, 'hkp': 0.0, 'hek': 86.92109527089782, 'hnktjg': 261.9557496171696,
    'hkpjg': 1641.1564678091227, 'hekjg': 13.078904729102177, 'height': 1700.0},
   {'t': 2340, 'hnkt': 1420.6107510406432, 'hkp': 0.0, 'hek': 86.01218636958248, 'hnktjg': 279.3892489593567,
    'hkpjg': 1658.5899671513098, 'hekjg': 13.987813630417527, 'height': 1700.0},
   {'t': 2370, 'hnkt': 1403.1741359587554, 'hkp': 0.0, 'hek': 85.1070907155919, 'hnktjg': 296.8258640412446,
    'hkpjg': 1676.0265822331978, 'hekjg': 14.892909284408102, 'height': 1700.0},
   {'t': 2400, 'hnkt': 1385.7345009537871, 'hkp': 0.0, 'hek': 84.20569104223918, 'hnktjg': 314.265499046213,
    'hkpjg': 1693.4662172381663, 'hekjg': 15.794308957760816, 'height': 1700.0},
   {'t': 2430, 'hnkt': 1290.376673683957, 'hkp': 0.0, 'hek': 83.30787638989975, 'hnktjg': 409.62332631604295,
    'hkpjg': 1700.0, 'hekjg': 16.69212361010026, 'height': 1700.0},
   {'t': 2460, 'hnkt': 1192.4854771824696, 'hkp': 0.0, 'hek': 82.97719651867307, 'hnktjg': 507.5145228175304,
    'hkpjg': 1700.0, 'hekjg': 17.022803481326935, 'height': 1700.0},
   {'t': 2490, 'hnkt': 1093.0827992668917, 'hkp': 0.0, 'hek': 82.98488567404726, 'hnktjg': 606.9172007331083,
    'hkpjg': 1700.0, 'hekjg': 17.015114325952737, 'height': 1700.0},
   {'t': 2520, 'hnkt': 993.6640051816431, 'hkp': 0.0, 'hek': 82.996182688965, 'hnktjg': 706.3359948183569,
    'hkpjg': 1700.0, 'hekjg': 17.003817311034993, 'height': 1700.0},
   {'t': 2550, 'hnkt': 894.2450367733744, 'hkp': 0.0, 'hek': 83.00751872884818, 'hnktjg': 805.7549632266256,
    'hkpjg': 1700.0, 'hekjg': 16.992481271151817, 'height': 1700.0},
   {'t': 2580, 'hnkt': 794.8260640002615, 'hkp': 0.0, 'hek': 83.0188557458708, 'hnktjg': 905.1739359997385,
    'hkpjg': 1700.0, 'hekjg': 16.9811442541292, 'height': 1700.0},
   {'t': 2610, 'hnkt': 695.4070886734276, 'hkp': 0.0, 'hek': 83.03019333458448, 'hnktjg': 1004.5929113265724,
    'hkpjg': 1700.0, 'hekjg': 16.969806665415526, 'height': 1700.0},
   {'t': 2640, 'hnkt': 595.9881108112565, 'hkp': 0.0, 'hek': 83.04153149087324, 'hnktjg': 1104.0118891887435,
    'hkpjg': 1700.0, 'hekjg': 16.958468509126757, 'height': 1700.0},
   {'t': 2670, 'hnkt': 496.5691304130214, 'hkp': 0.0, 'hek': 83.05287021490031, 'hnktjg': 1203.4308695869786,
    'hkpjg': 1700.0, 'hekjg': 16.947129785099683, 'height': 1700.0},
   {'t': 2700, 'hnkt': 397.15014747778764, 'hkp': 0.0, 'hek': 83.06420950687466, 'hnktjg': 1302.8498525222124,
    'hkpjg': 1700.0, 'hekjg': 16.935790493125342, 'height': 1700.0},
   {'t': 2730, 'hnkt': 297.7311620046178, 'hkp': 0.0, 'hek': 83.07554936700592, 'hnktjg': 1402.2688379953822,
    'hkpjg': 1700.0, 'hekjg': 16.924450632994088, 'height': 1700.0},
   {'t': 2760, 'hnkt': 198.31217399257594, 'hkp': 0.0, 'hek': 83.08688979550382, 'hnktjg': 1501.687826007424,
    'hkpjg': 1700.0, 'hekjg': 16.91311020449618, 'height': 1700.0},
   {'t': 2790, 'hnkt': 98.89318344072467, 'hkp': 0.0, 'hek': 83.09823079257828, 'hnktjg': 1601.1068165592753,
    'hkpjg': 1700.0, 'hekjg': 16.901769207421726, 'height': 1700.0},
   {'t': 2820, 'hnkt': -0.5258096518723505, 'hkp': 0.0, 'hek': 83.10957235843934, 'hnktjg': 1700.5258096518724,
    'hkpjg': 1700.0, 'hekjg': 16.890427641560667, 'height': 1700.0},
   {'t': 2850, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12091449329715, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.879085506702854, 'height': 1700.0},
   {'t': 2880, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097039057724, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902960942276, 'height': 1700.0},
   {'t': 2910, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097095869622, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.879029041303777, 'height': 1700.0},
   {'t': 2940, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096447039, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903552962, 'height': 1700.0},
   {'t': 2970, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452906, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.879029035470936, 'height': 1700.0},
   {'t': 3000, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3030, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3060, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3090, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3120, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3150, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3180, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3210, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3240, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3270, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0},
   {'t': 3300, 'hnkt': 0.0, 'hkp': 0.0, 'hek': 83.12097096452966, 'hnktjg': 1700.0, 'hkpjg': 1700.0,
    'hekjg': 16.87902903547034, 'height': 1700.0}]
