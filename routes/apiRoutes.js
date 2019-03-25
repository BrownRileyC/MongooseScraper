const db = require('../models');

module.exports = function (app) {
    app.get('/api/scrape', function (req, res) {
        axios.get("http://dnd.wizards.com/articles").then(function (response) {
            let $ = cheerio.load(response.data);

            $('article div.content').each(function (i, element) {
                let result = {};
                let textDiv = $(this).children().hasClass('text');
                result.headline = textDiv.children('h4').text();
                result.summary = textDiv.children().hasClass('summary').text();
                result.link = textDiv.children('h4').children('a').attr('href');

                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
            res.send('Scraped Articles Chief')
        });
    });
}