const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
      .then((response) => response.json())
}

pokeApi.getPokemons = function (offset = 0, limit = 10) {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url) //busca de pokemon
    .then((response) => response.json()) //conversão da lista para json
    .then((jsonBody) => jsonBody.results) //pega a lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transforma a lista em uma nova lista de promessa de detralhes do pokemon
    .then((detailRequests) => Promise.all(detailRequests)) //espera a lista ser resolvida
    .then((pokemonsDetails) => pokemonsDetails)
}
