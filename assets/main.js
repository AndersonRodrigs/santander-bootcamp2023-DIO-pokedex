pokeApi
  .getPokemons()
  .then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('')
  })
  .catch(e => console.log(e))

// ------------------------ //

const pokemonList = document.getElementById('pokemonList')
function convertPokemonToHtml(pokemon) {
  return `
   <li class="pokemon">
          <span class="number"> #001 </span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              <li class="type">grass</li>
              <li class="type">po</li>
            </ol>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"
              alt="${pokemon.name}"
            />
          </div>
        </li>
   `
}
