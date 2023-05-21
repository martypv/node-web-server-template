
//core node module
const path = require('path')

//npm modules
const express = require('express')
const hbs = require('hbs')

//weather app utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//current directory path
//console.log(__dirname)

//current file path
//console.log(__filename)

console.log(path.join(__dirname, '../public'))

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname, '../public/templates/partials')

//List of routes
//app.com
//app.com/help
//app.com/about
//app.com/weather
//app.com/*
//app.com/products

const app = express()


//handlebars engine
app.set('view engine', 'hbs')

//needed to load templates path
app.set('views', viewsPath)

//path to partials
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Marty'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Marty'
	})
})

//-----------------------------------------------------------------------------------

app.get('/help', (req, res) => {
	res.render('help', {
		helpMessage: 'Call me if you get lost',
		title: 'Help',
		name: 'Marty'
	})
})

app.get('/help/*', (req,res) =>{
	res.render('notFound', {
		errorMessage: 'Help article not found',
		title: 'Help',
		name: 'Marty'
	})
})

//-----------------------------------------------------------------------------------

//learn about req and res
app.get('/products', (req,res) => {
	if (!req.query.search) {
		res.send({
			errorMessage: 'You must provide a search term'
		})

	}
	res.send({
		products: []
	})
})

//-----------------------------------------------------------------------------------

app.get('/weather', (req, res) => {
	//res.send('Weather app page')

	if (!req.query.address) {
		res.send({
			errorMessage: 'You must provide an address'
		})

	}

	//{latitude, longitude, location} = {} sets up a default object so that it doesnt error out if the user put nothing in the query
  	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

	    if (error) {
	      return res.send({ error })
	    }

	    // console.log('Error', error)
	    // console.log('Data', data)

	    forecast(longitude, latitude, (error, forecastData) => {
	      if (error) {
	        return res.send({error})
	      }

	      res.send({
	      	forecast: forecastData,
	      	location,
	      	address: req.query.address
	      })

	      console.log(location)
	      console.log(forecastData)
	    })
     })

})

//-----------------------------------------------------------------------------------

//home page
// app.get('', (req, res) => {
// 	//res.send('Nice request, hello express')
// 	res.send('<h1>Nice request, hello express</h1>')
// })

//help page
// app.get('/help', (req, res) => {
// 	//Plain text
// 	res.send('Help page')

// 	//JSON
// 	// res.send({
// 	// 	name: 'Marty',
// 	// 	age: 25
// 	// })

// 	//Array
// 	// res.send([{
// 	// 	name: 'Marty'
// 	// }, {
// 	// 	name: 'Steven'
// 	// }])
// })

// app.get('/about', (req, res) => {
// 	res.send('<h1>About page</h1>')
// })

//-----------------------------------------------------------------------------------

//has to be at the end
app.get('*', (req, res) => {
	res.render('notFound', {
		errorMessage: 'NO PAGE FOUND',
		title: '404 Error',
		name: 'Marty'
	})
})


//starts server and has it listen on a port (defaults to 480)
app.listen(3000, () => {
	console.log('Server is running on port 3000')
})

