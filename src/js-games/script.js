// Version: 1.0.2
let ville = 'Beograd';

// Inicijalno učitavanje podataka
document.addEventListener('DOMContentLoaded', function() {
  recevoirTemperature(ville);
  recevoirForecast(ville);
});

let changerDeville = document.querySelector('#changer');
changerDeville.addEventListener('click', () => {
  Swal.fire({
    title: 'Za koji GRAD bi zeleli videti prognozu?',
    input: 'text',
    inputLabel: 'Unesite ime grada',
    inputPlaceholder: 'Beograd',
    showCancelButton: true,
    confirmButtonText: 'Prikaži',
    cancelButtonText: 'Odustani',
    customClass: {
      popup: 'swal2-modern',
      confirmButton: 'swal2-confirm-button',
      cancelButton: 'swal2-cancel-button'
    },
    inputValidator: (value) => {
      if (!value) {
        return 'Morate uneti ime grada!';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      ville = result.value;
      if (ville) {
        recevoirTemperature(ville);
        recevoirForecast(ville);
      }
    }
  });
});

function recevoirTemperature(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=858d04d03cb7fc6f6a5595a144036a1d&units=metric';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let temperature = Math.round(data.main.temp);
      let ville = data.name;

      // Animacija za temperaturu
      const tempElement = document.querySelector('#temperature_label');
      tempElement.style.animation = 'none';
      tempElement.offsetHeight; // Trigger reflow
      tempElement.style.animation = 'scaleIn 0.5s ease-out';

      // Animacija za grad
      const villeElement = document.querySelector('#ville');
      villeElement.style.animation = 'none';
      villeElement.offsetHeight; // Trigger reflow
      villeElement.style.animation = 'typewriter 1s steps(20) forwards';

      tempElement.textContent = temperature;
      villeElement.textContent = ville;

      // Prikazujemo današnje vremenske podatke
      const weatherHumidity = document.querySelector('.weather-humidity');
      const weatherWind = document.querySelector('.weather-wind');
      const weatherPressure = document.querySelector('.weather-pressure');

      weatherHumidity.textContent = `Vlažnost: ${data.main.humidity}%`;
      weatherWind.textContent = `Vetar: ${Math.round(data.wind.speed * 3.6)} km/h`;
      weatherPressure.textContent = `Pritisak: ${data.main.pressure} hPa`;

      updateWeatherUI(temperature);
      console.log('Temperatura primljena: ', temperature);
    })
    .catch(error => {
      console.error('Greška:', error);
      alert("Došlo je do greške. Molimo pokušajte ponovo kasnije.");
    });
}

function recevoirForecast(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + ville + '&appid=858d04d03cb7fc6f6a5595a144036a1d&units=metric';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Postavljamo današnji datum kao početnu tačku
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      // Filtriramo i grupišemo podatke po danima
      let forecasts = [];
      let dailyTemps = {};

      // Filtriramo sve podatke koji su pre sutrašnjeg dana
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        date.setHours(0, 0, 0, 0);

        // Preskačemo današnji dan
        if (date.getTime() <= today.getTime()) return;

        const dateStr = date.toISOString().split('T')[0];

        // Prikupljamo sve temperature za svaki dan
        if (!dailyTemps[dateStr]) {
          // Određujemo ikonu na osnovu temperature
          let icon = item.weather[0].icon;
          const temp = Math.round(item.main.temp);

          // Ako je temperatura iznad 25°C, koristimo sunčanu ikonu
          if (temp > 25) {
            icon = '01d'; // sunčano
          }

          dailyTemps[dateStr] = {
            temps: [],
            icon: icon,
            date: date.toLocaleDateString('sr-RS', { day: 'numeric', month: 'short' }),
            day: date.toLocaleDateString('sr-RS', { weekday: 'long' }),
            timestamp: date.getTime(),
            description: item.weather[0].description,
            humidity: item.main.humidity,
            windSpeed: Math.round(item.wind.speed * 3.6), // Konverzija iz m/s u km/h
            pressure: item.main.pressure
          };
        }
        dailyTemps[dateStr].temps.push(Math.round(item.main.temp));
      });

      // Računamo min i max za svaki dan
      Object.values(dailyTemps).forEach(dayData => {
        const minTemp = Math.min(...dayData.temps);
        const maxTemp = Math.max(...dayData.temps);
        forecasts.push({
          ...dayData,
          minTemp,
          maxTemp
        });
      });

      // Sortiramo po datumu
      forecasts.sort((a, b) => a.timestamp - b.timestamp);

      // Prikazujemo prognozu
      const forecastContainer = document.querySelector('#forecast');
      forecastContainer.innerHTML = '';

      // Prikazujemo tačno 5 dana
      forecasts.slice(0, 5).forEach(data => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';

        // Određujemo ikonu na osnovu maksimalne temperature
        let iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        if (data.maxTemp > 25) {
          // Prvo pokušaj lokalno, zatim za GitHub Pages
          iconUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')
            ? '../assets/images/sun.png'
            : 'src/assets/images/sun.png';
        }

        forecastItem.innerHTML = `
          <div class="forecast-day">${data.day}</div>
          <div class="forecast-date">${data.date}</div>
          <img class="forecast-icon" src="${iconUrl}" alt="Weather icon">
          <div class="forecast-temp">
            <span class="max-temp">${data.maxTemp}°C</span>
            <span class="min-temp">${data.minTemp}°C</span>
          </div>
          <div class="forecast-details">
            <div class="forecast-description">${data.description}</div>
            <div class="forecast-humidity">Vlažnost: ${data.humidity}%</div>
            <div class="forecast-wind">Vetar: ${data.windSpeed} km/h</div>
            <div class="forecast-pressure">Pritisak: ${data.pressure} hPa</div>
          </div>
        `;
        forecastContainer.appendChild(forecastItem);
      });
    })
    .catch(error => {
      console.error('Greška pri dohvatanju prognoze:', error);
    });
}

// Rain animation JavaScript
const raindrops = document.querySelectorAll('.raindrop');
const rainContainer = document.querySelector('.rain-container');

if (rainContainer) {
  const containerWidth = rainContainer.offsetWidth;

  raindrops.forEach((drop) => {
    const randomLeft = Math.random() * containerWidth;
    const randomDelay = Math.random() * 1;
    const randomDuration = 0.8 + Math.random() * 0.4;

    drop.style.left = `${randomLeft}px`;
    drop.style.animationDelay = `${randomDelay}s`;
    drop.style.animationDuration = `${randomDuration}s`;
  });
}

function updateWeatherUI(temperature) {
  const body = document.body;
  const rainContainer = document.querySelector('.rain-container');

  // Reset classes
  body.classList.remove('sunny-theme', 'cloudy-theme');
  if (rainContainer) {
    rainContainer.style.display = 'none';
  }

  if (temperature > 25) {
    body.classList.add('sunny-theme');
  } else {
    body.classList.add('cloudy-theme');
  }
}
