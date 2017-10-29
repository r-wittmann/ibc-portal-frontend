import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../backendService';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        backendService.getUsers()
            .then((users) => this.setState({ users }));
    }

    handleLogout = (event) => {
        backendService.logout();
        this.props.history.push('/admin-login');
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>Users</div>
                <div>
                    {this.state.users.map((user) =>
                        <div key={user._id}>
                            <Link to={`/admin/users/${user._id}`}>{user.name}</Link>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;
