/*description: I have used ChatGpt to guide on this Assignment mainly on Convert currency function that was not working*

the APIS and URLS with the keys I have stored in the file .env/ to be excluded from repository usuing .gitignore* - learnt from chatgpt how to do it*/

const WEATHER_KEY = "API_KEY";
const WEATHER_URL =`https://api.openweathermap.org/data/2.5/weather?q=Calgary,CA&units=metric&appid=${WEATHER_KEY}`;


document.addEventListener("DOMContentLoaded", () => {
    loadWeather();
})
function displayWeather(data){
    document.getElementById("temp").textContent = `Temperature: ${data.main.temp}`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("timestamp").textContent = `Updated at: ${new Date().toLocaleDateString()}`;
}

function loadWeather() {
    //it checks if there is localstorage already in it
    const saveWeather = JSON.parse(localStorage.getItem("weatherData"));
    const now = Date.now();


    if(saveWeather && (now - saveWeather.timestamp < 10 * 60 * 1000))
    {
        displayWeather(saveWeather.data);
    }else{
        //search the API
        fetch(WEATHER_URL)
        .then(response =>  response.json())
        .then(data => {
            //save into the timestamp
            localStorage.setItem("weatherData", JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));

            displayWeather(data);
    })
    .catch(err => {
        console.error("Error finding the weather at this moment", err);
        document.getElementById("temp").textContent = "Error loading the Weather";
        });
    }
}

//===============================CURRENCY EXCHANGE ==========================//

const CURRENCY_URL = "https://v6.exchangerate-api.com/v6/API_KEY/latest/USD";
const CURRENCY_STORAGE_KEY = "currentRates";
const CURRENT_STORAGE_TIME = 1000 * 60 * 60; //one hour

document.addEventListener("DOMContentLoaded", () => {
    initCurrency();
});

function initCurrency(){
    const saved = JSON.parse(localStorage.getItem(CURRENCY_STORAGE_KEY));
    const now = Date.now();


    if(saved && (now - saved.timestamp < CURRENT_STORAGE_TIME)){
        setupCurrencyUI(saved.rates);
    }else{
        fetch(CURRENCY_URL)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify({
                rates: data.conversion_rates,
                timestamp: Date.now()

            }));
            setupCurrencyUI(data.conversion_rates);
        })
        .catch(err => console.error("Currency API Error:", err));
    }
 
}


function setupCurrencyUI(rates){
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    //select the ten most popular currencies

    const popularCurrencies = ["USD", "CAD", "EUR", "GBP", "BRL", "JPY", "AUD", "CNY", "INR", "CHF"];

    popularCurrencies.forEach(currency => {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        fromSelect.add(option1);
        toSelect.add(option2);
         });

         fromSelect.value = "USD";
         toSelect.value= "CAD";

         document.getElementById("convertBtn").addEventListener("click", () =>{
            convertCurrency(rates);
         });
        }

         function  convertCurrency(rates){
            const amount = parseFloat(document.getElementById("amount").value);
            const from = document.getElementById("fromCurrency").value;
            const to = document.getElementById("toCurrency").value;

            if(isNaN(amount) || amount <=0){
                alert("Please Enter a valid value");
                return;

            }

            const rate = rates[to] / rates[from];
            const converted = (amount * rate).toFixed(2);

            document.getElementById("rateDisplay").textContent=`1 ${from} = ${rate.toFixed(4)} ${to}`;
            document.getElementById("result").textContent = `${amount} ${from} = ${converted} ${to}`;
         }