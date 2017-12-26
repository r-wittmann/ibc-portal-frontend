import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import TextEditor from "../../commons/TextEditor";
import defaultCompany from '../../commons/defaultCompany';
import UploadFileModal from "../../commons/UploadFileModal";
import image from '../../../../resources/ibc_logo.png';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: undefined,
            logoChanged: false,
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
            let updatedCompany = this.state.company;
            delete(updatedCompany.created_at);
            delete(updatedCompany.updated_at);
            if (!this.state.logoChanged) {
                delete(updatedCompany.logo);
            }
            backendService.updateCompany(this.props.match.params.id, updatedCompany)
            // call confirmation alert
            // .then(() => confirmationAlert())
            // .catch(() => failureAlert());
        } else {
            backendService.createCompany(this.state.company)
                .then(() => this.props.history.push(`/companies`));
        }

    };

    handleDelete = (event) => {
        event.preventDefault();
        backendService.deleteCompany(this.props.match.params.id)
        // call confirmation alert
        // .then(() => confirmationAlert())
            .then(() => this.props.history.push('/companies'))
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
                          <li className={'nav-item active'}>
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
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/profile')}>Ihr Profil</a>
                            </li>
                          <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                            </li>
                        </ul>

                      </div>
                    </nav>
                    <div className={'headline'}>
                        <h1>Neues Unternehmen erstellen</h1>
                    </div>
                    <div className={'container'}>
                {this.state.company && (
                    <form onSubmit={this.handleSubmit}>
                        <InputLabel
                            label={'Unternehmensname'}
                            value={this.state.company.company_name}
                            onChange={(company_name) => this.setState({
                                company: Object.assign({}, this.state.company, { company_name })
                            })}/>
                        <div className='form-group row'>
                            <label htmlFor={'address'} className='col-4 col-form-label'>
                                Adresse in München
                            </label>
                            <div className='col-8'>
                                <textarea
                                    id={'address'}
                                    className={'form-control'}
                                    rows='3'
                                    value={this.state.company.munich_address}
                                    onChange={(event) => this.setState({
                                        company: Object.assign({}, this.state.company, { munich_address: event.target.value })
                                    })}/>
                            </div>
                        </div>
                        <InputLabel
                            label={'Weitere Standorte (Komma separiert)'}
                            value={this.state.company.locations}
                            onChange={(locations) => this.setState({
                                company: Object.assign({}, this.state.company, { locations })
                            })}/>
                        <div className='form-group row'>
                            <label htmlFor={'employees'} className='col-4 col-form-label'>
                                Mitarbeiter weltweit
                            </label>
                            <div className='col-8'>
                                <select id={'employees'}
                                        value={this.state.company.employees}
                                        className="form-control"
                                        onChange={(event) => this.setState({
                                            company: Object.assign({}, this.state.company, { employees: event.target.value })
                                        })}>
                                    <option value={1}>Bis 10</option>
                                    <option value={2}>11 - 50</option>
                                    <option value={3}>51 - 100</option>
                                    <option value={4}>101 - 500</option>
                                    <option value={5}>501 - 1000</option>
                                    <option value={5}>Über 1001</option>
                                </select>
                            </div>
                        </div>
                        <InputLabel
                            label={'Webseite'}
                            value={this.state.company.website}
                            onChange={(website) => this.setState({
                                company: Object.assign({}, this.state.company, { website })
                            })}
                        />
                        <InputLabel
                            label={'kununu Link'}
                            value={this.state.company.kununu}
                            onChange={(kununu) => this.setState({
                                company: Object.assign({}, this.state.company, { kununu })
                            })}/>
                        <InputLabel
                            label={'Haupttätigkeitsbereich'}
                            value={this.state.company.field_of_activity}
                            onChange={(field_of_activity) => this.setState({
                                company: Object.assign({}, this.state.company, { field_of_activity })
                            })}/>
                        <div className='form-group row'>
                            <div className='col-4 col-form-label'>
                                Kontakt bei {this.state.company.company_name}
                            </div>
                        </div>
                        <InputLabel
                            label={'Name'}
                            value={this.state.company.contact_name}
                            onChange={(contact_name) => this.setState({
                                company: Object.assign({}, this.state.company, { contact_name })
                            })}/>
                        <InputLabel
                            label={'Email'}
                            value={this.state.company.contact_email}
                            onChange={(contact_email) => this.setState({
                                company: Object.assign({}, this.state.company, { contact_email })
                            })}/>
                        <InputLabel
                            label={'Telefon'}
                            value={this.state.company.contact_phone}
                            onChange={(contact_phone) => this.setState({
                                company: Object.assign({}, this.state.company, { contact_phone })
                            })}/>
                        <div className='form-group row'>
                            <label htmlFor={'logo'} className='col-4 col-form-label'>
                                Firmenlogo
                            </label>
                            <div className='col-8'>
                                <button type={'button'} className='btn btn-primary' data-toggle="modal"
                                        data-target="#uploadFile">
                                    Logo ändern/hochladen
                                </button>
                                {this.state.company.logo &&
                                    <img src={this.state.company.logo} style={{ marginLeft: 12 }} height={38} alt={'logo'}/>
                                }
                            </div>
                            <UploadFileModal
                                title={'Logo ändern/hochladen'}
                                returnFile={(logo) => this.setState({
                                    company: Object.assign({}, this.state.company, { logo }),
                                    logoChanged: true
                                })}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor={'description'} >
                                Beschreibung
                            </label>
                            <TextEditor
                                id={'description'}
                                value={this.state.company.company_description}
                                onChange={(company_description) => this.setState({
                                    company: Object.assign({}, this.state.company, { company_description })
                                })}/>
                        </div>
                        <div>
                            <input type={'submit'} className={'btn btn-primary float-right buttons-form'} value={this.state.create ? 'Speichern' : 'Update'}/>
                        </div>
                    </form>
                )}
                </div>
                {!this.state.create && (
                    <div>
                        <button className={'btn btn-primary'} onClick={this.handleDelete}>delete this company</button>
                    </div>
                )}
                <div className={'float-right'}>
                    <button className={'btn btn-danger buttons-form'} onClick={() => this.props.history.push('/companies')}>Abbrechen</button>
                </div>
            </div>
        );
    }
}

export default Company;
