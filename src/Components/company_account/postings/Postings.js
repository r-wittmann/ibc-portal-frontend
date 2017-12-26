import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png'

class Postings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postings: []
        };
    }

    componentDidMount() {
        backendService.getPostings()
            .then((postings) => this.setState({ postings }));
    }

    render() {
        return (
            <div>
            <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                  <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                  <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}></span>
                  </button>
                  <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/')}>Home</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/companies')}>Ihr Unternehmen</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/recruiters')}>Ihre Recruiter</a>
                      </li>
                      <li className={'nav-item active'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/postings')}>Ihre Stellenanzeigen</a>
                      </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/profile')}>Ihr Profil</a>
                        </li>
                      <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                        </li>
                    </ul>

                  </div>
                </nav>
                <div className={'headline'}>
                    <h1>Ihre Stellenanzeigen</h1>
                </div>
                {this.state.postings.map((posting) =>
                    <div key={posting._id}>
                        <Link to={`/postings/${posting._id}`}>{posting.title}</Link>
                    </div>
                )}
                <div className={'create-button'}>
                    <button className={'btn btn-primary'} onClick={() => this.props.history.push('/postings/create')}>
                        Neue Stellenanzeige erstellen
                    </button>
                </div>
            </div>
        );
    }
}

export default Postings;
