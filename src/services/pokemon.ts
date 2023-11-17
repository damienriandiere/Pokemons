import Pokemon from '../models/pokemonModel';

export function createPokemon(body: any){
    const nouveauPokemon = new Pokemon({
        id: body.id,
        name: {
          english: body.name.english,
          japanese: body.name.japanese,
          chinese: body.name.chinese,
          french: body.name.french
        },
        type: body.type,
        base: {
          HP: body.base.HP,
          Attack: body.base.Attack,
          Defense: body.base.Defense,
          "Sp. Attack": body.base["Sp. Attack"],
          "Sp. Defense": body.base["Sp. Defense"],
          Speed: body.base.Speed
        }
    });
    nouveauPokemon.save();
}

export async function getPokemons() {
    const pokemons = await Pokemon.find();
    return pokemons;
}

export async function pagination(page: number){
    if (page < 1 || page > 81) {
        return 'The page number ' + page + ' does not exist !'; 
    } else {
        const pokemons = await Pokemon.find().skip((page - 1)*10).limit(10);
        return pokemons;
    }

}

export async function getPokemonID(id: number) {
    const pokemon = await Pokemon.findOne({ id: id });

    if (pokemon === undefined){
        console.log('Pokemon not found with the ID : ', id);
        return 'Pokemon not found with the ID : ' + id;
    } else {
        return pokemon;
    }
}

export async function search(nom : string, type : string, types:string[], HP : number) {
    try{
        let query: any = {};
        if (nom) {
            query['name.french'] = new RegExp(nom, 'i');
        }
    
        if (type) {
            types.push(type);
            query.type = { $in: types };
        }
    
        if (HP > 0) {
            query['base.HP'] = { $gte: HP };
        }
    
        const pokemons = await Pokemon.find(query).exec();
        return pokemons;
    } catch (error) {
      console.error('Error searching pokemons:', error);
      throw error;
    }
}