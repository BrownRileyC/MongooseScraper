$(document).ready(function() {
    $('.scrapeButton').on('click', function(){
        event.preventDefault();
        $.get('/api/scrape', function(data){
            location.reload();
        });
    });

    $('.card').on('click', '.saveArticle', function(){
        event.preventDefault();
        let id = $(this).data();
        console.log(id);
        $.ajax({
            type: 'PUT',
            url: '/api/save/'+id.id
        }).then(function(data) {
            console.log('Saved that Article');
            console.log('I should be gone');
        });
        $(this).parents('.card').empty();
    });

    $('.clearButton').on('click', function () {
        $.ajax({
            type: 'DELETE',
            url: '/api/remove'
        }).then(function() {
            $('.article-card-holder').empty();
        })
    })
});
