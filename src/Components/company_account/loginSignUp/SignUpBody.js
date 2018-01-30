import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';
import { toast } from 'react-toastify';
import translate from '../../../translationService';
import { Link } from 'react-router-dom';

class SignUpBody extends Component {
    handleSubmit = (step, event) => {
        event.preventDefault();
        if (event.target.hasAttribute('novalidate') && !event.target.checkValidity()) {
            event.stopPropagation();
            event.target.classList.add('was-validated')
        } else {
            switch (step) {
                case 0:
                    this.setState({ currentStep: 1 });
                    break;
                case 1:
                    let reqBody = this.state;
                    delete reqBody.currentStep;
                    delete reqBody.usernameOk;
                    backendService.register(reqBody)
                        .then(() => this.props.history.push('company/home'))
                        .then(() => toast('Registrierung abgeschlossen. Sie erhalten eine Email mit einem generierten Passwort, ' +
                            'nachdem ihre Registrierung von uns überprüft wurde. Dies kann bis zu drei Werktage dauern.',
                            { type: 'success' }))
                        .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
                    break;
                default:
                    return false;
            }
        }

    };

    // backend returns 200 if the name is valid, 400 if it is already taken
    // immediately add validation classes for user feedback
    // method is called on the blur event of the name field
    checkUsername = (event) => {
        event.persist();
        this.setState({ name: event.target.value });
        backendService.checkUsername(event.target.value)
            .then(() => {
                this.setState({ usernameOk: true });
                event.target.classList.remove('is-invalid');
                event.target.classList.add('is-valid');

            })
            .catch(() => {
                this.setState({ usernameOk: false });
                event.target.classList.remove('is-valid');
                event.target.classList.add('is-invalid');
                toast('Unternehmensname existiert bereits', { type: 'error' });
            });
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            company_type: 'ibc',
            address: '',
            contact_name: '',
            contact_phone: '',
            website: '',
            currentStep: 0,
            usernameOk: false
        };
    }

    render() {
        return (
            <div style={{ margin: 20 }}>
                {this.state.currentStep === 0 &&
                <form onSubmit={(event) => this.handleSubmit(0, event)}
                      className={'needs-validation'}
                      noValidate>
                    <InputLabel className={'form-control'} data-toggle={'tooltip'} data-placement={'top'}
                                title={'Wählen Sie bitte die Option, die am besten zu Ihrem Unternehmen passt'}
                                label={'Unternehmen *'}
                                required
                                value={this.state.name}
                                onChange={(name) => this.setState({ name })}
                                onBlur={this.checkUsername}
                                errorMessage={'Bitte Unternehmensname auswählen'}
                    />
                    <InputLabel label={'Email *'}
                                required
                                className={'form-control'}
                                type={'email'}
                                value={this.state.email}
                                onChange={(email) => this.setState({ email })}
                                errorMessage={'Bitte eine valide Email-Adresse eingeben'}/>

                    <label style={{ fontSize: 14 }}>
                        Sowohl Unternehmensname als auch E-Mail-Adresse können zum Login genutzt werden.
                    </label>
                    <fieldset className={'form-group'}>
                        <div className={'row'}>
                            <legend className={'col-form-legend col-6'} data-toggle={'tooltip'} data-placement={'top'}
                                    title={'Wählen Sie bitte die Option, die am besten zu Ihrem Unternehmen passt'}>Unternehmenstyp <span
                                className={'fa fa-info-circle'}/></legend>
                            <div className={'col-6 col-form-label'}>
                                {Object.keys(translate.companyType()).map(key =>
                                    <div className={'form-check'} key={key}>
                                        <label className={'form-check-label'}>
                                            <input className={'form-check-input'}
                                                   type={'radio'}
                                                   name={'gridRadios'}
                                                   value={key}
                                                   checked={this.state.company_type === key}
                                                   onChange={() => this.setState({ company_type: key })}/>
                                            {translate.companyType(key)}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        {this.state.company_type === 'ibc' &&
                        <p className={'text-info'}>Wenn Sie sich als <b>IBC Unternehmen</b> registrieren wollen,
                            müssen Sie bereits Mitglied des IBCs sein.</p>
                        }
                        {this.state.company_type === 'startup' &&
                        <div style={{ marginBottom: 16 }}>
                            <p className={'text-info'} style={{ marginBottom: 5 }}>
                                Wenn Sie sich als <b>Startup</b> registrieren wollen, müssen Sie folgende Kriterien
                                erfüllen:
                            </p>
                            <li className={'registrierungskriterien'}>Standort in München oder Umgebung</li>
                            <li className={'registrierungskriterien'}>Weniger als 20 Mitarbeiter</li>
                            <li className={'registrierungskriterien'}>Umsatz unter €10 Millionen im letzten Jahr</li>
                            <li className={'registrierungskriterien'}>Kein Gewinn im letzten Jahr</li>
                            <li className={'registrierungskriterien'}>Vorzugsweise digitales Hauptgeschäftsfeld
                                (siehe <Link to={'/faq'} target={'_blank'}>FAQs</Link>)
                            </li>
                        </div>
                        }
                        {this.state.company_type === 'ngo' &&
                        <div style={{ marginBottom: 16 }}>
                            <p className={'text-info'} style={{ marginBottom: 5 }}>
                                Wenn Sie sich als <b>Gemeinnütziger Verein</b> registrieren wollen, müssen Sie folgende
                                Kriterien erfüllen:
                            </p>
                            <li className={'registrierungskriterien'}>Standort in München oder Umgebung</li>
                            <li className={'registrierungskriterien'}>Sie sind ein gemeinnütziger Verein</li>
                            <li className={'registrierungskriterien'}>
                                Sie verfolgen keine wirtschaftlichen Tätigkeiten
                            </li>
                            <li className={'registrierungskriterien'}>
                                Vorzugsweise digitales Hauptgeschäftsfeld
                                (siehe <Link to={'/faq'} target={'_blank'}>FAQs</Link>)
                            </li>
                        </div>
                        }

                        <div className={'form-group'} style={{ marginLeft: 20, fontSize: 10 }}>
                            <div className={'form-check'}>
                                <input className={'form-check-input'} type={'checkbox'} value={''}
                                       id={'invalidCheck'} required/>
                                <label className={'form-check-label'} htmlFor={'invalidCheck'}>
                                    Hiermit versichere ich die oben genannten Voraussetzungen zu erfüllen.
                                </label>
                            </div>
                        </div>
                    </fieldset>


                    <div className={'float-right'}>
                        <button className={'btn btn-primary'}
                                disabled={!this.state.usernameOk}>
                            Nächster Schritt
                        </button>
                    </div>
                </form>
                }
                {this.state.currentStep === 1 &&
                <form onSubmit={(event) => this.handleSubmit(1, event)}
                      noValidate>
                    <InputLabel
                        label={'Kontaktperson *'}
                        className={'form-control'}
                        required
                        value={this.state.contact_name}
                        onChange={(contact_name) => this.setState({ contact_name })}
                        errorMessage={'Kontaktperson ist ein Pflichtfeld'}/>

                    <InputLabel
                        label={'Telefon *'}
                        className={'form-control'}
                        required
                        type={'tel'}
                        value={this.state.contact_phone}
                        onChange={(contact_phone) => this.setState({ contact_phone })}
                        errorMessage={'Telefonnummer ist ein Pflichtfeld'}/>

                    <InputLabel
                        label={'Website *'}
                        required
                        type={'url'}
                        className={'form-control'}
                        value={this.state.website}
                        onChange={(website) => this.setState({ website })}
                        errorMessage={'Bitte valide Website angeben (Format: http://www.xxxx.xx)'}/>

                    <div className='form-group row'>
                        <label htmlFor={'address'} className='col-4 col-form-label'>
                            Ihre Adresse in München und Umgebung *
                        </label>
                        <div className='col-8'>
                            <textarea
                                id={'address'}
                                placeholder={'Musterstraße 15a \n12345 München'}
                                required
                                className={'form-control'}
                                rows='3'
                                value={this.props.value}
                                onChange={(event) => this.setState({ address: event.target.value })}/>
                            <div className={'invalid-feedback'}>Bitte eine Adresse angeben</div>
                        </div>
                    </div>

                    <div className={'float-right'}>
                        <input className={'btn btn-primary'} type={'submit'} value={'Registrierung abschließen'}/>
                    </div>
                </form>
                }
            </div>
        );
    }
}

export default SignUpBody;
