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
import translate from "../../../translationService";

class Company extends Component {
    handleSubmit = (event) => {
        if (event.target.getAttribute('id') === 'preview') {
            if (this.inputForm.checkValidity()) {
                this.setState({ preview: true });
            } else {
                return false;
            }
        } else {
            event.preventDefault();
            if (event.target.getAttribute('id') === 'preview') {
                this.setState({ preview: true });
            } else {
                if (!this.state.create) {
                    let updatedCompany = this.state.company;
                    delete(updatedCompany.created_at);
                    delete(updatedCompany.updated_at);
                    if (!this.state.logoChanged) {
                        delete(updatedCompany.logo);
                    }
                    backendService.updateCompany(this.props.match.params.id, updatedCompany)
                        .then(() => this.props.history.push(`/company/companies`))
                        .then(() => toast('Unternehmen aktualisiert', { type: 'success' }))
                        .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
                } else {
                    backendService.createCompany(this.state.company)
                        .then(() => this.props.history.push(`/company/companies`))
                        .then(() => toast('Unternehmen erstellt', { type: 'success' }))
                        .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
                }
            }
        }
    };
    handleDelete = (event) => {
        event.preventDefault();
        backendService.deleteCompany(this.props.match.params.id)
            .then(() => this.props.history.push('/company/companies'))
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
            <form onSubmit={this.handleSubmit}
                  ref={(form) => this.inputForm = form}>
                <Header history={this.props.history}/>
                {this.state.company &&
                <div className={'container'}>
                    {this.state.preview ? (
                        <CompanyPreview
                            company={this.state.company}
                            endPreview={this.props.preview
                                ? () => this.props.history.goBack()
                                : () => this.setState({ preview: false })
                            }
                            primaryAction={this.props.preview
                                ? () => {
                                    this.props.history.push(`/company/companies/${this.state.company.id}`);
                                    this.setState({ preview: false })
                                }
                                : this.handleSubmit
                            }
                            primaryActionText={this.props.preview ? 'Editieren' : 'Speichern'}
                        />
                    ) : (
                        <div>
                            <div className={'headline'}>
                                <h1>{this.state.create ? 'Neues Unternehmen erstellen' : 'Unternehmen bearbeiten'}</h1>
                            </div>
                            {this.state.company && (
                                <div>
                                    <InputLabel
                                        label={'Unternehmensname'}
                                        required
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
                                                required
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
                                                {Object.keys(translate.numberOfEmployees()).map(key =>
                                                    <option key={key} value={key}>{translate.numberOfEmployees(key)}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <InputLabel
                                        label={'Webseite'}
                                        required
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
                                        required
                                        value={this.state.company.field_of_activity}
                                        onChange={(field_of_activity) => this.setState({
                                            company: Object.assign({}, this.state.company, { field_of_activity })
                                        })}/>
                                    <div className='form-group row'>
                                        <label htmlFor={'logo'} className='col-4 col-form-label'>
                                            Firmenlogo
                                        </label>
                                        <div className='col-8'>
                                            <button type={'button'} className='btn btn-primary'
                                                    data-toggle="modal"
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
                                    <div className='float-right'>
                                        {!this.state.create &&
                                        <span>
                                                <button className={'btn btn-danger buttons-form'}
                                                        type={'button'}
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
                                        }
                                        <button type={'button'} className={'btn btn-warning buttons-form'}
                                                onClick={() => this.props.history.goBack()}>
                                            {this.state.create ? 'Abbrechen' : 'Zurück'}
                                        </button>
                                        <button id={'preview'} className={'btn btn-primary button-form'}
                                                onClick={this.handleSubmit}>
                                            Vorschau
                                        </button>
                                        <button className={'btn btn-success buttons-form'}>
                                            {this.state.create ? 'Speichern' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                }
            </form>
        );
    }
}

export default Company;
