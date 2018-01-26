import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import PasswordModal from "./PasswordModal";
import Header from "../Header";
import { toast } from "react-toastify";
import translate from "../../../translationService";
import queryString from 'query-string';

class Profile extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.inputForm.hasAttribute('novalidate') && !this.inputForm.checkValidity()) {
            event.stopPropagation();
            this.inputForm.classList.add('was-validated')
        } else {
            backendService.updateProfile(this.state.profile)
                .then(() => toast('Profil aktualisiert', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            profile: undefined,
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        if (location.hash){
            backendService.getProfile(queryString.parse(location.hash)['token'])
                .then(profile => this.setState({ profile, loading: false }))
                .then(() => {
                    location.hash = '';

                    let modal = document.getElementById('changePassword');
                    modal.classList.add('show');
                    modal.style.display = 'block';

                    document.body.classList.add('modal-open');
                    let div = document.createElement('div');
                    div.setAttribute('class', 'modal-backdrop fade show');
                    document.body.appendChild(div);
                });
        } else {
        backendService.getProfile()
            .then(profile => this.setState({ profile, loading: false }));
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihr Profil</h1>
                </div>
                <div className={'container'}>
                    {this.state.loading
                        ? <div className={'loader'}/>
                        : (
                            <form onSubmit={this.handleSubmit}
                                  ref={(form) => this.inputForm = form}
                                  noValidate>
                                <div className='form-group row'>
                                    <label className='col-4 col-form-label'>
                                        Unternehmen
                                    </label>
                                    <label className='col-8 col-form-label'>
                                        {this.state.profile.name}
                                    </label>
                                </div>
                                <InputLabel
                                    label={'Kontaktperson'}
                                    required
                                    value={this.state.profile.contact_name}
                                    onChange={(contact_name) => this.setState({
                                        profile: Object.assign({}, this.state.profile, { contact_name })
                                    })}/>
                                <InputLabel
                                    label={'Email'}
                                    type={'email'}
                                    required
                                    value={this.state.profile.email}
                                    onChange={(email) => this.setState({
                                        profile: Object.assign({}, this.state.profile, { email })
                                    })}
                                    errorMessage={'Bitte eine valide Email-Adresse eingeben'}/>
                                <InputLabel
                                    label={'Telefon'}
                                    required
                                    type={'number'}
                                    value={this.state.profile.contact_phone}
                                    onChange={(contact_phone) => this.setState({
                                        profile: Object.assign({}, this.state.profile, { contact_phone })
                                    })}
                                    errorMessage={'Telefon ist ein Pflichtfeld'}/>
                                <div className='form-group row'>
                                    <label className='col-4 col-form-label'>
                                        Unternehmenstyp
                                    </label>
                                    <label className='col-8 col-form-label'>
                                        {translate.companyType(this.state.profile.company_type)}
                                    </label>
                                </div>
                                <div className='col-8 offset-4'>
                                    <button type={'button'} className='btn btn-primary' data-toggle="modal"
                                            data-target="#changePassword">
                                        Passwort ändern
                                    </button>
                                </div>
                                <div>
                                    <input type={'submit'} className={'btn btn-success float-right buttons-form'}
                                           value={'Speichern'}/>
                                </div>
                            </form>
                        )}
                    <div className={'float-right'}>
                        <button className={'btn btn-warning buttons-form'}
                                onClick={() => this.props.history.push('/company/home')}>Abbrechen
                        </button>
                    </div>
                    <PasswordModal/>
                </div>
            </div>
        );
    }
}

export default Profile;
