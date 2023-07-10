const path = require('path') //niet nodig te installeren
const express = require('express')
const hbs = require('hbs')
// const geocode = require('geocode')
// const forecast = require('forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //ga naar de directory public
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serv
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Alex Glorie'
    })
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About me',
            name: 'Alex Glorie'
        })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: "This is some helptext",
        title: 'Help',
        name: 'Alex Glorie'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) { //een adres ?
        return res.send({
            error: 'You must provide an address'
        })
    }

    /*    geocode(req.query.address, (error, { latitude, longitude, location }) => {
           if (error) {
               return res.send({
                   error: error
               })
           }
   
           forecast(latitude, longitude, (error, forecastData) => {
               if (error) {
                   return res.send({
                       error: error
                   })
               }
   
               res.send({
                   forecast: forecastData,
                   location,
                   address: req.query.address
               })
           })
       }) */

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) { //als we iets zoeken ?
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex Glorie',
        errorMessage: 'Help article not found'
    })
})

//ALS LAATSTE DE 404 pagina !!!
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex Glorie',
        errorMessage: 'Page not found'
    })
})

//start de server
//port 3000 is algemeen gekende poort voor development voor locale machine
app.listen(3000, () => { //call back functie voor als de server up and running is
    console.log('Server is up on port 3000') //zie je enkel in de console
}) 
