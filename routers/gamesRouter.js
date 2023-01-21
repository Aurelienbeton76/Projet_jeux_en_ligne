const express = require('express');
const gamesRouter = express.Router();
const games = require('../games.json');
// url : /game/:nomDuJeu
gamesRouter.get('/:nomDuJeu', (req, res, next) => {
    // Récupérer la valeur de nomDuJeu
    const nomDuGame = req.params.nomDuJeu;
    // Trouver le jeux dans la liste
    // Dans le tableau des jeux on cherche (find) le jeux pour lequel le name est égale à ce qu'il y a dans l'url
    const theGame = games.find((unJeu) => unJeu.name.toLowerCase() === nomDuGame.toLowerCase());
    // Si jeu pas trouver 404
    if(theGame == undefined){
        next();
    }else{
        // Sinon on rend la vue du jeu
        res.locals.theGame = theGame;
        res.locals.needCss = (theGame.cssFile != null);

        /* auqivalant à : 
            if(theGame.cssFile != null){
                res.locals.needCss = true;
            }else{
                res.locals.false = false;
            }
        */
        res.render('games/' + theGame.name);
    }
});

module.exports = gamesRouter;