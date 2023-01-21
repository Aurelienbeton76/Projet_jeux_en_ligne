const express = require('express');
const searchRouter = express.Router();
const games = require('../games.json');
// A la racine du préfixe 
// Le préfixe de ce module de routes est /search
searchRouter.get('/', (req, res) =>{
    res.locals.needCss = false;
    res.render('search/search');
});

/** /search/result */
searchRouter.get('/result', (req, res) => {
    res.locals.needCss = false;
    console.log(req.query);

    const onCherche = req.query.recherche;
    const jeuxCorrespondants = games.filter((unJeu) => {
         

         //On converti la recherche et le jeu analysé en minuscule pour éviter les problème de casse. Ainsi, si le nom est Dice et qu'on cherche dice, notre système arrivera tout de même a trouver
         const nameEnMinuscule = unJeu.name.toLocaleLowerCase();
         const onChercheEnMinuscule = onCherche.toLowerCase()

         // Si la recherche est dans le nom du jeu le jeu fera partie de nos résultats
         //Donc si je cherche dice j'obtiendrais surement DiceRoller
         if(nameEnMinuscule.includes(onChercheEnMinuscule)){
            return true;
         }


         //ON peut raccourci en une ligne mais attention c'est peut être moins libsible
         //unJeu.name.toLowerCase().includes(onCherche.toLocaleLowerCase());
    })


    // La même chose que filter mais snas filter
    // const jeuxCorrespondant = []
    // for(const game of games){
    //     const nameEnMinuscule = game.name.toLocaleLowerCase();
    //     const onChercheEnMinuscule = onCherche.toLowerCase();

    //     if(nameEnMinuscule.includes(onChercheEnMinuscule)){
    //         jeuxCorrespondant.push(game);
    //     }
    // }

    res.render('search/result', {jeuxCorrespondants});
})

module.exports = searchRouter;