import React, { Component } from 'react';
import backendService from '../../../backendService';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    componentDidMount() {
        // fix unresolved variable warning
        /** @namespace user.regAccepted **/
        backendService.getUserById(this.props.match.params.id)
            .then(user => this.setState({ user }))
    }

    handleAccept = () => {
        backendService.acceptUser(this.state.user._id)
            .then(() => this.props.history.push('/admin/users'));
    };

    handleDelete = () => {
        backendService.deleteUser(this.state.user._id)
            .then(() => this.props.history.push('/admin/users'));
    };

    render() {
        return (
            <div>
                <div>User</div>
                {this.state.user && (
                    <div>
                        <div>
                            Email: {this.state.user.email}
                        </div>
                        <div>
                            Firma: {this.state.user.company}
                        </div>
                        <div>
                            Straße: {this.state.user.street}
                        </div>
                        <div>
                            Ort: {this.state.user.city}
                        </div>
                        <div>
                            Bezahlmethode: {this.state.user.payment}
                        </div>
                        <div>
                            Admin: {this.state.user.admin.toString()}
                        </div>
                        <div>
                            Approved: {this.state.user.regAccepted.toString()}
                        </div>

                        <button onClick={this.handleDelete}>delete</button>
                        {this.state.user && !this.state.user.regAccepted && (
                            <button onClick={this.handleAccept}>accept</button>
                        )}
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/admin/users')}>
                        back
                    </button>
                </div>
            </div>
        );
    }
}

export default User;
