# Weather and Currency Converter App 🌦️💱

This project is a simple web application that demonstrates the use of JavaScript and public APIs to retrieve and display **current weather data** and **currency exchange rates**. It also includes **localStorage** to cache results and apply basic **rate limiting**.

---

## 🧠 Features

### 🔹 Weather (OpenWeatherMap API)
- Shows the current temperature, weather condition, and last updated time for **Calgary**
- Caches the result for 10 minutes using `localStorage`
- Uses API Key stored in a `.env` file (**not included in this repo**)

### 🔹 Currency Converter (ExchangeRate API)
- Allows users to convert between 10 different currencies
- Displays exchange rate and converted value
- Caches exchange rate data for 1 hour using `localStorage`

---

## 🧪 Technologies Used

- HTML5
- CSS3
- JavaScript (vanilla)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [ExchangeRate-API](https://www.exchangerate-api.com/)

---

## ⚠️ API Keys

This project uses a **private weather API key** from OpenWeatherMap.  
To avoid exposing it, the key is stored in a `.env` file that is **excluded from version control**.

### 🔒 How to use your own `.env` file:

1. Create a file in the root directory called `.env`
2. Add your OpenWeatherMap API key like this:

