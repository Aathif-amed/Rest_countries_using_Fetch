let h1 = document.createElement("h1");
h1.setAttribute("id", "title");
h1.classList.add("text-center");
h1.innerHTML = "Countries Data using Fetch API"

let div = document.createElement("div");
div.classList.add("container");

let row = document.createElement("div");
row.classList.add("row");



div.append(row);

document.body.append(h1, div);
let count = 0;
let countries_data = fetch("https://restcountries.com/v2/all");
countries_data.then((data) => data.json()).then((details) => {
    let str;
    for (let i = 0; i < details.length; i++) {
        let col = document.createElement("div");
        col.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4");

        //to handle undefined capital of countries
        if (details[i].capital != undefined) {
            str = details[i].capital;
        } else {
            str = "NA"
        }

        col.innerHTML = `
       
        <div class="card text-white bg-secondary mb-3 h-100 mt-3" style="max-width: 18rem;">
        <div class="card-header">
        <h4 class="text-center">${details[i].name}</h4>
        </div>
        <div class="card-body text-center" id="weather_data${[i]}">
            <img src="${details[i].flag}" class="card-img-top mb-2" alt="..." style="height:152px; width:252px">
            <div class="card-text">Capital: ${str}</div>
            <div class="card-text">Region: ${details[i].region}</div>
            <div class="card-text">CountryCode: ${details[i].alpha3Code}</div>
            <button type="submit" id="weather${[i]}" class="btn btn-dark mt-2">Click For Weather</button>
          </div>
       
     </div>`;
        row.append(col);
        let button = document.getElementById("weather" + [i]);
        button.addEventListener("click", () => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${details[i].name}&appid=992f93383e2a578810746c00a6cef06f`
            let weatherData = fetch(url);
            weatherData.then((data) => data.json()).then((wdata) => {

                //to handle undefined or error in temperatue data
                let temp;
                console.log(wdata)
                if (wdata.cod == 404) {
                    temp = wdata.message;

                } else {
                    temp = ((wdata.main.temp) - 273.15).toFixed(2) + "&#176C" //to convert kelvin into celcius  (kelvin-273.15=celcius) and &#176 is to add degree symbol
                }

                let wd = document.getElementById("weather_data" + [i]);


                wd.innerHTML += `<p class="card-text">Temperature: ${temp}</p>`



            }).catch((err) => console.log(err));

        })
    }
}).catch((err) => console.log(err));