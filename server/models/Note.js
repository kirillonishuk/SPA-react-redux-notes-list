import mongoose from 'mongoose';


const Schema = mongoose.Schema;
export const NoteSchema = new Schema({
    url:         { type:  String, },
    title:       { type:  String, required: true, },
    text:        { type:  String, required: true, },
    borderColor: { type: String, default:  'green'},
    createdAt:   { type:  Date, default: Date.now },
});

const Note = mongoose.model('Note', NoteSchema);