import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import TextEditor from "../../commons/TextEditor";
import defaultCompany from '../../commons/defaultCompany';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: undefined,
            create: this.props.match.params.id === 'create'
        };
    }

    componentDidMount() {
        if (!this.state.create) {
            backendService.getCompanyById(this.props.match.params.id)
                .then(company => this.setState({ company }));
        } else {
            this.setState({ company: defaultCompany });
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            backendService.updateCompany(this.props.match.params.id, this.state.company)
                .then(response => this.setState({ company: response.company }));
        } else {
            backendService.createCompany(this.state.company)
                .then(response => this.props.history.push(`/companies/${response.id}`));
        }

    };

    handleDelete = (event) => {
        event.preventDefault();
        backendService.deleteCompany(this.state.company._id);
        this.props.history.push('/home');
    };

    render() {
        return (
            <div>
                <div>Company</div>
                {this.state.company && (
                    <form onSubmit={this.handleSubmit}>
                        <InputLabel
                            label={'Name'}
                            value={this.state.company.name}
                            onChange={(name) => this.setState({
                                company: Object.assign({}, this.state.company, { name })
                            })}/>
                        <InputLabel
                            label={'Locations'}
                            value={this.state.company.locations}
                            onChange={(locations) => this.setState({
                                company: Object.assign({}, this.state.company, { locations })
                            })}/>
                        <InputLabel
                            label={'Address'}
                            value={this.state.company.address}
                            onChange={(address) => this.setState({
                                company: Object.assign({}, this.state.company, { address })
                            })}/>
                        <InputLabel
                            label={'Main Point of Contact'}
                            value={this.state.company.mainPointOfContact}
                            onChange={(mainPointOfContact) => this.setState({
                                company: Object.assign({}, this.state.company, { mainPointOfContact })
                            })}/>
                        <InputLabel
                            label={'Number of Employees'}
                            value={this.state.company.numberOfEmployees}
                            onChange={(numberOfEmployees) => this.setState({
                                company: Object.assign({}, this.state.company, { numberOfEmployees })
                            })}/>
                        <InputLabel
                            label={'kununu Link'}
                            value={this.state.company.kununuLink}
                            onChange={(kununuLink) => this.setState({
                                company: Object.assign({}, this.state.company, { kununuLink })
                            })}/>
                        <div>
                            Description:
                            <TextEditor
                                value={this.state.company.description}
                                onChange={(description) => this.setState({
                                    company: Object.assign({}, this.state.company, { description })
                                })}/>
                        </div>
                        <div>
                            <input type={'submit'} value={this.state.create ? 'Save' : 'Update'}/>
                        </div>
                    </form>
                )}
                {!this.state.create && (
                    <div>
                        <button onClick={this.handleDelete}>delete this company</button>
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/companies')}>back</button>
                </div>
            </div>
        );
    }
}

export default Company;
