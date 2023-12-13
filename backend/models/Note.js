const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});
const Note = mongoose.model("note", NoteSchema);
module.exports = Note;
