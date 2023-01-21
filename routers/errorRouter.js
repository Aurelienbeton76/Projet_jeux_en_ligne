

const express = require('express');
const errorRouter = express.Router();

errorRouter.get("*", (req, res) => {
    res.locals.needCss = false;
    res.locals.message = "L'url que vous cherchez est introuvable";
    res.status(404).render('error404');
});

module.exports = errorRouter;