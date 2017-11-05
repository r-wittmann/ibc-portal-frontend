import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../backendService';

class HomePage extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        backendService.logout();
        this.props.history.push('/login');
    };

    render() {
        return (
            <div>
                <div>HomePage</div>
                <div>
                    <Link to={'/companies'}>
                        Link to Companies
                    </Link>
                </div>
                <div>
                    <Link to={'/recruiters'}>
                        Link to Recruiters
                    </Link>
                </div>
                <div>
                    <Link to={'/postings'}>
                        Link to Postings
                    </Link>
                </div>
                <div>
                    <Link to={'/profile'}>
                        Link to Profile
                    </Link>
                </div>
                <div>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default HomePage;
