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
            console.log('forecast is : ' + body.daily.data[0].summary)
            callBack(undefined, {
                temperature: body.currently.temperature,
                possibleRainChance: body.currently.precipProbability,
                forecast: body.daily.data[0].summary,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = foreCast