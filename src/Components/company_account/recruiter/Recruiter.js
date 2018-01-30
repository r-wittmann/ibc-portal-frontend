import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';
import defaultRecruiter from '../../commons/defaultRecruiter';
import UploadFileModal from '../../commons/UploadFileModal';
import Header from '../Header';
import { toast } from 'react-toastify';
import RecruiterPreview from './RecruiterPreview';
import ConfirmModal from '../../commons/ConfirmModal';

class Recruiter extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        // check the validity of the form before continuing to save the recruiter
        if (this.inputForm.hasAttribute('novalidate') && !this.inputForm.checkValidity()) {
            event.stopPropagation();
            this.inputForm.classList.add('was-validated')
        } else {
            if (event.target.getAttribute('id') === 'preview') {
                this.setState({ preview: true });
            } else {
                if (!this.state.create) {
                    let updatedRecruiter = this.state.recruiter;
                    // remove values that can't be updated from the object
                    delete(updatedRecruiter.created_at);
                    delete(updatedRecruiter.updated_at);
                    if (!this.state.photoChanged) {
                        delete(updatedRecruiter.photo);
                    }
                    backendService.updateRecruiter(this.props.match.params.id, updatedRecruiter)
                        .then(() => this.props.history.push(`/company/recruiters`))
                        .then(() => toast('Recruiter aktualisiert', { type: 'success' }))
                        .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
                } else {
                    backendService.createRecruiter(this.state.recruiter)
                        .then(() => this.props.history.push(`/company/recruiters`))
                        .then(() => toast('Recruiter erstellt', { type: 'success' }))
                        .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
                }
            }
        }
    };

    handleDelete = (event) => {
        event.preventDefault();
        backendService.deleteRecruiter(this.props.match.params.id)
            .then(() => this.props.history.push('/company/recruiters'))
            .then(() => toast('Recruiter erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            recruiter: undefined,
            photoChanged: false,
            create: this.props.match.params.id === 'create',
            loading: false
        };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({ preview: true })
        }
        if (!this.state.create) {
            this.setState({ loading: true });
            backendService.getRecruiterById(this.props.match.params.id)
                .then(recruiter => this.setState({ recruiter, loading: false }));
        } else {
            this.setState({ recruiter: defaultRecruiter });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  ref={(form) => this.inputForm = form}
                  noValidate>
                <Header history={this.props.history}/>
                {this.state.loading
                    ? <div className={'loader'}/>
                    : <div className={'container'}>
                        {this.state.preview
                            ? <RecruiterPreview
                                recruiter={this.state.recruiter}
                                endPreview={this.props.preview
                                    ? () => this.props.history.goBack()
                                    : () => this.setState({ preview: false })
                                }
                                primaryAction={this.props.preview
                                    ? () => {
                                        this.props.history.push(`/company/recruiters/${this.state.recruiter.id}`);
                                        this.setState({ preview: false })
                                    }
                                    : this.handleSubmit
                                }
                                primaryActionText={this.props.preview ? 'Editieren' : 'Speichern'}
                            />
                            : <div>
                                <div className={'headline'}>
                                    <h1>{this.state.create ? 'Neuen Recruiter erstellen' : 'Recruiter bearbeiten'}</h1>
                                </div>
                                {this.state.recruiter &&
                                <div>
                                    <InputLabel
                                        label={'Name *'}
                                        required
                                        value={this.state.recruiter.recruiter_name}
                                        onChange={(recruiter_name) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { recruiter_name })
                                        })}
                                        errorMessage={'Name ist ein Pflichtfeld'}/>
                                    <InputLabel
                                        label={'Email *'}
                                        required
                                        type={'Email'}
                                        value={this.state.recruiter.recruiter_email}
                                        onChange={(recruiter_email) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { recruiter_email })
                                        })}
                                        errorMessage={'Bitte eine valide Email-Adresse eingeben'}/>
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
                                        label={'Position *'}
                                        required
                                        value={this.state.recruiter.position}
                                        onChange={(position) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { position })
                                        })}
                                        errorMessage={'Position ist ein Pflichtfeld'}/>
                                    <InputLabel
                                        label={'Standort'}
                                        value={this.state.recruiter.location}
                                        onChange={(location) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { location })
                                        })}/>
                                    <div className='form-group row'>
                                        <label htmlFor={'photo'} className='col-4 col-form-label'>
                                            Foto Upload
                                        </label>
                                        <div className='col-8'>
                                            <button type={'button'} className='btn btn-primary'
                                                    data-toggle={'modal'}
                                                    data-target={'#uploadFile'}>
                                                Foto ändern/hochladen
                                            </button>
                                            {this.state.recruiter.photo &&
                                            <img src={this.state.recruiter.photo} style={{ marginLeft: 12 }}
                                                 height={38}
                                                 alt={'logo'}/>
                                            }
                                        </div>
                                        <UploadFileModal
                                            title={'Foto ändern/hochladen'}
                                            accept={'image/*'}
                                            returnFile={(photo) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { photo }),
                                                photoChanged: true
                                            })}/>
                                    </div>
                                    <InputLabel
                                        label={'XING-Profil'}
                                        type={'url'}
                                        value={this.state.recruiter.xing}
                                        onChange={(xing) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { xing })
                                        })}
                                        errorMessage={'Bitte eine valide URL eingeben (Format: http://www.xxxx.xx)'}/>
                                    <InputLabel
                                        label={'LinkedIn-Profil'}
                                        type={'url'}
                                        value={this.state.recruiter.linked_in}
                                        onChange={(linked_in) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { linked_in })
                                        })}
                                        errorMessage={'Bitte eine valide URL eingeben (Format: http://www.xxxx.xx)'}/>
                                    <div className='float-right'>
                                        {!this.state.create &&
                                        <span>
                                            <button className={'btn btn-danger buttons-form'}
                                                    type={'button'}
                                                    data-toggle={'modal'}
                                                    data-target={'#confirm-modal'}>
                                                Recruiter löschen
                                            </button>
                                            <ConfirmModal
                                                id={'confirm-modal'}
                                                message={`Wollen Sie den Recruiter ${this.state.recruiter.recruiter_name} wirklich löschen?`}
                                                positiveAction={this.handleDelete}
                                                positiveText={'Löschen'}
                                                negativeAction={() => {/*closes the modal*/
                                                }}
                                                negativeText={'Abbrechen'}/>
                                        </span>
                                        }
                                        <button type={'button'} className={'btn btn-secondary buttons-form'}
                                                onClick={() => this.props.history.goBack()}>
                                            {this.state.create ? 'Abbrechen' : 'Zurück'}
                                        </button>
                                        <button id={'preview'} className={'btn btn-light button-form'}
                                                onClick={this.handleSubmit}>
                                            Vorschau
                                        </button>
                                        <button className={'btn btn-primary buttons-form'}>
                                            Speichern
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>
                        }
                    </div>
                }
            </form>
        );
    }
}

export default Recruiter;
