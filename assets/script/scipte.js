

var getLocation = function(city) {
    var location = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +",us&limit=1&appid=34a334a0ae495d92c14fcfe60587b3e2"

    fetch(location).then(function(response) {
        response.json().then(function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            console.log(lon)

            fetchweather(lat,lon)
        })
    })
}

getLocation('boston')