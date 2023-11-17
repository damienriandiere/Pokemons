import Pokemon from '../models/pokemonModel';

export async function createPokemon(body: any){
    try {
      const nouveauPokemon = new Pokemon({
        id: body.id,
        name: {
          english: body.name.english,
          japanese: body.name.japanese,
          chinese: body.name.chinese,
          french: body.name.french,
        },
        type: body.type,
        base: {
          HP: body.base.HP,
          Attack: body.base.Attack,
          Defense: body.base.Defense,
          'Sp. Attack': body.base['Sp. Attack'],
          'Sp. Defense': body.base['Sp. Defense'],
          Speed: body.base.Speed,
        },
      });
  
      await nouveauPokemon.save();
      console.log('Pokemon created successfully');
      return true;
    } catch (error) {
      console.error('Error creating Pokemon:', error);
      return false; 
    }
}

export async function deletePokemonById(pokemonId: number){
    try {
      const deletedPokemon = await Pokemon.findOneAndDelete({ id: pokemonId });
  
      if (deletedPokemon) {
        console.log(`Pokemon with ID ${pokemonId} deleted successfully.`);
        return true;
      } else {
        console.log(`Pokemon with ID ${pokemonId} not found.`);
        return false;
      }
    } catch (error) {
      console.error('Error deleting Pokemon :', error);
      return false;
    }
};

export async function updatePokemonById(pokemonId: number, body: any){
    try {
      const updatedPokemon = await Pokemon.findOneAndUpdate(
        { id: pokemonId },
        {
            name : {
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
        },
        { new: true }
      );
  
      if (updatedPokemon) {
        console.log(`Pokemon with ID ${pokemonId} updated successfully`);
        console.log(updatedPokemon);
        return true;
      } else {
        console.log(`Pokemon with ID ${pokemonId} not found`);
        return false;
      }
    } catch (error) {
      console.error('Error updating Pokemon:', error);
      return false;
    }
  };

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

export async function getPokemonID(pokemonId: number) {
    const pokemon = await Pokemon.findOne({ id: pokemonId });

    if (pokemon === undefined){
        console.log('Pokemon not found with the ID : ', pokemonId);
        return 'Pokemon not found with the ID : ' + pokemonId;
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