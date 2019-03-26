$(document).ready(function () {

    $('#noteModal').on('click', function () {
        let id = $(this).parents('.card').data();
        console.log(id);
        $('#myModal').modal('show');
    });

    // var modal = document.getElementById('myModal');

    // // Get the button that opens the modal
    // var btn = document.getElementById("noteModal");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    // // When the user clicks on the button, open the modal 
    // btn.onclick = function () {
    //     modal.style.display = "block";
    // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //     modal.style.display = "none";
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

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
