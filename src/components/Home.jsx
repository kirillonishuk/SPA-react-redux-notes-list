import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import HomeStyles from '../style/Home.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            onDisable: true,
        };
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onValid(printString) {
        if (printString.search(/[^A-Za-zА-Яа-я0-9]/) === -1) {
            this.setState({
                onDisable: false,
            });
        } else {
            this.setState({
                onDisable: true,
            });
        }
    }

    handleUrlChange(event) {
        this.setState({
            url: event.target.value.toLowerCase(),
        });
        this.onValid(event.target.value);
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
                        type='text'
                        placeholder='Enter URL'
                        pattern='[A-Za-zА-Яа-я0-9]+$'
                        onChange={this.handleUrlChange}
                        styleName='input-url'
                        required
                        onKeyPress={this.handleKeyPress}
                    />
                    <br />
                    <Link to={`/${this.state.url}`}>
                        <button type='button' ref={(redirect) => { this.redirect = redirect; }} styleName='go-btn' disabled={this.state.onDisable}>
                            {'GO'}
                        </button>
                    </Link>
                </nav>
            </section>
        );
    }
}

export default CSSModules(Home, HomeStyles);
