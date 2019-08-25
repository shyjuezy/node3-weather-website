const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
console.log(path.join(__dirname, '../public/about.html'))

const app = express()

//Set up static directory to server
const publicDirPath = path.join(__dirname, '../public')
const publicAboutFilename = path.join(__dirname, '../public/about.html')
const viewsPath = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname, '/templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shyju V'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Shyju V'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shyju V'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        else {
            foreCast(longitude, latitude, (error, { temperature, possibleRainChance, forecast }) => {
                if (error) {
                    return res.send({ error })
                }
                else {
                    console.log(longitude)
                    console.log(latitude)
                    res.send({
                        temperature,
                        possibleRainChance,
                        forecast,
                        location
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help Article Not Found',
        title: 'Help',
        name: 'Shyju V'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page Not Found',
        name: 'Shyju V'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})