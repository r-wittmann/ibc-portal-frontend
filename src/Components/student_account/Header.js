import React, { Component } from 'react';
import image from '../../../resources/ibc_logo-long.png';
import { Link } from 'react-router-dom';


class Header extends Component {

    getActiveLinkClassNames = (path) => {
        if (this.props.history.location.pathname.includes(path)) {
            return 'nav-item active'
        }
        return 'nav-item'
    };

    render() {
        return (
            <nav className={'navbar fixed-top navbar-expand-lg navbar-light bg-light'}>
                <Link className={'navbar-brand'} to={'/'}>
                    <img className={'logo'} src={image} alt={'blub'}/>
                </Link>
                <button className={'navbar-toggler'} type={'button'} data-toggle={'collapse'} data-target={'#navbarNav'}
                        aria-controls={'navbarNav'} aria-expanded={'false'} aria-label={'Toggle navigation'}>
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id={'navbarNav'}>
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={this.getActiveLinkClassNames('/')}>
                            <Link className={'nav-link'} to={'/'}>Für Studenten</Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/company/companies')}>
                            <Link className={'nav-link'} to={'/company/login'}>
                                Für Unternehmen</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
