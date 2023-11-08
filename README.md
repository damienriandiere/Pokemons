# Pokemons

Create a new NodeJS project that exposes services with Express.

The project must adhere to the following site architecture concepts:

[Model architecture](https://ludovicwyffels.dev/node-architecture/)

The purpose of the api is to expose the following file: 

[Database](https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json)

We use the file as if it were our data source (Database). It is loaded in memory.

1) the/api/v1/pokemons API exposes all pokemon with pagination.

2) API/api/v1/pokemons/:id exposes pokémon number:id

3) the/api/v1/pokemons/search API allows searching for pokémon according to criteria (French name, type (or typeS), hp ).
