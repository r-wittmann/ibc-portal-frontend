import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../backendService';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = (event) => {
        backendService.logout();
        this.props.history.push('/login');
        event.preventDefault();
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
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default HomePage;
