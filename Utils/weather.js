const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) +'&lon=' + encodeURIComponent(longitude) + '&units=metric&appid=5b30f469e05018f50014ddd1a10d0e14';
    request({ url, json: true }, (message, { body }) => {

        if(message) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.message) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                weather: body.weather[0].description,
                temp: body.main.temp,
                feel: body.main.feels_like,
                temp_min: body.main.temp_min,
                temp_max: body.main.temp_max,
                humidity: body.main.humidity
            })
            // callback(undefined,  'Description: ' + body.weather[0].description + '. It is currently ' +  body.main.temp + ' degrees. It feels like ' + body.main.feels_like + 
            // ' degrees. Minimum temperature ' + body.main.temp_min + ' degrees. Maximum temperature ' + body.main.temp_max + ' degrees. There is ' + body.main.humidity + '% humidity. ');
        }
    });
}

module.exports = weather