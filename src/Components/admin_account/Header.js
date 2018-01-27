import React, { Component } from 'react';
import image from '../../../resources/ibc_logo-long.png';
import backendService from '../../backendService';
import { Link } from 'react-router-dom';

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

            <nav className={'navbar fixed-top navbar-expand-lg navbar-light bg-light'}>
                <Link className={'navbar-brand'} to={'/admin/registrations'}>
                    <img className={'logo'} src={image} alt={'blub'}/>
                </Link>
                <button className={'navbar-toggler'} type='button' data-toggle='collapse' data-target='#navbarNav'
                        aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id='navbarNav'>
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/admin/registrations')}>
                            <Link className={'nav-link'}
                                  to={'/admin/registrations'}>
                                Anfragen
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/admin/accounts')}>
                            <Link className={'nav-link'} to={'/admin/accounts'}>
                                Alle Accounts
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/admin/analytics')}>
                            <Link className={'nav-link'} to={'/admin/analytics'}>
                                Analytics
                            </Link>
                        </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/admin/profile')}>
                            <Link className={'nav-link'} to={'/admin/profile'}>
                                Ihr Profil</Link>
                        </li>
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
