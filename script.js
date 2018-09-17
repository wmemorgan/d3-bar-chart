// Data Visualization Script

// Set the margin and padding of the SVG
var margin = { top: 50, right: 20, bottom: 50, left: 100 }
var padding = 0

// Set the width and height using the current width and height of the div
var width = 800
var height = 400

// Get the data
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
const chart = async () => {
  let getData = await fetch(url)
  let rawData = await getData.json()
  console.log(`rawData: `, rawData)
  let dataset = rawData.data
  console.log(`dataset`, dataset)
  console.log(`dataset length is: `, dataset.length)

  // Format the data
  // Dates
  const GDPDates = dataset.map((d) => d[0])
  console.log(`GDPDates is: ${GDPDates}`)
  const minDate = new Date(d3.min(GDPDates))
  console.log(`minDate ${minDate}`)
  const maxDate = new Date(d3.max(GDPDates))
  console.log(`maxDate ${maxDate}`)
  // Dollar amount
  const GDPAmounts = dataset.map((d) => d[1])
  const minGDPAmt = d3.min(GDPAmounts)
  const maxGDPAmt = d3.max(GDPAmounts)
  
  // Set the ranges
  const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([minGDPAmt, maxGDPAmt])
    .range([height, 0])

  // create svg and append to chart div
  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // append the rectangles for the bar chart
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * width / dataset.length)
    .attr("width", width / dataset.length)
    .attr("y", (d, i) => yScale(d[1]))
    .attr("height", (d, i) => height - yScale(d[1]))
    .attr('class', 'bar')
    .attr("fill", "navy")

  // add the x Axis 
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale)

  svg.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height})`)

  // add the y Axis
  svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    // .attr('height', height)


}

chart()