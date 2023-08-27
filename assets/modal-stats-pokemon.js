const content = document.getElementById('content')
const listPokemon = document.getElementById('pokemon-list')

const typesAbreviation = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD']

function modalPokemonCard(pokemon) {
  const types = pokemon.types.map(typeSlot => typeSlot.type.name)
  const stats = pokemon.stats.map(stat => stat)


  console.log(pokemon)
  const modalSection = `
  <section id="pokemon-information">
        <div class="pokemon-stats ${types[0]}">
          <header>
            <div>
              <button onclick="closeModal()">
                <img src="./assets/images/arrow_back.png" alt="" />
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
           <!-- <div class="about-pokemon">
              <h3 class="title ${types[0]}">About</h3>
              <ul class="about-list">
                <li>
                  <span>
                    <img src="./assets/images/weight-icon.svg" alt="">
                     kg
                  </span>
                  <span>
                    Weight
                  </span>
                </li>
                <li>
                  <span>
                    <img src="./assets/images/height.svg" alt="">
                    .2 m
                  </span>
                  <span>
                    Height
                  </span>
                </li>
                <li>
                  <span>
                    <p>Mega-push</p>
                    <p>Mega-p</p>
                  </span>
                  <span>
                  Ability
                  </span>
                </li>
              </ul>
            </div>
            -->
            <div class="base-stats">
              <h3 class="title ${types[0]}">Base Stats</h3>
              <ul class="stats">
                ${stats
                  .map((stat, i) => {
                    return `
                  <li>
                  <span class="stat ${types[0]}">${typesAbreviation[i]}</span>
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
      </section>
  `

  content.innerHTML += modalSection
}

let showCloseModal = true
function showPokemonModal(idPokemon) {
  getPokemonToModal(idPokemon)
  showCloseModal = false
}

function closeModal() {
  const sectionPokemonModal = document.querySelector('#pokemon-information')
  content.removeChild(sectionPokemonModal)
  showCloseModal = true
}

function getPokemonToModal(id) {
  const URLPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`
  return fetch(URLPokemon)
    .then(res => res.json())
    .then(dataPokemon => modalPokemonCard(dataPokemon))
}
