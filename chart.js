const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

async function main () {
  let response = await fetch(url)
  let rawData = await response.json()
  let dataset = rawData.data
  let title = rawData.source_name
  console.log(`dataset is: `, dataset)

}

main()

