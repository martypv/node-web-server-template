console.log('Client side javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data)
// 	})
// })



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#weatherLocation')
const messageTwo = document.querySelector('#weatherForecast')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = searchElement.value

	console.log(location)

	//provides loading message while call is being made
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	const reqURL = 'http://localhost:3000/weather?address=' + location

	//fetch lets you get data via client-side url
	fetch(reqURL).then((response) =>{
		response.json().then((data) => {
			if(data.error){
				// console.log(data.error)
				messageOne.textContent = data.error
			} else {
				// console.log(data.location)
				// console.log(data.forecast)
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})