import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import PasswordModal from "./PasswordModal";
import image from '../../../../resources/ibc_logo.png'

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
            <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                  <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                  <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}></span>
                  </button>
                  <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/')}>Home</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/companies')}>Ihr Unternehmen</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/recruiters')}>Ihre Recruiter</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/postings')}>Ihre Stellenanzeigen</a>
                      </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={'nav-item active'}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/profile')}>Ihr Profil</a>
                        </li>
                      <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                        </li>
                    </ul>

                  </div>
                </nav>
                <div className={'headline'}>
                    <h1>Ihr Profil</h1>
                </div>
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
