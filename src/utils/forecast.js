const request = require('request')
const chalk = require('chalk')

// const url = 'http://api.weatherstack.com/current?access_key=c7bb856ba43dcf897d30cb4824fccb5a&query=New%20York&units=f'
//
// request({url: url, json: true}, (error, response) => {
//   if (error){
//     console.log(chalk.red('---ERROR---'))
//     console.log(error);
//   } else if (response.error) {
//     console.log(chalk.red('---ERROR---'))
//     console.log(data.error)
//   } else {
//     console.log('The current temp is: ' + response.body.current.temperature)
//     console.log('But it feels like: ' + chalk.blue(response.body.current.feelslike))
//     console.log(response.body.current.weather_descriptions[0])
//   }
//   //console.log(response);
//
//   //not needed since json is set to true in properties
//   //const data = JSON.parse(response.body)
//
//   //console.log(response.body.current)
//
// })
//
//--------------------------------------------------------------------------------
//

const forecast = (longitude, latitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=c7bb856ba43dcf897d30cb4824fccb5a&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

  request({url : url, json: true}, (error, response) => {
    if (error) {
      console.log(chalk.red('---ERROR---'))
      callback('Unable to connect to weather services', undefined)
    } else if (response.error) {
      console.log(chalk.red('---ERROR---'))
      callback('Invalid location name, please try a different location name', undefined)
    } else {
      const temp = response.body.current.temperature
      const feel = response.body.current.feelslike
      const description = response.body.current.weather_descriptions[0]
      // console.log('The current temp is: ' + response.body.current.temperature)
      // console.log('But it feels like: ' + chalk.blue(response.body.current.feelslike))
      // console.log(response.body.current.weather_descriptions[0])
      callback(undefined, 'The current temp is: ' + temp)
    }
  })
}

module.exports = forecast
