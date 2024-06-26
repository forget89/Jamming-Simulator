// tabs //

document.querySelectorAll('.tabs-wrapper').forEach((e) => {
  let tabTabs = e.querySelectorAll('.tabs .tab');
  let tabItems = e.querySelectorAll('.tabs-items .item');
    for(let i =0;i<tabTabs.length;i++) {
        tabTabs[0].click();
         tabTabs[i].onclick = () => {
          tabTabs.forEach((e)  => { e.classList.remove('on') }); 
          tabItems.forEach((e)  => { e.classList.remove('on') });
          tabTabs[i].classList.add('on');
          tabItems[i].classList.add('on');
     }
   }
 });

const toggleIcon1 = document.getElementById('toggleIcon1');

toggleIcon1.addEventListener('click', () => {
  const content1 = document.querySelector('section[name="sect1"]');

  if (content1.classList.contains('closed1')) {
    content1.classList.remove('closed1');
    toggleIcon1.classList.remove('bx-left-arrow-alt');
    toggleIcon1.classList.add('bx-right-arrow-alt');
  } else {
    content1.classList.add('closed1');
    toggleIcon1.classList.remove('bx-right-arrow-alt');
    toggleIcon1.classList.add('bx-left-arrow-alt');
  }
}); 

const toggleIcon2 = document.getElementById('toggleIcon2');

toggleIcon2.addEventListener('click', () => {
  const content2 = document.querySelector('section[name="sect2"]');

  if (content2.classList.contains('closed2')) {
    content2.classList.remove('closed2');
    toggleIcon2.classList.remove('bx-left-arrow-alt');
    toggleIcon2.classList.add('bx-right-arrow-alt');
  } else {
    content2.classList.add('closed2');
    toggleIcon2.classList.remove('bx-right-arrow-alt');
    toggleIcon2.classList.add('bx-left-arrow-alt');
  }
}); 

const toggleIcon3 = document.getElementById('toggleIcon3');

toggleIcon3.addEventListener('click', () => {
  const content3 = document.querySelector('section[name="sect3"]');

  if (content3.classList.contains('closed3')) {
    content3.classList.remove('closed3');
    toggleIcon3.classList.remove('bx-left-arrow-alt');
    toggleIcon3.classList.add('bx-right-arrow-alt');
  } else {
    content3.classList.add('closed3');
    toggleIcon3.classList.remove('bx-right-arrow-alt');
    toggleIcon3.classList.add('bx-left-arrow-alt');
  }
}); 



// PLOT/GRAPH //

// Set dimensions and margins for the chart

const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales

const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);


// Create the line generator

const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.population));
// Create the SVG element and append it to the chart container

const svg = d3.select("#chart-container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// create tooltip div

// const tooltip = d3.select("#testtooltip")
//   .append("div")
//   .attr("class", "tooltip");

// Create a fake data

d3.csv("/mainPage/jdi_data_daily.csv").then(function (data) {
    
  // Parse the date and convert the population to a number
  const parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(d => {
    d.date = parseDate(d.date);
    d.population = +d.population;
  });
    console.log(data)


// Define the x and y domains

x.domain(d3.extent(data, d => d.date));
y.domain([90000, d3.max(data, d => d.population)]);


  // Add the x-axis
  svg.append("g")
  .style("font-family", "inter")
    .attr("transform", `translate(0,${height})`)
    .style("font-size", "14px")
    .call(d3.axisBottom(x)
      .tickValues(x.ticks(d3.timeMonth.every(6))) 
      .tickFormat(d3.timeFormat("%b %Y"))) 
    .call(g => g.select(".domain").remove()) 
    .selectAll(".tick line") 
    .style("stroke-opacity", 0)
  svg.selectAll(".tick text")
    .attr("fill", "#777");


// Add the y-axis
svg.append("g")
.style("font-family", "inter")
.style("font-size", "14px")
.call(d3.axisLeft(y)
  .ticks((d3.max(data, d => d.population) - 65000) / 5000)
  .tickFormat(d => {
      return `${(d / 1000).toFixed(0)}k`;
  })
  .tickSize(0)
  .tickPadding(10))
.call(g => g.select(".domain").remove()) 
.selectAll(".tick text")
.style("fill", "#777") 
.style("visibility", (d, i, nodes) => {
  if (i === 0) {
    return "hidden"; 
  } else {
    return "visible"; 
  }
});

// Add vertical gridlines
svg.selectAll("xGrid")
.data(x.ticks().slice(1))
.join("line")
.attr("x1", d => x(d))
.attr("x2", d => x(d))
.attr("y1", 0)
.attr("y2", height)
.attr("stroke", "#e0e0e0")
.attr("stroke-width", .1);

// Add horizontal gridlines

svg.selectAll("yGrid")
.data(y.ticks((d3.max(data, d => d.population) - 65000) / 5000).slice(1))
.join("line")
.attr("x1", 0)
.attr("x2", width)
.attr("y1", d => y(d))
.attr("y2", d => y(d))
.attr("stroke", "#e0e0e0")
.attr("stroke-width", .1)




// Add the line path to the SVG element

svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "green")
  .attr("stroke-width", 1)
  .attr("d", line);


// Add a circle element

const circle = svg.append("circle")
 .attr("r", 0)
 .attr("fill", "green")
 .style("stroke", "white")
 .attr("opacity", .70)
 .style("pointer-events", "none");



const listeningRect = svg.append("rect")
 .attr("width", width)
 .attr("height", height);


// nasha mouse 

 listeningRect.on("mousemove", function (event) {
  const [xCoord] = d3.pointer(event, this);
  const bisectDate = d3.bisector(d => d.date).left;
  const x0 = x.invert(xCoord);
  const i = bisectDate(data, x0, 1);
  const d0 = data[i - 1];
  const d1 = data[i];
  const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  const xPos = x(d.date);
  const yPos = y(d.population);

// update circle

circle.attr("cx", xPos)
      .attr("cy", yPos);

      // console.log(xPos)
 })
//////
 circle.transition()
      .duration(50)
      .attr("r", 5);

    // add in  our tooltip

    tooltip
      .style("display", "block")
      .style("left", `${xPos + 100}px`)
      .style("top", `${yPos + 50}px`)
      .html(`<strong>Date:</strong> ${d.date.toLocaleDateString()}<br><strong>Population:</strong> ${d.population !== undefined ? (d.population / 1000).toFixed(0) + 'k' : 'N/A'}`)
  });
  // listening rectangle mouse leave function

  listeningRect.on("mouseleave", function () {
    circle.transition()
      .duration(50)
      .attr("r", 0);

    tooltip.style("display", "none");
  });
  
  
// // Add Y-axis label

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "20px")
.style("fill", "#777")
.style("font-family", "inter")
.text("Количество заключенных");

svg.append("text")
.attr("transform", "rotate(90)")   
.attr("y", 0 - (width / 2))
.attr("x", 0 - margin.right)
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "20px")
.style("fill", "#777")
.style("font-family", "inter")
.text("Время");

// Add the chart title

svg.append("text")
.attr("class", "chart-title")
.attr("x", margin.left - 115)
.attr("y", margin.top - 100)
.style("font-size", "24px")
.style("font-weight", "bold")
.style("font-family", "inter")
.text("Тестовый график для обучения(график численности заключенных)");


