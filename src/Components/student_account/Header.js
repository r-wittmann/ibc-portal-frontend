import React, { Component } from 'react';
import image from '../../../resources/ibc_logo-long.png';
import backendService from "../../backendService";


class Header extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        backendService.logout();
        this.props.history.push('/');
    };

    getActiveLinkClassNames = (path) => {
        if (this.props.history.location.pathname.includes(path)) {
            return 'nav-item active'
        }
        return 'nav-item'
    };

    render() {
        return (
            <nav className={'navbar fixed-top navbar-expand-lg navbar-light bg-light'}>
                <a className={'navbar-brand'} onClick={() => this.props.history.push('/')}>
                    <img className={'logo'} src={image} alt={'blub'}/>
                </a>
                <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/')}>Für Studenten</a>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/companies')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/company/login')}>
                                Für Unternehmen</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
