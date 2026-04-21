// know for variabels
//  input + button
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// البيانات الأساسية
const cityName = document.getElementById("cityName");
const dateDay = document.getElementById("dateDay");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");

// تفاصيل الطقس
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const precipitation = document.getElementById("precipitation");

// الأيام (الكروت الصغيرة)
const daysCards = document.querySelectorAll(".before_day .anim");

// حولناها لمصفوفة عادية
const daysArray = Array.from(daysCards);

//ـ aside (hourly forecast)
const hourlyCards = document.querySelectorAll("aside .anim");

// مصفوفة لكل كارت (كل col)
const hourlyArray = Array.from(hourlyCards);
// end
// function to change data
const change_data = async (city_name) => {
  try {
    const recive = await fetch(
      `

https://api.weatherapi.com/v1/forecast.json?key=398c1f31258f4aa6a3e00526262104&q=${city_name}&days=7&aqi=yes&alerts=yes`,
      { method: "GET" },
    );
    console.log(recive)
    const data = await recive.json();
    console.log(data)
    // main data
    cityName.textContent = data.location["name"];
    dateDay.textContent = data.location["localtime"];
    weatherIcon.src = data.current["condition"].icon;
    temp.textContent = data.current["temp_c"];
    //end
    // second data
    feelsLike.textContent = data.current["feelslike_c"];
    humidity.textContent = data.current["humidity"] + "%";
    wind.textContent = data.current["wind_kph"] + "Km/h";
    precipitation.textContent = data.current["precip_mm"] + "mm";
    //end
    // day card
    daysCards.forEach((day, index) => {
      const data_day = new Date(data.forecast["forecastday"][index].date);
      const data_to_day = data_day.toLocaleDateString("en-US", {
        weekday: "short",
      });
      day.children[0].textContent = data_to_day;
      day.children[1].src =
        data.forecast["forecastday"][index].day["condition"].icon;
      day.children[2].children[0].textContent =
        data.forecast["forecastday"][index].day["mintemp_c"];
      day.children[2].children[1].textContent =
        data.forecast["forecastday"][index].day["maxtemp_c"];
    });
    //end
    // hours for day
    hourlyCards.forEach((hour) => {
      const counter = parseInt(hour.children[0].children[1].textContent);
      hour.children[0].children[0].src =
        data.forecast["forecastday"][0].hour[12 + counter].condition["icon"];
      hour.children[1].textContent =
        data.forecast["forecastday"][0].hour[12 + counter].temp_c;
    });
    // end
  } catch (err) {
    console.log(err);
    load()
  }
};
// end
// search for city
searchBtn.addEventListener('click',()=>{
    searchInput.value !==''?change_data(searchInput.value):searchInput.focus()
    searchInput.value=''
})
window.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        searchInput.value!==''?change_data(searchInput.value):searchInput.focus()
        searchInput.value=''
    }
})
//end
// function to get location by ip
async function getLocationByIP() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  console.log(data.country_capital)
  change_data(data.country_capital);
}

// getLocationByIP();
//end
// function to load
function load(){
      // main data
    cityName.textContent =''
    dateDay.textContent = ''
    weatherIcon.src = 'assets/images/icon-loading.svg'
    temp.textContent =''
    //end
    // second data
    feelsLike.textContent ="____"
    humidity.textContent ="____"
    wind.textContent ="____"
    precipitation.textContent = "____"
    //end
    // day card
    daysCards.forEach((day, index) => {
      day.children[0].textContent = '';
      day.children[1].src =''
      day.children[2].children[0].textContent =
        ''
      day.children[2].children[1].textContent =
        ''
    });
    //end
    // hours for day
    hourlyCards.forEach((hour) => {
      const counter = parseInt(hour.children[0].children[1].textContent);
      hour.children[0].children[0].src =
        ''
      hour.children[1].textContent =
      ''
    });
}
load()
change_data('cairo')
//end
