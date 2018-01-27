import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

    getActiveLinkClassNames = (path) => {
        if (location.pathname.includes(path)) {
            return 'nav-item active'
        }
        return 'nav-item'
    };

    render() {
        return (
            <nav className={'navbar footer fixed-bottom navbar-expand-lg navbar-light bg-light'}>
                <button className={'navbar-toggler'} type={'button'} data-toggle={'collapse'} data-target={'#footer'}
                        aria-controls={'footer'} aria-expanded={'false'} aria-label={'Toggle navigation'}>
                    <span className={'navbar-toggler-icon'}/>
                </button>
                <div className={'collapse navbar-collapse'} id={'footer'}>
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0 ml-auto'}>
                        <li className={this.getActiveLinkClassNames('/faq')}>
                            <Link className={'nav-link'} to={'/faq'} target={'_blank'}>
                                FAQ
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/impressum')}>
                            <Link className={'nav-link'} to={'/impressum'} target={'_blank'}>
                                Impressum
                            </Link>
                        </li>
                        <li className={this.getActiveLinkClassNames('/privacy')}>
                            <Link className={'nav-link'} to={'/privacy'} target={'_blank'}>
                                Datenschutz
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Footer;
