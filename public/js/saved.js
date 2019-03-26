$(document).ready(function () {
   
    $('.noteModal').on('click', function () {
        let id = $(this).parents('.card').data();
        console.log(id);
        $('#myModal').modal();
    });
    

    $('.card').on('click', '.deleteButton', function () {
        event.preventDefault();
        let id = $(this).parents('.card').data();
        console.log(id);
        $.ajax({
            type: 'POST',
            url: '/api/unsave/' + id.id
        }).then(function (data) {
            console.log('Unsaved that Article');
            console.log('I should be gone');
        });
        $(this).parents('.card').empty();
    });

});
