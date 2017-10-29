import React, { Component } from 'react';
import backendService from '../../backendService';

class RecruiterCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            telephone: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        backendService.createRecruiter(this.state.name, this.state.email, this.state.telephone)
            .then((response)=> this.props.history.push(`/recruiters/${response.id}`));
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>Create a new Recruiter</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type={'text'}
                                value={this.state.name}
                                onChange={(event) => this.setState({name: event.target.value})}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            <input
                                type={'text'}
                                value={this.state.email}
                                onChange={(event) => this.setState({email: event.target.value})}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Telephone:
                            <input
                                type={'text'}
                                value={this.state.telephone}
                                onChange={(event) => this.setState({telephone: event.target.value})}/>
                        </label>
                    </div>
                    <div>
                        <input type={'submit'} value={'Submit'}/>
                    </div>
                </form>
                <div>
                    <button onClick={() => this.props.history.push('/recruiters')}>
                        back
                    </button>
                </div>
            </div>
        );
    }
}

export default RecruiterCreate;
