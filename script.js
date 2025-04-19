let cityInput = document.getElementById('city');
let searchBtn = document.getElementById('search-btn');
api_key = 'af887d65539cf8cfe1ef5c24ffc283ec';

function getWeatherDetails(name, lat, lon, country, state){
    let FORECAST_API_URL= 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${api_key}',
    WEATHER_API_URL= 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}',
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ], 
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    fetch(WEATHER_API_URL).then(res => res.json()).then(data=>{
       console.log(data);
    }).catch(()=>{
        alert('Error fetching weather data');
    });
    
}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value= '';
    if(!cityName) return;
    let GEOCODING_API_URL ='http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}';
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert('failed to fetch coordinates of ${cityName}');
    });
}
searchBtn.addEventListener('click', getCityCoordinates);
