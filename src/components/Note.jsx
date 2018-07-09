import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import TextareaAutosize from 'react-autosize-textarea';

import { deleteNote, editNote } from '../actions/noteActions';
import NoteStyles from '../style/Note.less';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteStyle: '',
            onEdit: false,
            title: this.props.note.title,
            text: this.props.note.text,
        };

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.noteShow = this.noteShow.bind(this);
        this.noteEdit = this.noteEdit.bind(this);
    }

    handleDeleteClick() {
        this.setState({
            deleteStyle: 'note-block-delete',
        });
        this.props.deleteNote(this.props.note.url, this.props.note._id);
    }

    handleEditClick() {
        this.setState(prev => (
            {
                onEdit: !prev.onEdit,
            }
        ));
    }

    handleSaveClick() {
        const data = {
            url: this.props.note.url,
            title: this.state.title,
            text: this.state.text,
            borderColor: this.props.note.borderColor,
            createdAt: this.props.note.createdAt,
        };
        this.props.editNote(this.props.note.url, this.props.note._id, data);
        this.setState(prev => (
            {
                onEdit: !prev.onEdit,
            }
        ));
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value,
        });
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value,
        });
    }

    noteShow() {
        return (
            <Fragment>
                <header styleName='note-title'>
                    {this.props.note.title}
                </header>
                <button type='button' styleName='edit-button' onClick={this.handleEditClick}>
                    <FontAwesomeIcon icon={faPencilAlt} size='2x' />
                </button>
                <button type='button' styleName='delete-button' onClick={this.handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrashAlt} size='2x' />
                </button>
                <div styleName='note-text'>
                    {this.props.note.text}
                </div>
                <div styleName='note-date'>
                    {this.props.note.createdAt}
                </div>
            </Fragment>
        );
    }

    noteEdit() {
        return (
            <Fragment>
                <header styleName='note-title'>
                    <h5>
                        {'Edit Note:'}
                    </h5>
                </header>
                <input
                    type='text'
                    styleName='input-edit-title'
                    placeholder='Enter Title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    required
                />
                <br />
                <TextareaAutosize
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    styleName='input-edit-text'
                    placeholder='Enter Text'
                    rows={3}
                    required
                />
                <br />
                <button type='button' onClick={this.handleEditClick} styleName='edit-buttons'>
                    {'Cansel'}
                </button>
                <button type='button' onClick={this.handleSaveClick} styleName='edit-buttons' disabled={!this.state.text || !this.state.title}>
                    {'Save'}
                </button>
            </Fragment>
        );
    }

    render() {
        return (
            <article style={{ backgroundColor: this.props.note.borderColor }} styleName={`note-block-show ${this.state.deleteStyle}`}>
                {!this.state.onEdit ? this.noteShow() : this.noteEdit()}
            </article>
        );
    }
}

Note.propTypes = {
    deleteNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    note: PropTypes.shape({
        borderColor: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        deleteNote: bindActionCreators(deleteNote, dispatch),
        editNote: bindActionCreators(editNote, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CSSModules(Note, NoteStyles, { allowMultiple: true }));
