import mongoose from 'mongoose';
import '../models/Note';


const Note = mongoose.model('Note');

export function setUpConnection() {
    mongoose.connect(`mongodb://admin:admin1@ds161700.mlab.com:61700/notedb1`)
        .catch(err => {
            console.log(err);
        })
}

export function listNotesByUrl(url) {
    return Note.find({url: url});
}

export function createNote(data) {
    const note = new Note({
        url:         data.url,
        title:       data.title,
        text:        data.text,
        borderColor: data.borderColor,
        createdAt:   new Date()
    });
    return note.save();
}

export function updateNote(id, data) {
    return Note.findByIdAndUpdate(id, data);
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}