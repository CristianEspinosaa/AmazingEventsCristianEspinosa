import * as functions from './modules.js';
let URL = 'https://aulamindhub.github.io/amazing-api/events.json'

fetch(URL)
.then(response => response.json())
.then(data => {
let containerCards = document.getElementById('containerCards')

let arrayfilterDate = data.events.filter(e => e.date > data.currentDate)
console.log(arrayfilterDate);


  let todasLasCategorias = arrayfilterDate.map(evento => evento.category)
  let categoriasFiltradas = [... new Set(todasLasCategorias)]
  
  
  for (let j = 0; j < categoriasFiltradas.length; j++) {
    let checksContainer = document.getElementById("check-box")
    checksContainer.innerHTML += `
      <div class="form-check form-check-inline">
        <input class="form-check-input checkBoxs" type="checkbox" id="${arrayfilterDate[j]._id}" value="${categoriasFiltradas[j]}" name="${categoriasFiltradas[j]}">
        <label class="form-check-label" for="${categoriasFiltradas[j]}">${categoriasFiltradas[j]}</label>
      </div>
    `
  };
  
  
  function filtrarCheckBoxs() {
    let checkBoxsAgregados = Array.from(document.querySelectorAll(".checkBoxs:checked")).map(category => category.value)
    let searchFilter = document.getElementById('search').value.toLowerCase()
  
  
    let filtroEventos = arrayfilterDate.filter(event => {
      let checkBoxcheckCategory = checkBoxsAgregados.includes(event.category) || checkBoxsAgregados.length === 0
      let search = event.name.toLowerCase().includes(searchFilter)
      
      return checkBoxcheckCategory && search
    })
      functions.renderCards(containerCards, filtroEventos)
    
  }
  
  
  
  document.querySelectorAll(".checkBoxs").forEach(checkBox => {
    checkBox.addEventListener('change' ,filtrarCheckBoxs)
  })
  document.getElementById('search').addEventListener('keyup', filtrarCheckBoxs)
  functions.renderCards(containerCards,arrayfilterDate)
  

})