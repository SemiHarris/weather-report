cityData = "";
var search = document.querySelector('.city-btn');
var searchCity = document.querySelector('.city-name');
forecast = document.querySelector('.days')


/*Gets weather of location*/
var fetchweather = function(lat,lon) {
    var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=34a334a0ae495d92c14fcfe60587b3e2"
     
    fetch(weather).then(function(response) {
        response.json().then(function(data) {
            cityData = data
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

            fetchweather(lat,lon)
        })
    })
}

/*Displays the forcast on screen*/
var displayWeather = function(city) {
    var dailyArray = cityData.daily

    tempEl = document.querySelector('.temp');
    windEl = document.querySelector('.wind');
    humidityEl = document.querySelector('.humidity');
    indexEl = document.querySelector('.index');
    h3El = document.querySelector('.the-city')

    tempEl.textContent = (dailyArray[0].temp.day);
    windEl.textContent = (dailyArray[0].wind_speed);
    humidityEl.textContent = (dailyArray[0].humidity);
    indexEl.textContent = (dailyArray[0].uvi);
    h3El.textContent = (city).toUpperCase();

    forecast.innerHTML = "";

    /*This is the 5 day forcast to the page*/
    for ( i = 1; i < 6; i++) {
        console.log(i)
        container = document.createElement('div')
        days = document.createElement('h5')
        list = document.createElement('ul')
        temp = document.createElement('li')
        wind = document.createElement('li')
        humidity = document.createElement('li')

        days.textContent = "Day" + [i]
        temp.textContent = "Temp: " + (dailyArray[i].temp.day);
        wind.textContent = "Wind: " + (dailyArray[i].wind_speed);
        humidity.textContent = "Humidity: " + (dailyArray[i].humidity)

        $(list).append(temp);
        $(list).append(wind);
        $(list).append(humidity);
        $(container).append(days);
        $(container).append(list);
        $(forecast).append(container)
        console.log(1)
    }
}

/*Display forcast when clicked*/
var getCityText = function() {
    data = "";
    var city = this.innerHTML

    getLocation(city)

    displayWeather(city)

}

/*Add event listener to the city button*/
var cityEvent = function() {
    for (i = 1; i < 9; i++) {
        
        var button = document.querySelector(String('.btn' + i))
        var value = button.innerHTML
        
        button.addEventListener('click', getCityText)
    }
}

/*Displays forecast when searched*/
var searchEvent = function() {
    city = searchCity.value
    
    getLocation(city)

    displayWeather(city)

}

search.addEventListener('click', searchEvent)
cityEvent()
