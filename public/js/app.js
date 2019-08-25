// fetch('http://localhost:3000/weather?address=cecil, alabama').then((response) => {
//     response.json().then((data) => {//{ location, forecast: foreCastData } = {}) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    messageOne.textContent = 'Loading....'
    event.preventDefault()
    console.log(search.value)
    // fetch('http://localhost:3000/weather?address=' + encodeURIComponent(search.value)).then((response) => {
    fetch('/weather?address=' + encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {//{ location, forecast: foreCastData } = {}) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})