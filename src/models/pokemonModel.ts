import mongoose, {Schema} from 'mongoose';

const PokemonSchema = new Schema({
    id: Number,
    name: {
        english: String,
        japanese: String,
        chinese: String,
        french: String
    },
    type: [String],
    base: {
        HP: Number,
        Attack: Number,
        Defense: Number,
        "Sp. Attack": Number,
        "Sp. Defense": Number,
        Speed: Number
    }
  });

const Pokemon = mongoose.model('pokemons', PokemonSchema);

export default Pokemon;