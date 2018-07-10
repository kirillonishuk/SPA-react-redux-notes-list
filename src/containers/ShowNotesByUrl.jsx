import React from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';
import { Helmet } from 'react-helmet';
import NewNote from './NewNote';
import NotesList from './NotesList';

import ShowStyles from '../style/ShowNotesByUrl.less';


const ShowNotesByUrl = props => (
    <div styleName='page'>
        <Helmet>
            <title>
                {'Notes List/'}
                {props.match.params.url}
            </title>
        </Helmet>
        <NewNote url={props.match.params.url} />
        <NotesList url={props.match.params.url} />
    </div>
);

ShowNotesByUrl.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default CSSModules(ShowNotesByUrl, ShowStyles);
