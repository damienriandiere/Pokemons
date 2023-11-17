import { Router, Request, Response } from "express";
import * as authService from '../services/auth';

const router = Router();

router.post('/api/v1/login', (req: Request, res: Response) => {
    const email = req.body.email;

    const result = authService.login(email);
    if (result === false){
        res.status(401).send('invalid credentials');
    } else {
        res.send(
            result
        );
    }
});

export default router;