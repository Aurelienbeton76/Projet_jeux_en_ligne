/*!===================================
*   Import des dépendence
*=====================================*/
// on charge le module express
const express = require('express');

// on stock le contenu du fichier json dans une variable comme si c'était un module javascript
const games = require('./games.json');

//importe notre routeur pour la 404
const errorRouter = require('./routers/errorRouter');

// on importe le module de gestion des route pour la recherche
const searchRouter = require('./routers/searchRouter');

const loginRouter = require('./routers/loginRouter');

//ON importe le module de gestion des routes de games
const gamesRouter = require('./routers/gamesRouter');


const dayjs = require('dayjs');
const exp = require('constants');

/*!===================================
*   Configuration d'express
*=====================================*/
// on initialise express
const app = express();
const port = 4000;

// On demande à notre application d'utiliser le moteur de rendu ejs
app.set('view engine', 'ejs');

//on configure le chemin des templates EJS 
// IL s'agit de la configuration par defaut de EJS donc a moins de vouloir renommer le nom du répertoire qui va stocker les fichiers EJS cette ligne est facultative
// app.set('views', __dirname + '/views');
// app.set('views', './views');




/*!===================================
*   Gestion des routes
*=====================================*/
// ON transmet à tous les templates de l'application le contenu de games
app.locals.games = games;

// EN ajoutant ce middleware avant celui gérant les url static on peut logger les urls auxquels l'utilisateur veut accéder mais aussi le chargement des ressources statiques dont a besoin l'url 
app.get('*', (req, res, next) =>{
    // const now = new Date();
    // console.log(`${now.toISOString()}`);
    console.log(`[${dayjs().toISOString()} ${req.ip}] - ${req.method} ${req.url}`)
    next();
});

// ON défini le dossier public comme étant l'endroit où on va stocké nos fichiers static. (css , js front, images, videos, pdf, ....);
app.use(express.static('public'));

// Toute les requête POST passerons par ce middleware et verront leur body intéerprété et lisible dans la requete grace à req.body
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.locals.needCss = false;
    //Pas besoin de préciser qu'on cherche dans le dossier views car par defaut c'est qu'ira cherché Express
    //res.rend est une fonction de terminaison. donc à mettre en fin de la fonction qui doit afficher la page. Si du code est présent en dessous il ne sera jamais exécuté
    res.render('index');
});

app.use('/search', searchRouter);
app.use('/game', gamesRouter);
app.use('/login',loginRouter);
// // On créé les routes pour les jeux 
// app.get('/game/fourchette', (req, res) => {
//     res.locals.isDiceRoller = false;
//     res.render('fourchette')
// })

// app.get('/game/diceroller', (req, res) => {
    
//     // EN définissant uen variable isDiceRoller dans la propriété locals de notre réponse HTTP on permet aux template composant la réponse d'utiliser cette variable sans la passer au template 
//     res.locals.isDiceRoller = true;
//     res.render('diceRoller')
// })

app.use("*", errorRouter);

/*!===================================
*   Lancement de l'app
*=====================================*/
app.listen(port, () => console.log(`Le serveur est lancé et écoute sur l'adresse http://localhost:${port}`));
