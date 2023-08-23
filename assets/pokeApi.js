const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 15) => {
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(URL)
    .then(res => res.json())
    .then(data => data.results)
    .catch(e => console.log(e))
}
