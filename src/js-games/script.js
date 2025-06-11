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
      let forecastData = data.list;

      // Grupišemo podatke po danima
      let dailyForecasts = {};
      let today = new Date();
      today.setHours(0, 0, 0, 0); // Postavljamo vreme na početak dana

      forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        date.setHours(0, 0, 0, 0); // Postavljamo vreme na početak dana za poređenje

        // Preskačemo današnji dan
        if (date.getTime() === today.getTime()) return;

        const day = date.toLocaleDateString('sr-RS', { weekday: 'long' });
        const dateStr = date.toLocaleDateString('sr-RS', { day: 'numeric', month: 'short' });

        if (!dailyForecasts[day]) {
          dailyForecasts[day] = {
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon,
            date: dateStr,
            timestamp: date.getTime() // Dodajemo timestamp za sortiranje
          };
        }
      });

      // Prikazujemo prognozu
      const forecastContainer = document.querySelector('#forecast');
      forecastContainer.innerHTML = '';

      // Sortiramo po datumu i uzimamo prvih 5 dana
      Object.entries(dailyForecasts)
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)
        .slice(0, 5)
        .forEach(([day, data]) => {
          const forecastItem = document.createElement('div');
          forecastItem.className = 'forecast-item';
          forecastItem.innerHTML = `
            <div class="forecast-day">${day}</div>
            <img class="forecast-icon" src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon">
            <div class="forecast-temp">${data.temp}°C</div>
            <div class="forecast-date">${data.date}</div>
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
