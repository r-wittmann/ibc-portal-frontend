import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {

    render() {
        return (
            <div className={'container'}>
                <Link to={'/faq'} target={'_blank'}>FAQ</Link>
                <Link to={'/impressum'} target={'_blank'}>Impressum</Link>
                <Link to={'/privacy'} target={'_blank'}>Datenschutz</Link>
            </div>
        );
    }
}

export default Footer;
