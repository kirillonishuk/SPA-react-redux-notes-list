import axios from 'axios';

export default {
    listNotesByUrl(url) {
        return axios.get(`/notesList/${url}`);
    },
    createNote(url, data) {
        return axios.post(`/newNote/${url}`, data);
    },
    deleteNote(id) {
        return axios.delete(`/${id}`);
    },
    updateNote(id, data) {
        return axios.put(`/${id}`, data);
    },
};
