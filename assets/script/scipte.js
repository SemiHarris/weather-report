

/*Gets weather of location*/
var fetchweather = function(lat,lon) {
    var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=34a334a0ae495d92c14fcfe60587b3e2"
     
    console.log(weather)
    fetch(weather).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
        })
    })
}

/*Gets location*/
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

getLocation('jacksonville')