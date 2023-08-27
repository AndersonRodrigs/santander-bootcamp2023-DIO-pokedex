const pokemonList = document.getElementById('pokemon-list')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 1
const maxRecords = 151
// ------------------------ //

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        pokemon =>
          `
      <li class="pokemon ${pokemon.type}"  onclick="showPokemonModal(${
            pokemon.id
          })">
      <span class="number"> #${pokemon.id} </span>
      <span class="name">${pokemon.name}</span>
      
      <div class="detail">
      <ol class="types">
      ${pokemon.types
        .map(type => `<li class="type ${type}">${type}</li>`)
        .join('')}
        </ol>
        <img
        src="${pokemon.img}"
        alt="${pokemon.name}"
        />
        </div>
        </li>`
      )
      .join('')

    pokemonList.innerHTML += newHtml
  })
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtRecordNextPage = offset + limit
  if (qtRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
    return
  } else {
    loadPokemonItens(offset, limit)
  }
})
