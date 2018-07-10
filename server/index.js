import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/NotesUtils';
import path from 'path';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/', (req, res, next) => {
    const date = new Date();
    console.log(`${req.method} to ${req.url}, time: ${date.toLocaleString()}`);
    next();
});

app.get('/notesList/:url', (req, res) => {
    db.listNotesByUrl(req.params.url)
        .then(data => res.send(data))
        .catch(err => console.log(err));
});

app.post('/newNote/:url', (req, res) => {
    db.createNote(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err));
});

app.delete('/:id', (req, res) => {
    db.deleteNote(req.params.id)
        .then(data => res.send(data))
        .catch(err => console.log(err));
});

app.put('/:id', (req, res) => {
    db.updateNote(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err));
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    });
}

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 8088);


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server is up on port ${PORT}!`);
});
