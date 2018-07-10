import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import HomeStyles from '../style/Home.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isDisable: true,
        };
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onValid(event) {
        if (!!event.target.value.search(/[^0-9a-z]+$/) && event.target.value.length) {
            this.setState({
                isDisable: false,
            });
        } else {
            this.setState({
                isDisable: true,
            });
        }
    }

    handleUrlChange(event) {
        this.setState({
            url: event.target.value,
        });
        this.onValid(event);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && this.state.url) {
            this.redirect.click();
        }
    }

    render() {
        return (
            <section styleName='container'>
                <nav styleName='input-container'>
                    <header styleName='title'>
                        {'Enter URL'}
                    </header>
                    <input
                        ref={(required) => { this.required = required; }}
                        type='text'
                        placeholder='Enter URL'
                        pattern='[0-9a-zA-Z]+$'
                        title='The field must be filled. Use 0-9 and a-z.'
                        onChange={this.handleUrlChange}
                        styleName='input-url'
                        required
                        onKeyPress={this.handleKeyPress}
                    />
                    <br />
                    <Link to={`/${this.state.url}`}>
                        <button
                            type='button'
                            styleName='go-btn'
                            disabled={this.state.isDisable}
                            ref={(redirect) => { this.redirect = redirect; }}
                        >
                            {'GO'}
                        </button>
                    </Link>
                </nav>
            </section>
        );
    }
}

export default CSSModules(Home, HomeStyles);
