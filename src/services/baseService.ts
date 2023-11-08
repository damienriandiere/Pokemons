import * as fs from "fs";

const pathPokedex = "./src/data/pokedex.json";

export function getPokemons() {
    const pokemons = JSON.parse(fs.readFileSync(pathPokedex).toString());

    return pokemons;
}

export function pagination(page: number){
    if (page < 1 || page > 81) {
        return 'The page number ' + page + ' does not exist !'; 
    } else {
        const pokemons = getPokemons().slice((page - 1)*10, page * 10);
        return pokemons;
    }

}

export function getPokemonID(id: number) {
    let pokemons = getPokemons();

    pokemons = pokemons.find((pokemon : any) => pokemon.id === id);

    if (pokemons === undefined){
        console.log('Pokemon not found with the ID : ', id);
        return 'Pokemon not found with the ID : ' + id;
    } else {
        return pokemons;
    }
}

export function search(nom : string, type : string, types:string[], HP : number) {
    let pokemons = getPokemons();
    if ('' != nom) {
        pokemons = pokemons.filter((pokemon : any) => pokemon.name.french === nom);
    }

    if ('' != type) {
        if (types.length = 0){
            types = [];
        }
        types = [...types, type]
        pokemons = pokemons.filter((pokemon : any) => pokemon.type.includes(type));
    }

    if (0 != HP){
        if (HP < 0) {
            return 'HP cannot be negative !';
        } else{
            pokemons = pokemons.filter((pokemon : any) => pokemon.base.HP === HP);
        }
    }

    return pokemons;
}