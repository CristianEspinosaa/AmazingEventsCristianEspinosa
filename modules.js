export {renderCards,
getMaxAttendancePercentage,
getMinAttendancePercentage,
findEventWhitLargeCapacity
}

function renderCards(containerCards, arrayEvents){

  
    containerCards.innerHTML = ""
  
    if (arrayEvents.length == 0) {
      containerCards.innerHTML = `
        <div class="col-12 text-center">
          <p>No se encontraron resultados para su búsqueda.</p>
        </div>
      `
    }else{
      for (let i = 0; i < arrayEvents.length; i++) {
        containerCards.innerHTML += `
                <div class="col-md-3" >
                    <div class="card card-custom" id="card">
                      <img src="${arrayEvents[i].image}" class="card-img-top" alt="${arrayEvents[i].name}">
                      <div class="card-body text-center">
                        <h5 class="card-title">${arrayEvents[i].name}</h5>
                        <p class="card-text">${arrayEvents[i].description}</p>
                        <div class="row d-flex justify-content-around">
                            <p class="card-text">${arrayEvents[i].price}</p>
                            <a href="./details.html?id=${arrayEvents[i]._id}" class="btn btn-dark">Details</a>
                        </div>
                      </div>
                    </div>
                </div>
        `
    }
    }
}

export function filtrarCheckBoxs(data, containerCards, searchInput) {
  let checkBox = document.querySelectorAll('.checkBoxs:checked');
  let searchFilter = searchInput.value.toLowerCase();

  let checkBoxsAgregados = Array.from(checkBox).map(category => category.value);

  let filtroEventos = data.events.filter(event => {
    let checkBoxcheckCategory = checkBoxsAgregados.includes(event.category) || checkBoxsAgregados.length === 0;
    let search = event.name.toLowerCase().includes(searchFilter);

    return checkBoxcheckCategory && search;
  });

  functions.renderCards(containerCards, filtroEventos);
}





function getMaxAttendancePercentage(events, container) {
  let maxPercentage = 0;
  let maxEvent = null;
 

  events.forEach(event => {
      let capacity = event.capacity;
      let estimate = event.estimate ? event.estimate : event.assistance;
      
      if (capacity && estimate) {
          let percentage = (estimate / capacity) * 100;
          
          if (percentage > maxPercentage) {
              maxPercentage = percentage;
              maxEvent = event;
          }
      }
  });

  container.innerHTML += `
  <p><strong>${maxEvent.name}</strong> with ${maxPercentage}%</p>
  ` 
}


function getMinAttendancePercentage(events, container) {
  let minPercentage = Infinity;
  let minEvent = null;
  

  events.forEach(event => {
      let capacity = event.capacity;
      let estimate = event.estimate ? event.estimate : event.assistance;
      
      if (capacity && estimate) {
          let percentage = (estimate / capacity) * 100;
          
          if (percentage < minPercentage) {
              minPercentage = percentage;
              minEvent = event;
          }
      }
  });

  container.innerHTML += `
  <p><strong>${minEvent.name}</strong> with ${minPercentage}%</p>
  ` 
}


function findEventWhitLargeCapacity (data, container){
  let eventsCapacity = []
  
  data.events.forEach(event => {
      if (event.capacity) {
          eventsCapacity.push(event.capacity)
      }
  });

  let maxCapacity = Math.max(...eventsCapacity);
  let evenMaxCapacity = data.events.find(e => e.capacity == maxCapacity)


  container.innerHTML += `
    <p><strong>${evenMaxCapacity.name}</strong> with ${maxCapacity} capacity</p>
  `
  
  
}
