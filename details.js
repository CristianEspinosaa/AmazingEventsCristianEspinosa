const urlParams = new URLSearchParams(window.location.search)
const eventId = urlParams.get('id')
let URL = 'https://aulamindhub.github.io/amazing-api/events.json'

fetch(URL)
.then(response => response.json())
.then(data => {
  console.log(data, data.events);
  
  let container = document.getElementById('container')

  let evento = data.events.find(e => e._id == eventId)
  
  container.innerHTML += `
    <div class="event-card">
                  <div class="col-md-6">
                    <img src="${evento.image}" alt="costumer party">
                  </div>
                  <div class="event-details">
                    <h3>${evento.name}</h3>
                    <p>${evento.description}</p>
                    <p>Date: ${evento.date}</p>
                    <p>Pice: ${evento.price}</p>
                    <p>Place: ${evento.place}</p>
                  </div>
                </div>
  
  `
  
})


