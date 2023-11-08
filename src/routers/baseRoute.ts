import { Router, Request, Response } from "express";
import * as baseService from '../services/baseService';

const router = Router();

router.get('/api/v1/pokemons', (req: Request, res: Response)=> {
    const {page = 1} = req.query;
    const pokemons = baseService.pagination(parseInt(page));

    res.status(200).json(pokemons);
});

router.get('/api/v1/pokemons/search', (req: Request, res: Response)=> {
    const {nom = '', type = '', types = '', HP = 0} = req.query;
    const pokemons = baseService.search(nom, type, types, parseInt(HP));

    res.status(200).json(pokemons);
});

router.get('/api/v1/pokemons/:id', (req: Request, res: Response)=> {
    const {id = ''} = req.params;
    const pokemonID = baseService.getPokemonID(parseInt(id));
    
    if ("Pokemon not found" == pokemonID) {
        res.status(404);
    } else {
        res.status(200).json(pokemonID);
    }
});

export default router;