import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import HomeStyles from '../style/Home.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleUrlChange(event) {
        this.setState({
            url: event.target.value.toLowerCase(),
        });
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
                    <input type='text' placeholder='Enter URL' onChange={this.handleUrlChange} styleName='input-url' required onKeyPress={this.handleKeyPress} />
                    <br />
                    <Link to={`/${this.state.url}`}>
                        <button type='button' ref={(redirect) => { this.redirect = redirect; }} styleName='go-btn' disabled={!this.state.url}>
                            {'GO'}
                        </button>
                    </Link>
                </nav>
            </section>
        );
    }
}

export default CSSModules(Home, HomeStyles);
