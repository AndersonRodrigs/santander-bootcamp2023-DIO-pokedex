const content = document.getElementById('pokemon-information')
const listPokemon = document.getElementById('pokemon-list')

const typesNamesAbreviation = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD']

function modalPokemonCard(pokemon) {
  const types = pokemon.types.map(typeSlot => typeSlot.type.name)
  const stats = pokemon.stats.map(stat => stat)
  console.log(pokemon)
  const modalSection = `
      <div class="content-modal">        
        <div class="pokemon-stats ${types[0]}">
          <header>
            <div>
              <button onclick="closeModal()">
                <img src="./assets/images/arrow-icon.svg" alt="" />
              </button>
              <h2 class="pokemon-name">${pokemon.name}</h2>
            </div>
            <span class="number">#${pokemon.id}</span>
          </header>
          <div class="information">
            <div class="content-initial">
              <img src="${
                pokemon.sprites.other.dream_world.front_default
              }" alt="" />
              <ol>
                ${types
                  .map(type => `<li class="type ${type}">${type}</li>`)
                  .join('')}
              </ol>
            </div>
           <div class="about-pokemon">
              <h3 class="title ${types[0]}">About</h3>
              <ul class="about-list">
                <li>
                  <span>
                    <img src="./assets/images/weight-icon.svg" alt="">
                    ${pokemon.weight / 10} kg
                  </span>
                  <span>
                    Weight
                  </span>
                </li>
                <li>
                  <span>
                    <img src="./assets/images/height-icon.svg" alt="">
                    ${pokemon.height / 10} m
                  </span>
                  <span>
                    Height
                  </span>
                </li>
                <li>
                  <span>
                  <p>${pokemon.moves[0].move.name}</p>
                  <p>${pokemon.moves[1].move.name}</p>
                  </span>
                  <span>
                  Moves
                  </span>
                </li>
              </ul>
            </div>
            <div class="base-stats">
              <h3 class="title ${types[0]}">Base Stats</h3>
              <ul class="stats">
                ${stats
                  .map((stat, i) => {
                    return `
                  <li>
                  <span class="stat ${types[0]}">${typesNamesAbreviation[i]}</span>
                    <div class="stat-bar">
                      <span class="number-stat">${stat.base_stat}</span>
                      <div class="bar">
                        <span class="${types[0]}" style="width:${stat.base_stat}% ";></span>
                      </div>
                    </div>
                  </li>
                    `
                  })
                  .join('')} 
              </ul>
            </div>
          </div>
        </div>
      </div>
  `

  content.innerHTML += modalSection
}

function showPokemonModal(idPokemon) {
  getPokemonToModal(idPokemon)
}

function closeModal() {
  const sectionPokemonModal = document.querySelector('.content-modal')
  content.removeChild(sectionPokemonModal)
}

function getPokemonToModal(id) {
  const URLPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`
  fetch(URLPokemon)
    .then(res => {
      invalidPokemonInput(res.status)
      return res.json()
    })
    .then(dataPokemon => modalPokemonCard(dataPokemon))
    .catch(e => {
      invalidPokemonInput(e)
    })
}

const inputValue = document.querySelector('#search-pokemon')
function invalidPokemonInput(e) {
  if (e === 200) {
    inputValue.classList.remove('invalid')
  } else {
    inputValue.classList.add('invalid')
    inputValue.value = ''
  }
}

function buscar() {
  getPokemonToModal(inputValue.value.toLowerCase())
}

const sectionSearch = document.getElementById('search-section')

sectionSearch.addEventListener('submit', e => e.preventDefault())
sectionSearch.addEventListener('keypress', e => {
  inputValue.classList.remove('invalid')
})
