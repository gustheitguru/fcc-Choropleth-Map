// console.log(d3)
// console.log(topojson)

let educationURL =  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

let countyData
let educationData

let canvas = d3.selection('#canvas')

let drawMap = () => {

	canvas.selectAll('path')
		  .data(countyData)
		  .enter()
		  .append('path')
		  .attr('d', d3.geoPath())
		  .attr('class', 'county')
		  .attr('fill', (item) => {
		  	let fips = item['id']
		  	let county = educationData.find((county) => {
		  		return county['fips'] === fips
		  	})

		  	let percentage = county['bachelorsOrHigher']

		  	if (percentage <= 15) {
		  		return 'red'
		  	} else if (percentage <= 30) {
		  		return 'blue'
		  	} else if (percentage <= 45) {
		  		return 'green'
		  	} else {
		  		return 'gold'
		  	}
		  })
		 .attr('data-fips', (countyDataItem) => {
		 	return countyDataItem['id']
		 })
		 .attr('data-education', (educationDataItem) => {
		 	let fips = educationDataItem['id']
		 	let county = educationData.find((county) => {
		 		return county['fips'] === fips
		 	})
		 	let percentage = county['bachelorsOrHigher']
		 	return percentage
		 })

}


d3.json(countyURL).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            countyData = topojson.feature(data, data.objects.counties).features
            console.log('County Data')
            console.log(countyData)

            d3.json(educationURL).then(
                (data, error) => {
                    if(error){
                        console.log(error)
                    }
                    else{
                        educationData = data
                        console.log('Education Data')
                        console.log(educationData)
                        drawMap()
                    }
                })
			}
    })


