import {
    LOAD_NOTES_REQUEST,
    LOAD_NOTES_SUCCESS,
    LOAD_NOTES_FAIL,
    CLEAR_NOTES_LIST,
    CREATE_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE,
} from '../actions/noteActions';


export default function (state = [], action) {
    switch (action.type) {
    case LOAD_NOTES_REQUEST:
        return state;
    case LOAD_NOTES_SUCCESS:
        return action.payload;
    case LOAD_NOTES_FAIL:
        return action.error;
    case CREATE_NOTE:
        return state;
    case UPDATE_NOTE:
        return state;
    case DELETE_NOTE:
        return state;
    case CLEAR_NOTES_LIST:
        return action.payload;
    default:
        return state;
    }
}
