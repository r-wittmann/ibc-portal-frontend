import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import TextEditor from "../../commons/TextEditor";
import defaultCompany from '../../commons/defaultCompany';
import UploadFileModal from "../../commons/UploadFileModal";
import Header from "../Header";
import { toast } from 'react-toastify';
import ConfirmModal from "../../commons/ConfirmModal";
import CompanyPreview from "./CompanyPreview";

class Company extends Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            let updatedCompany = this.state.company;
            delete(updatedCompany.created_at);
            delete(updatedCompany.updated_at);
            if (!this.state.logoChanged) {
                delete(updatedCompany.logo);
            }
            backendService.updateCompany(this.props.match.params.id, updatedCompany)
                .then(() => toast('Unternehmen aktualisiert', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
        } else {
            backendService.createCompany(this.state.company)
                .then(() => this.props.history.push(`/companies`))
                .then(() => toast('Unternehmen erstellt', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
        }

    };
    handleDelete = (event) => {
        event.preventDefault();
        backendService.deleteCompany(this.props.match.params.id)
            .then(() => this.props.history.push('/companies'))
            .then(() => toast('Unternehmen erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            company: undefined,
            logoChanged: false,
            create: this.props.match.params.id === 'create'
        };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({ preview: true })
        }
        if (!this.state.create) {
            backendService.getCompanyById(this.props.match.params.id)
                .then(company => this.setState({ company }));
        } else {
            this.setState({ company: defaultCompany });
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                {this.state.preview ? (
                    <CompanyPreview
                        company={this.state.company}
                        endPreview={this.props.preview
                            ? () => this.props.history.push('/companies')
                            : () => this.setState({ preview: false })
                        }
                        primaryAction={this.props.preview
                            ? () => {
                                this.props.history.push(`/companies/${this.state.company.id}`);
                                this.setState({ preview: false })
                            }
                            : this.handleFormSubmit
                        }
                        primaryActionText={this.props.preview ? 'Editieren' : 'Speichern'}
                    />
                ) : (
                    <div>
                        <div className={'headline'}>
                            <h1>{this.state.create ? 'Neues Unternehmen erstellen' : 'Unternehmen bearbeiten'}</h1>
                        </div>
                        <div className={'container'}>
                            {this.state.company && (
                                <div>
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
                                                    <option value={6}>Über 1001</option>
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
                                                <img src={this.state.company.logo} style={{ marginLeft: 12 }}
                                                     height={38}
                                                     alt={'logo'}/>
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
                                            <label htmlFor={'description'}>
                                                Beschreibung
                                            </label>
                                            <TextEditor
                                                id={'description'}
                                                value={this.state.company.company_description}
                                                onChange={(company_description) => this.setState({
                                                    company: Object.assign({}, this.state.company, { company_description })
                                                })}/>
                                        </div>
                                    </form>
                                    <div className='float-right'>
                                        {!this.state.create && (
                                            <span>
                                                <button className={'btn btn-danger buttons-form'}
                                                        data-toggle={'modal'}
                                                        data-target={'#confirm-modal'}>
                                                    Unternehmen löschen
                                                </button>
                                                <ConfirmModal
                                                    id={'confirm-modal'}
                                                    message={`Wollen Sie das Unternehmen ${this.state.company.company_name} wirklich löschen?`}
                                                    positiveAction={this.handleDelete}
                                                    positiveText={'Löschen'}
                                                    negativeAction={() => {/*closes the modal*/
                                                    }}
                                                    negativeText={'Abbrechen'}/>
                                            </span>
                                        )}
                                        <button className={'btn btn-warning buttons-form'}
                                                onClick={() => this.props.history.push('/companies')}>
                                            {this.state.create ? 'Abbrechen' : 'Zurück'}
                                        </button>
                                        <button className={'btn btn-primary button-form'}
                                                onClick={() => this.setState({ preview: true })}>
                                            Vorschau
                                        </button>
                                        <button className={'btn btn-success buttons-form'}
                                                onClick={this.handleFormSubmit}>
                                            {this.state.create ? 'Speichern' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Company;
