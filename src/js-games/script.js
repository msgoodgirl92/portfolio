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
  
      
      
    }
    else{
      alert("Something went wrong, please come back later.");
    }
  }
}
}