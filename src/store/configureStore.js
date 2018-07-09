import {
    createStore,
    combineReducers,
    applyMiddleware,
    // compose,
} from 'redux';
import thunk from 'redux-thunk';

import { pendingTasksReducer } from 'react-redux-spinner';
import NotesReducers from '../reducers/note';


export default function configureStore(initialState) {
    const allReducers = combineReducers({
        pendingTasks: pendingTasksReducer,
        notes: NotesReducers,
    });

    // dev version
    // const allStoreEnhancers = compose(
    // 	applyMiddleware(thunk),
    // 	window.devToolsExtension && window.devToolsExtension(),
    // );
    const store = createStore(allReducers, initialState, applyMiddleware(thunk));
    return store;
}
