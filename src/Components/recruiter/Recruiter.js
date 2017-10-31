import React, { Component } from 'react';
import backendService from '../../backendService';
import InputLabel from "../commons/InputLabel";
import defaultRecruiter from '../commons/defaultRecruiter';

class Recruiter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiter: undefined,
            create: this.props.match.params.id === 'create'
        };
    }

    componentDidMount() {
        if (!this.state.create) {
            backendService.getRecruiterById(this.props.match.params.id)
                .then(recruiter => this.setState({ recruiter }));
        } else {
            this.setState({ recruiter: defaultRecruiter });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            backendService.updateRecruiter(this.props.match.params.id, this.state.recruiter)
                .then(response => this.setState({ recruiter: response.recruiter }))
        } else {
            backendService.createRecruiter(this.state.recruiter)
                .then(response => this.props.history.push(`/recruiters/${response.id}`));
        }

    };

    handleDelete = () => {
        event.preventDefault();
        backendService.deleteRecruiter(this.state.recruiter._id);
        this.props.history.push('/home');
    };

    render() {
        return (
            <div>
                <div>Recruiter</div>
                {this.state.recruiter && (
                    <form onSubmit={this.handleSubmit}>
                        <InputLabel
                            label={'Name'}
                            value={this.state.recruiter.name}
                            onChange={(name) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { name })
                            })}/>
                        <InputLabel
                            label={'Email'}
                            value={this.state.recruiter.email}
                            onChange={(email) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { email })
                            })}/>
                        <InputLabel
                            label={'Telephone'}
                            value={this.state.recruiter.telephone}
                            onChange={(telephone) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { telephone })
                            })}/>
                        <InputLabel
                            label={'Position'}
                            value={this.state.recruiter.position}
                            onChange={(position) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { position })
                            })}/>
                        <div>
                            <input type={'submit'} value={this.state.create ? 'Save' : 'Update'}/>
                        </div>
                    </form>
                )}
                {!this.state.create && (
                    <div>
                        <button onClick={this.handleDelete}>delete this recruiter</button>
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/recruiters')}>back</button>
                </div>
            </div>
        );
    }
}

export default Recruiter;
