import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faSync } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-autosize-textarea';

import CSSModules from 'react-css-modules';
import { createNote, clearNotesList, loadNotes } from '../actions/noteActions';
import NewNoteStyles from '../style/NewNote.less';

class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: '',
            text: '',
            borderColor: '#4caf50',
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeColorComplite = this.handleChangeColorComplite.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({
            title: event.target.value,
        });
    }

    handleChangeText(event) {
        this.setState({
            text: event.target.value,
        });
    }

    handleChangeColorComplite(color) {
        this.setState({
            borderColor: color.hex,
        });
    }

    handleAddClick() {
        this.props.createNote(this.props.url, this.state);

        this.setState({
            url: this.props.url,
            title: '',
            text: '',
            borderColor: '#4caf50',
        });
    }

    render() {
        return (
            <nav styleName='new-note-column'>
                <aside styleName='input-note'>
                    <header styleName='title'>
                        {'New Note/'}
                        {this.props.url}
                    </header>
                    <div styleName='input-container'>
                        <div>
                            <label htmlFor='input-note-title'>
                                {'Title:'}
                            </label>
                            <br />
                            <input
                                id='input-note-title'
                                type='text'
                                styleName='input-title'
                                value={this.state.title}
                                placeholder='Enter title'
                                onChange={this.handleChangeTitle}
                                required
                            />
                            <br />
                            <label htmlFor='input-note-text'>
                                {'Text:'}
                            </label>
                            <br />
                            <TextareaAutosize
                                id='input-note-text'
                                styleName='input-text'
                                value={this.state.text}
                                placeholder='Enter text'
                                onChange={this.handleChangeText}
                                rows={3}
                                maxRows={10}
                                required
                            />
                            <br />
                        </div>
                        <div>
                            <label htmlFor='input-color-text'>
                                {'Color:'}
                            </label>
                            <br />
                            <div styleName='color-picker' id='input-color-text'>
                                <CirclePicker
                                    color={this.state.borderColor}
                                    onChangeComplete={this.handleChangeColorComplite}
                                    id='border-color-picker'
                                    colors={[
                                        '#808080', '#4caf50', '#ffeb3b', '#cddc39', '#2196f3', '#795548', '#ffffff', '#C71585',
                                    ]}
                                    circleSize={45}
                                    circleSpacing={14}
                                />
                            </div>
                            <br />
                            <button type='button' styleName='add-button' onClick={this.handleAddClick} disabled={(!this.state.text) || (!this.state.title)}>
                                {'ADD'}
                            </button>
                        </div>
                    </div>
                </aside>
                <footer>
                    <Link to='/'>
                        <button type='button' styleName='back-button' onClick={this.props.clearNotesList}>
                            <FontAwesomeIcon icon={faBackward} />
                            <span>
                                {' Back'}
                            </span>
                        </button>
                    </Link>
                    <button type='button' styleName='refresh-button' onClick={() => this.props.loadNotes(this.props.url)}>
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                </footer>
            </nav>
        );
    }
}

NewNote.propTypes = {
    createNote: PropTypes.func.isRequired,
    clearNotesList: PropTypes.func.isRequired,
    loadNotes: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        createNote: bindActionCreators(createNote, dispatch),
        clearNotesList: bindActionCreators(clearNotesList, dispatch),
        loadNotes: bindActionCreators(loadNotes, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CSSModules(NewNote, NewNoteStyles));
