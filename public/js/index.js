$(document).ready(function() {
    $('.scrapeButton').on('click', function(){
        event.preventDefault();
        $.get('/api/scrape', function(data){
            console.log(data);
        });
    })
});
