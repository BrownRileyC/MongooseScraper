$(document).ready(function() {
    $('.scrapeButton').on('click', function(){
        event.preventDefault();
        $.get('/api/scrape', function(data){
            console.log(data);
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
});
