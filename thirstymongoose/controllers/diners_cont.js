const Diner = require('../models/diner');
const Soda = require('../models/soda');

module.exports = {
    all(req, res) {
        new Promise ((resolve, reject) => {
            resolve(Diner.find({}).sort('name').lean())
        }).then((data) => {
            console.log(data);
            res.render('diners/dinermain', {results:data})
        }).catch((err) => {
            console.log(err);
        });
    },
    showSingleDiner(req, res) {
        let dname = req.params.diner;
        let dlocation = req.params.location;
        new Promise((resolve, reject) => {
            resolve(Diner.findOne({name: `${dname}`, location:`${dlocation}`}).populate('sodas').exec());
        }).then((data) => {
            console.log('Single Diner data is ------' + data);
            if(data !== null) {
                let sodas = [];
                for(let i = 0; i < data.sodas.length; i++) {
                    sodas.push({
                        name: data.sodas[i].name,
                        id: data._id,
                        sodaId: data.sodas[i]._id
                    })
                }
                console.log(sodas);
                res.render('diners/singleDiner', {name: data.name, location: data.location, sodas: sodas, id: data._id})
            }else {
                let diner = new Diner({name: `${dname}`, location: `${dlocation}`, sodas: []});
                diner.save().then(() => {
                    res.redirect(`http://localhost:23750/diners/${encodeURIComponent(dname).replace(/'/g, '%27')}/${encodeURIComponent(dlocation).replace(/'/g,'%27')}`);
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    delete(req, res) {
        new Promise((resolve, reject) => {
            resolve(Diner.findByIdAndRemove({_id: req.body.resultId}))
        }).then((data) => {
            if(!data.length) {
                res.render('delete', {name: 'Diner'})
            }
        }).catch(err=>console.log(err));
    },
    sodaList(req, res) {
        new Promise((resolve, reject) => {
            resolve(Soda.find({diners: {$ne: req.params.id}}, {name: 1, _id:1}).lean())
        }).then((data) => {
            let sodas=[];
            for(let i =0; i< data.length; i++) {
                sodas.push({
                    name: data[i].name,
                    id: data[i]._id,
                    diner: req.params.id
                })
            }
            res.render('diners/sodasInDiner', {sodas:sodas});
        }).catch(err=>console.log(err))
    },
    addSodaToDiner(req, res) {
        new Promise((resolve, reject) =>  {
            resolve(Diner.updateOne({_id: req.params.diner},{$push:{sodas:req.params.soda}}).then(() => Soda.updateOne({_id: req.params.soda}, {$push: {diners: req.params.diner}})));
        }).then(() => {
            Diner.findById(req.params.diner, function(err, data) {
                res.redirect(`http://localhost:23750/diners/${encodeURIComponent(data.name).replace(/'/g,"%27")}/${encodeURIComponent(data.location).replace(/'/g, '%27')}`);
            })
        }).catch(err=>console.log(err));
    },
    stopServingSoda(req, res) {
        new Promise((resolve, reject) => {
            resolve(Diner.updateOne({_id:req.params.diner}, {$pull: {sodas:req.params.soda}}).then(() => Soda.updateOne({_id:req.params.soda}, {$pull: {diners:req.params.diner}})))
        }).then(() => {
            Diner.findById(req.params.diner, function(err, data) {
                res.redirect(`http://localhost:23750/diners/${encodeURIComponent(data.name).replace(/'/g,"%27")}/${encodeURIComponent(data.location).replace(/'/g, '%27')}`);
            })
        }).catch(err=>console.log(err))
    }
}