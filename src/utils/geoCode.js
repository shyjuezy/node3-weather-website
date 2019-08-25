const request = require('request')

const geoCode = (address, callBack) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2h5anVlenkiLCJhIjoiY2p6ZTIxcHN1MDVyZzNpbXJyZDhkOXllMCJ9.f2tg0unAjlQQ8x5dpffLHA&limit=1'
    console.log(mapUrl)

    request({ url: mapUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callBack('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callBack('Invalid Location, please enter another location', undefined)
        } else {
            callBack(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode