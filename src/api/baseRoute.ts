import { Router, Request, Response } from "express";
import * as baseService from '../services/baseService';

const router = Router();

router.post('/api/v1/login', (req: Request, res: Response) => {
    const email = req.body.email;

    const result = baseService.login(email);
    if (result === false){
        res.status(401).send('invalid credentials');
    } else {
        res.send(
            result
        );
    }
});

router.post('/api/v1/pokemons/create', (req: Request, res: Response)=> {
    const body = req.body;
    const pokemons = baseService.createPokemon(body);
    res.status(200);
});

router.get('/api/v1/pokemons/search', async (req: Request, res: Response)=> {
    const {nom = '', type = '', types = '', HP = 0} = req.query;
    const typesArray = Array.isArray(types) ? types : [types];
    const pokemons = await baseService.search(String(nom), String(type), typesArray.map(String), parseInt(String(HP)));
    res.status(200).json(pokemons);
});

router.get('/api/v1/pokemons/:page', async (req: Request, res: Response)=> {
    const {page = 1} = req.params;
    const pokemons = await baseService.pagination(parseInt(page.toString()));
    res.status(200).json(pokemons);
});

router.get('/api/v1/pokemon/:id', async (req: Request, res: Response)=> {
    const {id = ''} = req.params;
    const pokemonID = await baseService.getPokemonID(parseInt(id));
    
    if ("Pokemon not found" == pokemonID) {
        res.status(404);
    } else {
        res.status(200).json(pokemonID);
    }
});

export default router;