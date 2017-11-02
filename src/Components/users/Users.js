import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../backendService';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptedUsers: [],
            unacceptedUsers: []
        };
    }

    componentDidMount() {
        backendService.getUsers()
            .then((users) => {
                this.setState({
                    acceptedUsers: users.filter(user => user.regAccepted === true),
                    unacceptedUsers: users.filter(user => user.regAccepted === false)
                })
            });
    }

    handleLogout = (event) => {
        event.preventDefault();
        backendService.logout();
        this.props.history.push('/admin/login');
    };

    render() {
        return (
            <div>
                <div>Accepted Users</div>
                {this.state.acceptedUsers.map((user) =>
                    <div key={user._id}>
                        <Link to={`/admin/users/${user._id}`}>{user.email}</Link>
                    </div>
                )}
                {this.state.unacceptedUsers.length > 0 && (
                    <div>
                        <div>Unaccepted Users</div>
                        {this.state.unacceptedUsers.map((user) =>
                            <div key={user._id}>
                                <Link to={`/admin/users/${user._id}`}>{user.email}</Link>
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default Users;
