const request = require('request')
const chalk = require('chalk')

//--------------------------------------------------------------------------------

// //Geocoding:
// //Address -> Lat/Long -> Weather
//
// //Mapbox token: pk.eyJ1IjoibWFydGluY2lyY2xlY2kiLCJhIjoiY2xkbTBhaTY4MDRwaTNvbzluZjdzNHluNiJ9.zOO4OEQKmFePvn3-Ixb0Dw
// // Call: https://api.mapbox.com/geocoding/v5/mapbox.places/<place>.json?access_token=pk.eyJ1IjoibWFydGluY2lyY2xlY2kiLCJhIjoiY2xkbTBhaTY4MDRwaTNvbzluZjdzNHluNiJ9.zOO4OEQKmFePvn3-Ixb0Dw
//
// const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Valhalla.json?access_token=pk.eyJ1IjoibWFydGluY2lyY2xlY2kiLCJhIjoiY2xkbTBhaTY4MDRwaTNvbzluZjdzNHluNiJ9.zOO4OEQKmFePvn3-Ixb0Dw'
//
// request({url: mapboxURL}, (error, response) =>{
//   const data = JSON.parse(response.body)
//   if (error) {
//     console.log(chalk.red('---ERROR---'))
//     console.log(error)
//   } else if (data.features.length === 0) {
//     console.log(chalk.red('---ERROR---'))
//     console.log('Invalid call')
//   } else {
//     const coordinates = data.features[1].center
//     const latitude = data.features[1].center[1]
//     const longitude = data.features[1].center[0]
//     console.log(chalk.green('Valhalla, NY coordinates: ') + chalk.yellow(coordinates))
//   }
//
// })

//--------------------------------------------------------------------------------

const geocode = (address, callback) => {
  const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFydGluY2lyY2xlY2kiLCJhIjoiY2xkbTBhaTY4MDRwaTNvbzluZjdzNHluNiJ9.zOO4OEQKmFePvn3-Ixb0Dw'

  request({url: mapboxURL, json: true}, (error, {body}) =>{
    if (error) {
      console.log(chalk.red('---ERROR---'))
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      console.log(chalk.red('---ERROR---'))
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
