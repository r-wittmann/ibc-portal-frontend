import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import defaultRecruiter from '../../commons/defaultRecruiter';

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
            let updatedRecruiter = this.state.recruiter;
            delete(updatedRecruiter.created_at);
            delete(updatedRecruiter.updated_at);
            backendService.updateRecruiter(this.props.match.params.id, updatedRecruiter)
                // call confirmation alert
                // .then(() => confirmationAlert())
                // .catch(() => failureAlert());
        } else {
            backendService.createRecruiter(this.state.recruiter)
                .then(() => this.props.history.push(`/recruiters`));
        }

    };

    handleDelete = () => {
        event.preventDefault();
        backendService.deleteRecruiter(this.props.match.params.id)
            // call confirmation alert
            // .then(() => confirmationAlert())
            .then(() => this.props.history.push('/recruiters'))
            // .catch(() => failureAlert());
    };

    render() {
        return (
            <div>
                <div>Recruiter</div>
                {this.state.recruiter && (
                    <form onSubmit={this.handleSubmit}>
                        <InputLabel
                            label={'Name'}
                            value={this.state.recruiter.recruiter_name}
                            onChange={(recruiter_name) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { recruiter_name })
                            })}/>
                        <InputLabel
                            label={'Email'}
                            value={this.state.recruiter.recruiter_email}
                            onChange={(recruiter_email) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { recruiter_email })
                            })}/>
                        <InputLabel
                            label={'Telefon Mobile'}
                            value={this.state.recruiter.mobile}
                            onChange={(mobile) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { mobile })
                            })}/>
                        <InputLabel
                            label={'Telefon Festnetz'}
                            value={this.state.recruiter.phone}
                            onChange={(phone) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { phone })
                            })}/>
                        <InputLabel
                            label={'Position'}
                            value={this.state.recruiter.position}
                            onChange={(position) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { position })
                            })}/>
                        <InputLabel
                            label={'Standort'}
                            value={this.state.recruiter.location}
                            onChange={(location) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { location })
                            })}/>
                        <InputLabel
                            label={'XING-Profil'}
                            value={this.state.recruiter.xing}
                            onChange={(xing) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { xing })
                            })}/>
                        <InputLabel
                            label={'LinkedIn-Profil'}
                            value={this.state.recruiter.linked_in}
                            onChange={(linked_in) => this.setState({
                                recruiter: Object.assign({}, this.state.recruiter, { linked_in })
                            })}/>
                        <div>
                            <input type={'submit'} value={'Speichern'}/>
                        </div>
                    </form>
                )}
                {!this.state.create && (
                    <div>
                        <button onClick={this.handleDelete}>Löschen</button>
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/recruiters')}>Zurück</button>
                </div>
            </div>
        );
    }
}

export default Recruiter;
