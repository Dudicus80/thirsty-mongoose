//dependencies
const express = require('express');
const DinerCont = require('../controllers/diners_cont');
const SodaCont = require('../controllers/sodas_cont');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('home')
    });
    app.get('/diners', DinerCont.all);
    app.get('/sodas', SodaCont.all);
    app.get('/addDiner', (req, res) => {
        res.render('diners/addDiner');
    })
    app.get('/addSoda', (req, res) => {
        res.render('sodas/addSoda');
    })
    app.get('/diners/addsoda/:id', DinerCont.sodaList);
    app.get('/diners/:diner/:location',DinerCont.showSingleDiner);
    app.get('/sodas/:soda/:style', SodaCont.showSingleSoda);
    app.post('/edit/soda', SodaCont.edit)
    app.post('/sodas/comment/:id', SodaCont.addComments);
    app.post('/diners/:diner/:location',DinerCont.showSingleDiner);
    app.post('/sodas/:soda/:style', SodaCont.showSingleSoda);
    app.post('/delete/soda',SodaCont.delete);
    app.post('/delete/diner', DinerCont.delete);
    app.post('/diners/:diner/sodaAdded/:soda', DinerCont.addSodaToDiner);
    app.post('/deleteFromDiner/:soda/:diner', DinerCont.stopServingSoda);
}