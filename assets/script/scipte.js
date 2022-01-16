var cityData = "";
var search = document.querySelector('.city-btn');
var searchCity = document.querySelector('.city-name');
var forecast = document.querySelector('.days')
var majorCities = document.querySelector('.major-btn')
var savedCity = [];
var city = "";

/*Gets weather of location*/
var fetchweather = function(lat,lon) {
    
    var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=34a334a0ae495d92c14fcfe60587b3e2"
    
    fetch(weather).then(function(response) {
        response.json().then(function(data) {
            cityData = data
            if (response.ok){
                displayWeather()
                
            }
        })
    })
   
}

/*Gets location*/
var getLocation = function(city) {
    var location = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +",us&limit=1&appid=34a334a0ae495d92c14fcfe60587b3e2"

    fetch(location).then(function(response) {
        if(response.ok) {
         response.json().then(function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            console.log(city)
            
            fetchweather(lat,lon)
            debugger;
        })
        }else {
            alert('Please Enter A Valid City');
          }
    })
}

/*Displays the forcast on screen*/
var displayWeather = function() {
   
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

    if (dailyArray[0].uvi < 3) {
        indexEl.classList.remove("moderate");
        indexEl.classList.remove("bad");
        indexEl.classList.add('good');
    }else if (dailyArray[0].uvi < 6){
        indexEl.classList.remove("good");
        indexEl.classList.remove("bad");
        indexEl.classList.add('moderate');
    }else {
        indexEl.classList.remove("moderate");
        indexEl.classList.remove("good");
        indexEl.classList.add('bad');
    }

    forecast.innerHTML = "";

    /*This is the 5 day forcast to the page*/
    for ( i = 1; i < 6; i++) {
        container = document.createElement('div')
        days = document.createElement('h5')
        list = document.createElement('ul')
        temp = document.createElement('li')
        wind = document.createElement('li')
        image = document.createElement('img')
        humidity = document.createElement('li')

        days.textContent = moment().add(i, 'day').format("M/D/YYYY");
        temp.textContent = "Temp: " + (dailyArray[i].temp.day);
        wind.textContent = "Wind: " + (dailyArray[i].wind_speed);
        image.src = "https://openweathermap.org/img/wn/" + (dailyArray[i].weather[0].icon) + "@2x.png";
        humidity.textContent = "Humidity: " + (dailyArray[i].humidity)

        container.style.backgroundColor = 'rgb(8, 193, 250)'
        days.style.color = 'white';
        temp.style.color = 'white';
        wind.style.color = 'white';
        humidity.style.color = 'white';
        container.style.marginRight = "50px";

        $(list).append(temp);
        $(list).append(wind);
        $(list).append(humidity);
        $(container).append(days);
        $(container).append(image);
        $(container).append(list);
        $(forecast).append(container)
    }
}

/*Display forcast when clicked*/
var getCityText = function() {
    data = "";
    city = this.innerHTML

    getLocation(city)

}

/*Add event listener to the city button*/
var cityEvent = function() {
    for (i = 1; i < 9; i++) {
        
        var button = document.querySelector(String('.btn' + i))
        
        button.addEventListener('click', getCityText)
    }
}

/*Displays forecast when searched*/
var searchEvent = function() {
    city = searchCity.value
    var cityArray = city
    
    getLocation(city)
    if (city){
        savedCity.push(cityArray)

        saveDataToLocal()
    
        loadSavedData()
    
    }

}

/*This takes the array stored locally and assigns it to a global variable*/
var loadArray = function() {
    var cities = localStorage.getItem("savedCity", JSON.stringify(savedCity));
    cities = JSON.parse(cities);
    
    if (cities === null){
        savedCity = [];
    }else{
        savedCity = cities
    }
 }

/*Displays the saved cities as button*/
var loadSavedData = function() {
    var cities = localStorage.getItem("savedCity", JSON.stringify(savedCity));
    cities = JSON.parse(cities);

    majorCities.innerHTML = "";


    for (i = 7; i > -1; i--) {

        button = document.createElement('button')
        button.className = 'btn' + (i);
        button.id = 'cities';
        button.type = 'button';
        button.textContent = cities[i];
         
        button.addEventListener('click', getCityText)

        $(majorCities).append(button)
    }
}

/*removes a element in the array so that there is only ever 8*/
var saveDataToLocal = function() {
    savedCity = savedCity.filter(String)
    
    
    if (savedCity.length === 9){
        
        savedCity = savedCity.slice(1);

        savedCity = savedCity.filter(String)

        localStorage.setItem("savedCity", JSON.stringify(savedCity));
        
    }else {
        console.log(savedCity)
        localStorage.setItem("savedCity", JSON.stringify(savedCity));
    }
}

/*Saved the initial buttons to local*/
var saveData = function() {
    if (savedCity.length === 0){
        for (i = 1; i < 9; i++) {
            
            var citySave = document.querySelector(String('.btn' + i))
            citySave = citySave.innerHTML

            savedCity.push(citySave)

        }
        cityEvent()
        saveDataToLocal()
    }else {
        loadSavedData()
    }

    
}

var loadExpCity = function() {
    city = "Boston"
    getLocation(city)
};



loadArray()
saveData()
loadExpCity()
search.addEventListener('click', searchEvent)
