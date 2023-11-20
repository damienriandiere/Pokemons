import Pokemon from '../models/pokemonModel';
const logger = require('../loggers/loggers');

export async function createPokemon(body: any) {
  logger.info('createPokemon')
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
    logger.info('Pokémon créé avec succès.');
    return true;
  } catch (error) {
    logger.error('Erreur durant la création du pokémon : ', error);
    return false;
  }
}

export async function deletePokemonById(pokemonId: number) {
  logger.info('deletePokemonById')
  try {
    const deletedPokemon = await Pokemon.findOneAndDelete({ id: pokemonId });

    if (deletedPokemon) {
      logger.info(`Le pokémon avec l'ID {${pokemonId}} supprimé avec succès.`);
      return true;
    } else {
      logger.info(`Le pokémon avec l'ID {${pokemonId}} n'a pas été trouvé.`);
      return false;
    }
  } catch (error) {
    logger.error('Erreur durant la suppression du pokméon : ', error);
    return false;
  }
};

export async function updatePokemonById(pokemonId: number, body: any) {
  logger.info('updatePokemonById')
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: pokemonId },
      {
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
      },
      { new: true }
    );

    if (updatedPokemon) {
      logger.info(`Le pokémon avec l'ID {${pokemonId}} mis à jour avec succès : `);
      logger.info(updatedPokemon);
      return true;
    } else {
      logger.info(`Le pokémon avec l'ID {${pokemonId}} n'a pas été trouvé.`);
      return false;
    }
  } catch (error) {
    logger.error('Erreur durant la mise à jour du pokémon : ', error);
    return false;
  }
};

export async function getPokemons() {
  logger.info('getPokemons')
  const pokemons = await Pokemon.find();
  logger.info('Récupération de tous les pokémons réussie.');
  return pokemons;
}

export async function pagination(page: number) {
  logger.info('pagination')
  if (page < 1 || page > 81) {
    logger.error('La page demandée n\'existe pas : ', page);
    throw new Error('The page number ' + page + ' does not exist !');
  } else {
    const pokemons = await Pokemon.find().skip((page - 1) * 10).limit(10);
    return pokemons;
  }
}

export async function getPokemonID(pokemonId: number) {
  logger.info('getPokemonID')
  const pokemon = await Pokemon.findOne({ id: pokemonId });

  if (pokemon === undefined) {
    logger.warn(`Pas de pokémon trouvé avec l\'id : ${pokemonId}`);
    return 'Pokemon not found with the ID : ' + pokemonId;
  } else {
    logger.info(`Correspondance trouvé avec l\'id : ${pokemonId}`);
    return pokemon;
  }
}

export async function search(nom: string, type: string, types: string[], HP: number) {
  logger.info('search')
  try {
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
    logger.info('Recherche de pokémon réussie.');
    return pokemons;
  } catch (error) {
    logger.error('Erreur durant la recherche de pokémon : ', error);
    throw error;
  }
}