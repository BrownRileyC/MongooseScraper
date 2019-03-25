var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: {
        type: String,
        trim: true,
        default: 'You forgot to enter a note it seems'
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;