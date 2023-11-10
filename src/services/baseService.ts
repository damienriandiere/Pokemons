import * as fs from "fs";
require('dotenv').config();
import jwt from 'jsonwebtoken';

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