import React, { Component } from 'react';
import image from '../../../resources/ibc_logo-long.png';
import backendService from '../../backendService';
import { Link } from 'react-router-dom';

class Header extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        backendService.logout();
        this.props.history.push('/company/login');
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
                <Link className={'navbar-brand'} to={'/company/home'}>
                    <img className={'logo'} src={image} alt={'blub'}/>
                </Link>
                <button className={'navbar-toggler'} type={'button'} data-toggle={'collapse'} data-target={'#navbarNav'}
                        aria-controls={'navbarNav'} aria-expanded={'false'} aria-label={'Toggle navigation'}>
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id={'navbarNav'}>
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/company/home')}>
                            <Link className={'nav-link'} to={'/company/home'}>
                                Home
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/companies')}>
                            <Link className={'nav-link'} to={'/company/companies'}>
                                Ihre Unternehmen
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/recruiters')}>
                            <Link className={'nav-link'} to={'/company/recruiters'}>
                                Ihre Recruiter
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/postings')}>
                            <Link className={'nav-link'} to={'/company/postings'}>
                                Ihre Stellenanzeigen
                            </Link>
                        </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/company/profile')}>
                            <Link className={'nav-link'} to={'/company/profile'}>
                                Ihr Profil
                            </Link>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={this.handleLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;
