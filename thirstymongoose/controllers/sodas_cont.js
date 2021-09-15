const Diner = require('../models/diner');
const Soda = require('../models/soda');

module.exports = {
    all(req, res) {
        new Promise((resolve, reject) => {
            resolve(Soda.find({}).sort('name').lean());
        }).then((data) => {
            console.log(data);
            res.render('sodas/sodamain', {results:data})
        }).catch(err => console.log(err));
    },
    showSingleSoda(req, res) {
        let sname = req.params.soda,
            sstyle = req.params.style;
        new Promise((resolve, reject) => {
            resolve(Soda.findOne({name: `${sname}`, style: `${sstyle}`}).populate('diners').exec());
        }).then((data) => {
            console.log('Single Soda data is ----' + data);
            if(data !== null) {
                let diners = [];
                for(let i = 0; i<data.diners.length; i++) {
                    diners.push({
                        name: data.diners[i].name,
                        id: data._id
                    });
                }
                let comments = [];
                let rating = []
                for(let j = 0; j<data.comments.length;j++) {
                    comments.push({
                        content: data.comments[j].content,
                        created_at: new Date(Date.parse(data.comments[j].created_at)).toUTCString(),
                        rating: data.comments[j].rating
                    })
                    rating.push(data.comments[j].rating)
                }
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let result
                if(rating.length > 0){
                result = Math.round(rating.reduce(reducer)/rating.length)
                }
                console.log(result)
                res.render('sodas/singlesoda', {name: data.name, style: data.style, diners: diners, id: data._id, comments: comments.reverse(), ratresult: result});
            }else {
                let soda = new Soda({name: `${sname}`, style: `${sstyle}`, diners:[], comments:[]});
                soda.save().then(() => {
                    res.redirect(`http://localhost:23750/sodas/${encodeURIComponent(sname).replace(/'/g, '%27')}/${encodeURIComponent(sstyle).replace(/'/g,'%27')}`);                   
                })
            }
        }).catch(err=>console.log(err));
    },
    addComments(req, res) {
        let comment = req.body.userComment,
            rating = req.body.rating
        new Promise((resolve, reject) => {
            resolve(Soda.updateOne({_id : req.params.id}, {$push: {comments: {content: comment, rating: rating}}}))
        }).then(() => {
            res.redirect(`http://localhost:23750/sodas/${encodeURIComponent(req.body.soda).replace(/'/g, '%27')}/${encodeURIComponent(req.body.style).replace(/'/g,'%27')}`)
        }).catch(err=>console.log(err));
    },
    delete(req, res) {
        new Promise((resolve, reject) => {
            resolve(Soda.findByIdAndRemove({_id: req.body.resultId}))
        }).then((data) => {
            if(!data.length) {
                res.render('delete', {name: 'Soda'})
            }
        }).catch(err=>console.log(err))
    },
    edit(req, res) {
        new Promise((resolve, reject) => {
            resolve(Soda.findById({_id:req.body.resultId}))
        }).then((data) => {
            let comments = [];
            data.comments.forEach(element => {
                comments.push({
                    id : element._id,
                    content: element.content,
                    rating: element.rating
                })
            })
            res.render('sodas/editSoda', { name:data.name, style:data.style,comments:comments})
        })
    }
}