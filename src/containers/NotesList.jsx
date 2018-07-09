import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CSSModules from 'react-css-modules';
import Note from '../components/Note';
import { loadNotes } from '../actions/noteActions';

import NoteListStyle from '../style/NotesList.less';

class NotesList extends PureComponent {
    componentDidMount() {
        this.props.loadNotes(this.props.url);
    }

    render() {
        return (
            <section styleName='notes-container'>
                {
                    this.props.notes.length ? this.props.notes.map(note => <Note key={note._id} note={note} />) : (
                        <h4 styleName='empty-notes'>
                            {'Empty'}
                        </h4>
                    )
                }
            </section>
        );
    }
}

NotesList.defaultProps = {
    notes: [],
};

NotesList.propTypes = {
    loadNotes: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(PropTypes.shape({
        borderColor: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    })),
    url: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        notes: state.notes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadNotes: bindActionCreators(loadNotes, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(NotesList, NoteListStyle));
