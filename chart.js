const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

async function main () {
  let response = await fetch(url)
  let rawData = await response.json()
  let dataset = rawData.data
  let title = rawData.source_name
  console.log(`dataset is: `, dataset)

  const w = 500;
  const h = 500;
  const padding = 60;

  const xScale = d3.scaleLinear()
    .domain([d3.min(dataset, (d) => d[0]), d3.max(dataset, (d) => d[0])])
    .range([padding, w - padding]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);

  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale)

  d3.select('body')
    .append('h2')
    .text(title)
    .attr('id', 'title')
    .style('text-align', 'center')

  // svg.selectAll("rect")
  //   .data(dataset)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d, i) => i * 30)
  //   .attr("y", (d, i) => h - d[1])
  //   .attr("width", 25)
  //   .attr("height", (d, i) => d[1])
  //   .attr("fill", "navy")

  // svg.selectAll("text")
  //   .data(dataset)
  //   .enter()
  //   .append('text')
  //   .text((d) => d[1])
  //   .attr("x", (d, i) => i * 30)
  //   .attr("y", (d, i) => (h - 3) - (d[1]))

  svg.append("g")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('class', 'tick')

  svg.append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('class', 'tick')



}

main()

