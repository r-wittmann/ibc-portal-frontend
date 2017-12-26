import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png'

class Recruiters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiters: []
        };
    }

    componentDidMount() {
        backendService.getRecruiters()
            .then((recruiters) => this.setState({ recruiters }));
    }

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                    <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                    <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}></span>
                    </button>
                    <div className={'collapse navbar-collapse'} id="navbarNav">
                        <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/')}>Home</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/companies')}>Ihr
                                    Unternehmen</a>
                            </li>
                            <li className={'nav-item active'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/recruiters')}>Ihre
                                    Recruiter</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/postings')}>Ihre
                                    Stellenanzeigen</a>
                            </li>
                        </ul>

                        <ul className={'navbar-nav my-2 my-lg-0'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/profile')}>Ihr
                                    Profil</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                            </li>
                        </ul>

                    </div>
                </nav>
                <div className={'headline'}>
                    <h1>Ihre Recruiter</h1>
                </div>
                {this.state.recruiters && this.state.recruiters.map((recruiter) =>
                    <div key={recruiter.id}>
                        <Link to={`/recruiters/${recruiter.id}`}>{recruiter.recruiter_name}</Link>
                    </div>
                )}
                <div className={'create-button'}>
                    <button className={'btn btn-primary'} onClick={() => this.props.history.push('/recruiters/create')}>
                        Neuen Recruiter erstellen
                    </button>
                </div>
            </div>
        );
    }
}

export default Recruiters;
