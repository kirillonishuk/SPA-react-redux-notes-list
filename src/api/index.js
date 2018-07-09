import axios from 'axios';

const urls = 'http://localhost:8088';

export default {
    listNotesByUrl(url) {
        return axios.get(`${urls}/notesList/${url}`);
    },
    createNote(url, data) {
        return axios.post(`${urls}/newNote/${url}`, data);
    },
    deleteNote(id) {
        return axios.delete(`${urls}/${id}`);
    },
    updateNote(id, data) {
        return axios.put(`${urls}/${id}`, data);
    },
};
