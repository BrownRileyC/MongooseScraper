$(document).ready(function () {

    $('#myModal').on('hidden.bs.modal', function (e) {
        $('.noteList').empty();
        $('textarea').val("");
      })

    $('.noteModal').on('click', function () {
        let id = $(this).parents('.card').data();
        console.log(id);
        $('.saveButton').attr('data-id', id._id);

        $.ajax({
            type: 'GET',
            url: '/api/note/'+id._id
        }).then(function (data) {
            // Create note LIs
            console.log(data);
            for (let i=0; i<data.note.length; i++) {
                console.log(data.note[i]);
                
                let ul = $('.noteList');
                let li = $('<li>').addClass('list-group-item').text(data.note[i].text);
                let div = $('<div>').addClass('row justify-content-end');
                let button = $('<button type="button" class="btn btn-sm btn-danger deleteNote">').text('X').attr('data-id', data.note[i]._id).addClass('');

                ul.append(li);
                div.append(button);
                li.append(div);
            }
        });
        $('#myModal').modal('show');
    });

    $('.saveButton').on('click', function () {
        event.preventDefault();

        let note = $('textarea').val().trim();
        let id = $(this).data();
        console.log(id);
        console.log(note);

        $.ajax({
            type: 'POST',
            url: '/api/new/note/'+id.id,
            data: {
                note: note
            }
        }).then(function (data) {
            console.log('Hey I came back');
            $('#myModal').modal('hide');
            
        })
    });

    $('.noteList').on('click','.deleteNote', function () {
        event.preventDefault();
        console.log('Hey, I got clicked');

        let id = $(this).data();
        
        $.ajax({
            type: 'DELETE',
            url: '/api/delete/'+id.id
        }).then(function (data) {
            console.log(data);
            console.log('I made it');
            $(this).parents('li').empty();
        })
    });

    $('.card').on('click', '.deleteButton', function () {
        event.preventDefault();
        let id = $(this).parents('.card').data();
        console.log(id);
        $.ajax({
            type: 'PUT',
            url: '/api/unsave/' + id._id
        }).then(function (data) {
            console.log('Unsaved that Article');
            console.log('I should be gone');
        });
        $(this).parents('.card').empty();
    });

});
