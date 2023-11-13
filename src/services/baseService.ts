import * as fs from "fs";
require('dotenv').config();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://student:student@pokedex0.yhyr1o3.mongodb.net/pokedex?retryWrites=true&replicaSet=atlas-zf4fz1-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connexion à la base de données établie.');
});

const pokemonSchema = new mongoose.Schema({
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

const Pokemon = mongoose.model('pokemons', pokemonSchema);
const pathPokedex = process.env.PATH_POKEDEX;
const pathUsers = process.env.PATH_USERS;

function generateAccessToken(mail : string) {
    return jwt.sign({email : mail}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
}

function generateRefreshToken(mail : string) {
    return jwt.sign({email : mail}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
}

export function login(email: string){
    const users = JSON.parse(fs.readFileSync(pathUsers).toString());
    const search = users.find((user : any) => user.email === email);
    if (search === undefined) {
        return false;
    } else {
        const accessToken = generateAccessToken(email);
        const refreshToken = generateRefreshToken(email);
        return {accessToken, refreshToken};
    }
}

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

export function getPokemons() {
    return Pokemon.find();
}

export function pagination(page: number){
    if (page < 1 || page > 81) {
        return 'The page number ' + page + ' does not exist !'; 
    } else {
        //const pokemons = getPokemons().slice((page - 1)*10, page * 10);
        //return pokemons;
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
        //pokemons = pokemons.filter((pokemon : any) => pokemon.name.french === nom);
    }

    if ('' != type) {
        if (types.length = 0){
            types = [];
        }
        types = [...types, type]
        //pokemons = pokemons.filter((pokemon : any) => pokemon.type.includes(type));
    }

    if (0 != HP){
        if (HP < 0) {
            return 'HP cannot be negative !';
        } else{
            //pokemons = pokemons.filter((pokemon : any) => pokemon.base.HP === HP);
        }
    }

    return pokemons;
}