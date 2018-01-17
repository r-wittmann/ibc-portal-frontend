import React, { Component } from 'react';
import image from '../../../resources/ibc_logo-long.png';
import backendService from "../../backendService";

class Header extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        backendService.adminLogout();
        this.props.history.push('/admin/login');
    };

    getActiveLinkClassNames = (path) => {
        if (this.props.history.location.pathname.includes(path)) {
            return 'nav-item active'
        }
        return 'nav-item'
    };

    render() {
        return (
            <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                <a className={'navbar-brand'} onClick={() => this.props.history.push('/admin/registrations')}>
                    <img className={'logo'} src={image} alt={'blub'}/>
                </a>
                <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/admin/registrations')}>
                            <a className={'nav-link'}
                               onClick={() => this.props.history.push('/admin/registrations')}>
                                Anfragen
                            </a>
                        </li>
                        <li className={this.getActiveLinkClassNames('/admin/accounts')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/admin/accounts')}>
                                Alle Accounts
                            </a>
                        </li>
                        <li className={this.getActiveLinkClassNames('/admin/analytics')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/admin/analytics')}>
                                Analytics
                            </a>
                        </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;
