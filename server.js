const geocode = require('./Utils/geocode');
const weather = require('./Utils/weather');
const express = require('express');
const cors =  require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Ok!")
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {   
        if(error) {
             return res.send({ error })
        }
        weather(latitude, longitude, (message, weatherData) => {
            if(message) {
                return res.send({ message })
            } 
            res.send({
                forecast: weatherData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help',
        name: 'Gigel',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Gigel',
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server running at port ' + port);
})