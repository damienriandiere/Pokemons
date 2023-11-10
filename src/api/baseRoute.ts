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


router.get('/api/v1/pokemons', (req: Request, res: Response)=> {
    const {page = 1} = req.query;
    const pokemons = baseService.pagination(parseInt(page.toString()));

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