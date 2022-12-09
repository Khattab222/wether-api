

let toggleBtn = document.getElementById("toggleBtn");
let navbarMenu = document.querySelector(".navbar-nav");

toggleBtn.addEventListener("click", function () {

    navbarMenu.classList.toggle("show-hide")
})





const d = new Date();
let dayofmonth = String(d).split(" ").slice(2,3).join();

let monthName;
let dayName;
let nextdayname;
let next3day;

// function to get month name
(function getMonthName() {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
monthName = month[d.getMonth()];


})();
// function to get day name
(function getDayName() {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 dayName = days[d.getDay()];
 nextdayname = days[d.getDay()+ 1];
 next3day = days[d.getDay()+ 2]


})();


let allData;

// fetch the data
async function getData (city="cairo") {
     const apiResponse =  await (await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f4ce0d3249f94d05b0a145843222103&q=${city}&days=3`)).json();
  
  
     allData= {...apiResponse}
     console.log(allData);

  return allData;
}



document.addEventListener("DOMContentLoaded",async function () {
    await getData ()
     display()

})


const today = document.querySelector(".today");
const nextday = document.querySelector(".next1day")
const next2day = document.querySelector(".next2day")

function display() {

    today.innerHTML = `
    <div class="item-head p-2 d-flex justify-content-between ">
              <div class="day">
                <div>${dayName}</div>
              </div>
              <div class="date">
                <div>${dayofmonth}  ${monthName}</div>
              </div>
            </div>
            <div class="item-body p-3">
              <div class="city my-3">${allData.location.name}</div>
              <div class="city my-3">${allData.location.country}</div>
              <div
                class="degree d-flex justify-content-between align-items-center flex-wrap"
              >
                <div class="cil">${allData.current.temp_c}&deg;C</div>
                <div><img class="status-img" src="${allData.current.condition.icon}" alt="" /></div>
              </div>
              <div class="status">${allData.current.condition.text}</div>
              <div class="details pt-3">
                <span
                  ><img class="" src="img/icon-umberella@2x.png" alt="" />
                  ${allData.current.cloud}%</span
                >
                <span><img src="img/icon-wind@2x.png" alt="" /> ${allData.current.wind_kph}km/h</span>
                <span><img src="img/icon-compass@2x.png" alt="" /> ${allData.current.wind_dir}</span>
              </div>
            </div>
    
    `;
    nextday.innerHTML = `
    <div class="item-head p-2 d-flex justify-content-center">
    <div>${nextdayname}</div>
  </div>
  <div class="item-body p-3">
    <div class="my-3">
      <img src="${allData.forecast.forecastday[1].day.condition.icon}" alt="" />
    </div>

    <div class="">
      <div class="cil2 mt-5">${allData.forecast.forecastday[1].day.maxtemp_c}&deg;C</div>
      <div class=" mb-5">${allData.forecast.forecastday[1].day.mintemp_c}&deg;C</div>
    </div>

    <div class="status">${allData.forecast.forecastday[1].day.condition.text}</div>
  </div>
    
    
    `;
    next2day.innerHTML = `
    <div class="item-head p-2 d-flex justify-content-center">
              <div>${next3day}</div>
            </div>
            <div class="item-body p-3">
              <div class="my-3">
                <img src="${allData.forecast.forecastday[2].day.condition.icon}" alt="" />
              </div>

              <div class="">
                <div class="cil2 mt-5">${allData.forecast.forecastday[2].day.maxtemp_c}&deg;C</div>
                <div class=" mb-5">${allData.forecast.forecastday[2].day.mintemp_c}&deg;C</div>
              </div>

              <div class="status">${allData.forecast.forecastday[2].day.condition.text}</div>
            </div>
    
    
    
    `

  

}






const searchInpute = document.getElementById("search");

// function on search
searchInpute.addEventListener('input', updateValue);
async function updateValue (e) {

    await getData (e.target.value)
    display()
   
} 















