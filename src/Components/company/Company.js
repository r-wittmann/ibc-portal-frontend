import React, { Component } from 'react';
import backendService from '../../backendService';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: undefined
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        backendService.getCompanyById(this.props.match.params.id)
            .then(company => this.setState({ company }))
    }

    handleSubmit = () => {
        backendService.updateCompany(this.props.match.params.id, this.state.company)
            .then(company => this.setState({ company }))
    };

    handleDelete = () => {
        backendService.deleteCompany(this.state.company._id);
        this.props.history.push('/home');
    };

    render() {
        return (
            <div>
                <div>Company</div>
                <div>
                    {this.state.company && (
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Name:
                                    <input
                                        type={'text'}
                                        value={this.state.company.name}
                                        onChange={(event) => this.setState({
                                            company: Object.assign({}, this.state.company, { name: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Address:
                                    <input
                                        type={'text'}
                                        value={this.state.company.address}
                                        onChange={(event) => this.setState({
                                            company: Object.assign({}, this.state.company, { address: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <input type={'submit'} value={'Submit'}/>
                            </div>
                        </form>
                    )}
                    <div>
                        <button onClick={this.handleDelete}>delete this company</button>
                    </div>
                    <div>
                        <button onClick={() => this.props.history.push('/companies')}>
                            back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Company;
