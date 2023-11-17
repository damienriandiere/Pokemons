import { Router, Request, Response } from "express";
import * as pokemonService from '../services/pokemon';

const router = Router();

router.post('/api/v1/pokemons/create', (req: Request, res: Response)=> {
    const body = req.body;
    const pokemons = pokemonService.createPokemon(body);
    if (pokemons) {
        res.status(200);
    } else {
        res.status(404);
    }
});

router.post('/api/v1/pokemons/delete', async (req: Request, res: Response)=> {
    const {id = ''} = req.query;
    const pokemons = await pokemonService.deletePokemonById(parseInt(String(id)));
    if (pokemons) {
        res.status(200);
    } else {
        res.status(404);
    }
});


router.post('/api/v1/pokemons/update', async (req: Request, res: Response)=> {
    const {id = ''} = req.query;
    const body = req.body;
    const pokemons = await pokemonService.updatePokemonById(parseInt(String(id)), body);
    if (pokemons) {
        res.status(200);
    } else {
        res.status(404);
    }
});

router.get('/api/v1/pokemons/search', async (req: Request, res: Response)=> {
    const {nom = '', type = '', types = '', HP = 0} = req.query;
    const typesArray = Array.isArray(types) ? types : [types];
    const pokemons = await pokemonService.search(String(nom), String(type), typesArray.map(String), parseInt(String(HP)));
    res.status(200).json(pokemons);
});

router.get('/api/v1/pokemons/:page', async (req: Request, res: Response)=> {
    const {page = 1} = req.params;
    const pokemons = await pokemonService.pagination(parseInt(page.toString()));
    res.status(200).json(pokemons);
});

router.get('/api/v1/pokemon/:id', async (req: Request, res: Response)=> {
    const {id = ''} = req.params;
    const pokemonID = await pokemonService.getPokemonID(parseInt(id));
    
    if ("Pokemon not found" == pokemonID) {
        res.status(404);
    } else {
        res.status(200).json(pokemonID);
    }
});

export default router;