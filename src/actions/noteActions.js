import {
    pendingTask,
    begin,
    endAll,
} from 'react-redux-spinner';
import api from '../api';


export const LOAD_NOTES_REQUEST = 'LOAD_NOTES_REQUEST';
export const LOAD_NOTES_SUCCESS = 'LOAD_NOTES_SUCCESS';
export const LOAD_NOTES_FAIL = 'LOAD_NOTES_FAIL';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const CLEAR_NOTES_LIST = 'CLEAR_NOTES_LIST';

export function loadNotes(url) {
    return (dispatch) => {
        dispatch({
            type: LOAD_NOTES_REQUEST,
            [pendingTask]: begin,
        });
        api.listNotesByUrl(url)
            .then(res => dispatch({
                type: LOAD_NOTES_SUCCESS,
                payload: res.data,
                [pendingTask]: endAll,
            }))
            .catch(err => dispatch({
                type: LOAD_NOTES_FAIL,
                error: err,
                [pendingTask]: endAll,
            }));
    };
}

export function clearNotesList() {
    return dispatch => dispatch({
        type: CLEAR_NOTES_LIST,
        payload: [],
    });
}

export function createNote(url, data) {
    return (dispatch) => {
        dispatch({
            type: CREATE_NOTE,
            [pendingTask]: begin,
        });
        api.createNote(url, data)
            .then(() => dispatch(loadNotes(url)))
            .catch(err => console.error(err));
    };
}

export function deleteNote(url, id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_NOTE,
            [pendingTask]: begin,
        });
        api.deleteNote(id)
            .then(() => setTimeout(dispatch(loadNotes(url)), 401))
            .catch(err => console.error(err));
    };
}

export function editNote(url, id, data) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_NOTE,
            [pendingTask]: begin,
        });
        api.updateNote(id, data)
            .then(() => dispatch(loadNotes(url)))
            .catch(err => console.error(err));
    };
}
