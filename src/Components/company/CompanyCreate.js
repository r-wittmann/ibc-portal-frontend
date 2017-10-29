import React, { Component } from 'react';
import backendService from '../../backendService';

class CompanyCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        backendService.createCompany(this.state.name, this.state.address)
            .then((response)=> this.props.history.push(`/companies/${response.id}`));
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>Create a new Company</div>
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
                            Address:
                            <input
                                type={'text'}
                                value={this.state.address}
                                onChange={(event) => this.setState({address: event.target.value})}/>
                        </label>
                    </div>
                    <div>
                        <input type={'submit'} value={'Submit'}/>
                    </div>
                </form>
                <div>
                    <button onClick={() => this.props.history.push('/companies')}>
                        back
                    </button>
                </div>
            </div>
        );
    }
}

export default CompanyCreate;
