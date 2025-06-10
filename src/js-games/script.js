let ville ='Beograd';
recevoirTemperature(ville);

let changerDeville = document.querySelector('#changer');
changerDeville.addEventListener('click',() => {
   ville = prompt ('Za koji GRAD bi zeleli videti prognozu?');
   recevoirTemperature(ville);
});

function recevoirTemperature(ville){
const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ville+'&appid=858d04d03cb7fc6f6a5595a144036a1d&units=metric';


let requete = new XMLHttpRequest();
requete.open('GET', url);
requete.responseType = 'json';
requete.send();

requete.onload = function(){
  if(requete.readyState === XMLHttpRequest.DONE){
    if(requete.status === 200){
      let reponse = requete.response;
      let temperature = reponse.main.temp;
      let ville       = reponse.name;
      document.querySelector('#temperature_label').textContent = temperature;
      document.querySelector('#ville').textContent =  ville;

      updateWeatherUI(temperature);

    }
    else{
      alert("Something went wrong, please come back later.");
    }
  }
}

// Rain animation JavaScript
const raindrops = document.querySelectorAll('.raindrop');
const rainContainer = document.querySelector('.rain-container');

if (rainContainer) {
  const containerWidth = rainContainer.offsetWidth;

  raindrops.forEach((drop) => {
    const randomLeft = Math.random() * containerWidth;
    const randomDelay = Math.random() * 1; // delay up to 1 second
    const randomDuration = 0.8 + Math.random() * 0.4; // duration between 0.8s and 1.2s

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
    rainContainer.style.display = 'none'; // Hide rain by default
  }

  if (temperature > 25) {
    body.classList.add('sunny-theme');
    // Sakrij animaciju kiše
  } else if (temperature < 20) {
    body.classList.add('cloudy-theme');
    if (rainContainer) {
      rainContainer.style.display = 'block'; // Prikaži animaciju kiše
    }
  } else {
    // Podrazumevani izgled za temperature između 20 i 25
    // Možda ostaviti default pozadinu ili dodati treću temu
  }
}
}
