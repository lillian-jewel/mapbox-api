const owKey = "a112d03e22960eda807802ab351bab45";

const keys = 'pk.eyJ1IjoibGpld2VsIiwiYSI6ImNsZmFpZnFodzEzeDUzd2w3M3FhbDltaG8ifQ.2hsaum9ZFudCRcW8A5ojXA';
mapboxgl.accessToken = keys;

const geoCoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';


// adding map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-98.4946, 29.4252],
    zoom: 10,
});

// draggable marker
var marker = new mapboxgl.Marker({
    draggable: true
});
marker.setLngLat([-98.4946, 29.4252])
marker.addTo(map);

marker.on('dragend', function() {
    var lngLat = marker.getLngLat();
    fetchWeatherData(lngLat.lat, lngLat.lng);
});

// create geocoder
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
});

// add geocoder to the map
map.addControl(geocoder);


geocoder.on('result', function (result) {
    const lat = result.result.center[1];
    const lon = result.result.center[0];

    marker.setLngLat([lon, lat]);

    marker.draggable = true;

    fetchWeatherData(lat, lon, result.result);
});

//weather data

function fetchWeatherData(lat, lon, locationName) {
    $.ajax({
        url: "https://api.openweathermap.org/data/3.0/onecall",
        type: "GET",
        data: {
            APPID: owKey,
            lat: lat,
            lon: lon,
            units: "imperial",
        }
    }).done(function (data) {
        console.log(data);
// todays weather
        var html = '';

        var today = new Date();
        var todaystr = today.toLocaleDateString()
        html += '<h4>'+ todaystr + '</h4>';

        html += '<div>'
        html += '<img src="https://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png">'
        html += '</div>'
        html += '<p>Temp: ' + parseInt(data.current.temp) + '&#8457; </p>';
        html += '<p>Conditions: ' + data.current.weather[0].description + ' </p>';
        html += '<p>Humidity: ' + data.current.humidity + '% </p>';
        html += '<p>Wind: ' + parseInt(data.current.wind_speed) + ' mph </p>';

        document.getElementById("weatherBody").innerHTML = html;

// day one
        var firstDay = '';

        var tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        var tomorrowStr = tomorrow.toLocaleDateString();

        firstDay += '<h4>'+ tomorrowStr +'</h4>';
        firstDay += '<div>'
        firstDay += '<img src="https://openweathermap.org/img/w/' + data.daily[1].weather[0].icon + '.png">'
        firstDay += '</div>'
        firstDay += '<p>Temp: ' + parseInt(data.daily[1].temp.day) + '&#8457; </p>';
        firstDay += '<p>Conditions: ' + data.daily[1].weather[0].description + ' </p>';
        firstDay += '<p>Humidity: ' + data.daily[1].humidity + '% </p>';
        firstDay += '<p>Wind: ' + parseInt(data.daily[1].wind_speed) + ' mph </p>';

        document.getElementById("firstDay").innerHTML = firstDay;

//day two
        var secDay = '';

        var nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 2);
        var nextDayStr = nextDay.toLocaleDateString();

        secDay += '<h4>'+ nextDayStr +'</h4>';
        secDay += '<div>'
        secDay += '<img src="https://openweathermap.org/img/w/' + data.daily[1].weather[0].icon + '.png">'
        secDay += '</div>'
        secDay += '<p>Temp: ' + parseInt(data.daily[2].temp.day) + '&#8457; </p>';
        secDay += '<p>Conditions: ' + data.daily[2].weather[0].description + ' </p>';
        secDay += '<p>Humidity: ' + data.daily[2].humidity + '% </p>';
        secDay += '<p>Wind: ' + parseInt(data.daily[2].wind_speed) + ' mph </p>';

        document.getElementById("secDay").innerHTML = secDay;

// third day
        var thirdDay = '';

        var threeDays = new Date(today);
        threeDays.setDate(today.getDate() + 3);
        var threeDaysStr = threeDays.toLocaleDateString();

        thirdDay += '<h4>'+ threeDaysStr +'</h4>';
        thirdDay += '<div>'
        thirdDay += '<img src="https://openweathermap.org/img/w/' + data.daily[1].weather[0].icon + '.png">'
        thirdDay += '</div>'
        thirdDay += '<p>Temp: ' + parseInt(data.daily[3].temp.day) + '&#8457; </p>';
        thirdDay += '<p>Conditions: ' + data.daily[3].weather[0].description + ' </p>';
        thirdDay += '<p>Humidity: ' + data.daily[3].humidity + '% </p>';
        thirdDay += '<p>Wind: ' + parseInt(data.daily[3].wind_speed) + ' mph </p>';

        document.getElementById("thirdDay").innerHTML = thirdDay;

// fourth day
        var fourthDay = '';

        var fourDays = new Date(today);
        fourDays.setDate(today.getDate() + 4);
        var fourDaysStr = fourDays.toLocaleDateString();

        fourthDay += '<h4>'+ fourDaysStr +'</h4>';
        fourthDay += '<div>'
        fourthDay += '<img src="https://openweathermap.org/img/w/' + data.daily[4].weather[0].icon + '.png">'
        fourthDay += '</div>'
        fourthDay += '<p>Temp: ' + parseInt(data.daily[4].temp.day) + '&#8457; </p>';
        fourthDay += '<p>Conditions: ' + data.daily[4].weather[0].description + ' </p>';
        fourthDay += '<p>Humidity: ' + data.daily[4].humidity + '% </p>';
        fourthDay += '<p>Wind: ' + parseInt(data.daily[4].wind_speed) + ' mph </p>';

        document.getElementById("fourthDay").innerHTML = fourthDay;
    });
}

console.log(fetchWeatherData());





