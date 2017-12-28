import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import PasswordModal from "./PasswordModal";
import Header from "../Header";

class Profile extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        backendService.updateProfile(this.state.profile)
        // call confirmation alert
        // .then(() => confirmationAlert())
        // .catch(() => failureAlert());
    };

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

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihr Profil</h1>
                </div>
                <div className={'container'}>
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
                                <input type={'submit'} className={'btn btn-primary float-right buttons-form'}
                                       value={'Speichern'}/>
                            </div>
                        </form>
                    )}
                    <div className={'float-right'}>
                        <button className={'btn btn-danger buttons-form'}
                                onClick={() => this.props.history.push('/home')}>Abbrechen
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
