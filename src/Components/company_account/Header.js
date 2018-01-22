import React, { Component } from 'react';
import image from '../../../resources/ibc_logo-long.png';
import backendService from "../../backendService";

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
                <a className={'navbar-brand'} onClick={() => this.props.history.push('/company/home')}>
                    <img className={'logo'} src={image} alt={'blub'}/>
                </a>
                <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/company/home')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/company/home')}>Home</a>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/companies')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/company/companies')}>
                                Ihre Unternehmen</a>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/recruiters')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/company/recruiters')}>
                                Ihre Recruiter</a>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/postings')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/company/postings')}>
                                Ihre Stellenanzeigen</a>
                        </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/company/profile')}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/company/profile')}>
                                Ihr Profil</a>
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
