// Version: 1.0.2
let ville = 'Beograd';
const API_KEY = '858d04d03cb7fc6f6a5595a144036a1d';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

function showLoading() {
  hideLoading();
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'loading-indicator';
  loadingDiv.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">Učitavanje podataka...</div>
  `;
  document.body.appendChild(loadingDiv);
  loadingDiv.offsetHeight;
}

function hideLoading() {
  const loadingDiv = document.getElementById('loading-indicator');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

function recevoirTemperature(ville) {
  console.log('Fetching temperature for:', ville);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric`;

  return fetchWithRetry(url)
    .then(data => {
      console.log('Temperature data received:', data);
      let temperature = Math.round(data.main.temp);
      let ville = data.name;

      const tempElement = document.querySelector('#temperature_label');
      if (!tempElement) {
        console.error('Temperature element not found');
        return;
      }
      tempElement.style.animation = 'none';
      tempElement.offsetHeight;
      tempElement.style.animation = 'scaleIn 0.5s ease-out';

      const villeElement = document.querySelector('#ville');
      if (!villeElement) {
        console.error('City element not found');
        return;
      }
      villeElement.style.animation = 'none';
      villeElement.offsetHeight;
      villeElement.style.animation = 'typewriter 1s steps(20) forwards';

      tempElement.textContent = temperature;
      villeElement.textContent = ville;

      const weatherHumidity = document.querySelector('.weather-humidity');
      const weatherWind = document.querySelector('.weather-wind');
      const weatherPressure = document.querySelector('.weather-pressure');

      if (weatherHumidity && weatherWind && weatherPressure) {
        weatherHumidity.textContent = `Vlažnost: ${data.main.humidity}%`;
        weatherWind.textContent = `Vetar: ${Math.round(data.wind.speed * 3.6)} km/h`;
        weatherPressure.textContent = `Pritisak: ${data.main.pressure} hPa`;
      }

      updateWeatherUI(temperature);
    })
    .catch(error => {
      console.error('Error fetching temperature:', error);
      Swal.fire({
        title: 'Greška',
        text: 'Došlo je do greške pri dohvatanju temperature. Molimo proverite vašu internet konekciju i pokušajte ponovo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
}

// Inicijalno učitavanje podataka
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting weather fetch...');
  showLoading();

  try {
    Promise.all([
      recevoirTemperature(ville),
      recevoirForecast(ville)
    ]).then(() => {
      console.log('All data loaded successfully');
    }).catch(error => {
      console.error('Error loading data:', error);
    }).finally(() => {
      hideLoading();
    });
  } catch (error) {
    console.error('Error during initial load:', error);
    hideLoading();
  }
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

function recevoirForecast(ville) {
  console.log('Fetching forecast for:', ville);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${API_KEY}&units=metric`;

  fetchWithRetry(url)
    .then(data => {
      console.log('Forecast data received:', data);
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
            : '/portfolio/src/assets/images/sun.png';
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
      console.error('Error fetching forecast:', error);
      Swal.fire({
        title: 'Greška',
        text: 'Došlo je do greške pri dohvatanju prognoze. Molimo proverite vašu internet konekciju i pokušajte ponovo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
