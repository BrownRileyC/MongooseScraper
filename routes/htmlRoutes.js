const db = require('../models');
module.exports = function(app) {
    app.get('/', function(req, res) {
        db.Article.find({status: false})
        .then(function(dbArticles){
            let hbsObject = {
                article: dbArticles
            };
            res.render('index', hbsObject)
        })
    })
}