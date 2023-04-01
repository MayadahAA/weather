const form = document.querySelector('form');
const input = document.querySelector('#city');
const weatherInfo = document.querySelector('#weather-info');

// Retrieve the saved state and set the weather information div to that state
window.addEventListener('load', () => {
  const savedState = localStorage.getItem('weatherInfoState');
  if (savedState) {
    weatherInfo.innerHTML = savedState;
    weatherInfo.style.display = 'block';
  }
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = input.value;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=56d3cce10e4140139c522357230104&q=${city}&lang=ar`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {location: {name, country}, current: {temp_c, humidity, condition: {text, icon}, wind_kph}} = data;
            const weatherHTML = `
                <h2>${name}, ${country}</h2>
                <p>${text}</p> <img src="${icon}" alt="weather icon">
                <p>درجة الحرارة: ${temp_c} &#8451;</p>
                <p>الرطوبة: ${humidity}%</p>
                <p>سرعة الرياح: ${wind_kph} kph</p>
            `;
            weatherInfo.innerHTML = weatherHTML;
            weatherInfo.style.display = 'block';
            // Save the current state of the weather information div
            localStorage.setItem('weatherInfoState', weatherHTML);
        })
        .catch(error => console.log(error));});
