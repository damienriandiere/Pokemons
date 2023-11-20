import { Router, Request, Response } from "express";
import * as pokemonService from '../services/pokemon';

const logger = require('../loggers/loggers');
const router = Router();

router.post('/api/v1/pokemons/create', async (req: Request, res: Response) => {
    logger.info('Go to /api/v1/pokemons/create')
    const body = req.body;
    const pokemons = await pokemonService.createPokemon(body);
    if (pokemons) {
        res.status(200);
    } else {
        res.status(404);
    }
});

router.post('/api/v1/pokemons/delete', async (req: Request, res: Response) => {
    logger.info('Go to /api/v1/pokemons/delete')
    const { id = '' } = req.query;
    logger.info('id : ' + id)
    const pokemons = await pokemonService.deletePokemonById(parseInt(String(id)));
    if (pokemons) {
        res.status(200);
    } else {
        res.status(404);
    }
});


router.post('/api/v1/pokemons/update', async (req: Request, res: Response) => {
    logger.info('Go to /api/v1/pokemons/update')
    const { id = '' } = req.query;
    logger.info('id : ' + id)
    const body = req.body;
    logger.info('body : ' + body)
    const pokemons = await pokemonService.updatePokemonById(parseInt(String(id)), body);
    if (pokemons) {
        res.status(200);
    } else {
        res.status(404);
    }
});

router.get('/api/v1/pokemons/search', async (req: Request, res: Response) => {
    logger.info('Go to /api/v1/pokemons/search')
    const { nom = '', type = '', types = '', HP = 0 } = req.query;
    const typesArray = Array.isArray(types) ? types : [types];
    logger.info('Paramètres passés à la recherche : ')
    logger.info('nom : ' + nom)
    logger.info('type : ' + type)
    logger.info('typesArray : ' + typesArray)
    logger.info('HP : ' + HP)
    try{
        const pokemons = await pokemonService.search(String(nom), String(type), typesArray.map(String), parseInt(String(HP)));
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/api/v1/pokemons/:page', async (req: Request, res: Response) => {
    logger.info('Go to /api/v1/pokemons/:page')
    const { page = 1 } = req.params;
    logger.info('Numéro de page : ' + page)
    try{
        const pokemons = await pokemonService.pagination(parseInt(page.toString()));
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/api/v1/pokemon/:id', async (req: Request, res: Response) => {
    logger.info('Go to /api/v1/pokemon/:id')
    const { id = '' } = req.params;
    logger.info('id : ' + id)
    const pokemonID = await pokemonService.getPokemonID(parseInt(id));

    if ("Pokemon not found" == pokemonID) {
        res.status(404);
    } else {
        res.status(200).json(pokemonID);
    }
});

export default router;