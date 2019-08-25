const request = require('request')

const foreCast = (longitude, latitude, callBack) => {
    const url = 'https://api.darksky.net/forecast/2e78a5d46c3e549dd55c11c26bbc2e16/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)
    // console.log(weatherUrl)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callBack('Invalid Location', undefined)
        }
        else {
            console.log(body.hourly.summary)
            callBack(undefined, {
                temperature: body.currently.temperature,
                possibleRainChance: body.currently.precipProbability,
                forecast: body.hourly.summary
            })
        }
    })
}

module.exports = foreCast