let cityName = "New Delhi" ;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const degree = "\u00B0";
apiCall(cityName);

    document.querySelector('#cityName').addEventListener('keypress',function(event){
        if (event.key === "Enter") {
            cityName= this.value;
            apiCall(cityName);
        }
    })  


function apiCall(cityName) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4a213440dba03ee3d8e525cf1b95169b&units=metric`;

    fetch(url)
            .then( (response) => response.json())
            .then( (value)=> {
                let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
                let nodeCity=document.querySelector("#cityAndDateHolder").getElementsByTagName("span");
                nodeCity[0].innerHTML=`${value.name}, ${regionNames.of(value.sys.country)}`;
                let nodeDate = document.querySelector("#cityAndDateHolder").getElementsByTagName("p");
                var today = new Date();
                nodeDate[0].innerHTML = `${weekday[today.getDay()]} ${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`;
                let nodeTemperature = document.querySelector("#temperature").getElementsByTagName("span");
                nodeTemperature[0].innerHTML=`${value.main.temp}${degree}c`;
                let nodeWeather = document.querySelector("#weather").getElementsByTagName("span");
                nodeWeather[0].innerHTML=`${value.weather[0].main}`;
                let nodeMinMax = document.querySelector("#weather").getElementsByTagName("p");
                nodeMinMax[0].innerHTML=`${value.main.temp_min}${degree}c / ${value.main.temp_max}${degree}c`;
            }
            )
            .catch( (error)=> console.log(error) )
}

