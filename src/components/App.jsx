import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import '../style/Spiner.css';
import '../style/App.less';

import { Provider } from 'react-redux';
import { Spinner } from 'react-redux-spinner';
import Favicon from 'react-favicon';

import Home from './Home';
import ShowNotesByUrl from '../containers/ShowNotesByUrl';

import configureStore from '../store/configureStore';

const store = configureStore();

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <div className='site-body'>
                <Spinner config={{ trickleRate: 0.02 }} />
                <Favicon url='http://www.iconj.com/ico/w/2/w2u32v4s3x.ico' />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/:url' component={ShowNotesByUrl} />
                </Switch>
            </div>
        </Provider>
    </BrowserRouter>
);

export default App;
