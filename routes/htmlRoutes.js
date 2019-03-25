module.exports = function(app) {
    app.get('/', function(req, res) {
        db.Article.find({})
        .then(function(dbArticles){
            let hbsObject = {
                article: dbArticles
            };
            res.render('index', hbsObject)
        })
    })
}