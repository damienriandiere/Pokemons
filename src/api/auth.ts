import { Router } from 'express';
import { checkRefresh, createTokens, isAuthenticated } from "../services/auth";
import { AuthenticatedRequest } from "../types";
import { getUserByEmail } from "../models/user";
const router = Router();

router.get("/me", isAuthenticated, (req: AuthenticatedRequest, res) => {
   res.json(req.user);
})

router.post("/login", (req, res) => {
   const { email, password } = req.body;
   if (!email) return res.status(400).json({ success: false, message: "Veuillez fournir une adresse mail" });
   if (!password) return res.status(400).json({ success: false, message: "Veuillez fournir un mot de passe" });

   const user = getUserByEmail(email);
   if (!user) return res.status(404).json({ success: false, message: "Aucun utilisateur trouvé pour cette adresse mail !" });

   if (password != user.password) {
      return res.status(401).json({ success: false, message: 'Mauvaise addresse mail ou mauvais mot de passe !' });
   }

   return res.json({
      success: true,
      ...createTokens(user)
   });
});

router.post("/refresh", (req, res) => {
   const { refreshToken } = req.body;
   const isValid = checkRefresh(refreshToken);
   if (!isValid.success || !isValid.payload) {
      return res.status(401).json(isValid);
   }

   const user = getUserByEmail(isValid.payload.email);
   if (!user) return res.status(404).json({ success: false, message: "L'utilisateur n'existe plus !" });

   res.json({ success: true, ...createTokens(user) })
});

export default router;