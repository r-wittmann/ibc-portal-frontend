import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import PasswordModal from "./PasswordModal";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: undefined
        };
    }

    componentDidMount() {
        backendService.getProfile()
            .then(profile => this.setState({ profile }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        backendService.updateProfile(this.state.profile)
            // call confirmation alert
            // .then(() => confirmationAlert())
            // .catch(() => failureAlert());
    };

    render() {
        return (
            <div>
                <div>Profile</div>
                {this.state.profile && (
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group row'>
                            <label className='col-4 col-form-label'>
                                Benutzername
                            </label>
                            <label className='col-8 col-form-label'>
                                {this.state.profile.name}
                            </label>
                        </div>
                        <InputLabel
                            label={'Email'}
                            value={this.state.profile.email}
                            onChange={(email) => this.setState({
                                profile: Object.assign({}, this.state.profile, { email })
                            })}/>
                        <InputLabel
                            label={'Unternehmen'}
                            value={this.state.profile.mother_company}
                            onChange={(company) => this.setState({
                                profile: Object.assign({}, this.state.profile, { mother_company: company })
                            })}/>
                        <div className='form-group row'>
                            <label className='col-4 col-form-label'>
                                Unternehmenstyp
                            </label>
                            <label className='col-8 col-form-label'>
                                {this.state.profile.company_type}
                            </label>
                        </div>
                        <div className='col-8 offset-4'>
                            <button type={'button'} className='btn btn-primary' data-toggle="modal"
                                    data-target="#changePassword">
                                Passwort ändern
                            </button>
                        </div>

                        <PasswordModal/>
                        <div>
                            <input type={'submit'} value={'Update'}/>
                        </div>
                    </form>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/home')}>back</button>
                </div>
            </div>
        );
    }
}

export default Profile;
