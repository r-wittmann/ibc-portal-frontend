import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import translate from "../../../translationService";

class SignUpBody extends Component {
    handleSubmit = (step, event) => {
        event.preventDefault();
        switch (step) {
            case 0:
                this.setState({ currentStep: 1 });
                break;
            case 1:
                let reqBody = this.state;
                delete reqBody.currentStep;
                backendService.register(reqBody)
                    .then(() => this.props.history.push('company/home'))
                    .then(() => toast('Registrierung abgeschlossen. Sie erhalten eine Email mit einem generierten Passwort, ' +
                        'nachdem ihre Registrirung von uns überprüft wurde. Dies kann bis zu drei Werktage dauern.',
                        { type: 'success', autoClose: false }))
                    .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
                break;
            default:
                return false;
        }

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
            currentStep: 0
        };
    }

    render() {
        return (
            <div style={{ margin: 20 }}>
                {this.state.currentStep === 0 && (
                    <form onSubmit={(event) => this.handleSubmit(0, event)}>
                        <InputLabel className="form-control"
                                    label={'Unternehmen'}
                                    required
                                    value={this.state.name}
                                    onChange={(name) => {
                                        this.setState({ name });
                                        backendService.checkUsername(name)
                                            .then(() => console.log('username ok'))
                                            .catch(() => console.log('username taken'));
                                    }}
                                    require={true}
                        />
                        <InputLabel
                            label={'Email'}
                            required
                            className="form-control"
                            type={'email'}
                            value={this.state.email}
                            onChange={(email) => this.setState({ email })}/>
                        <label style={{ fontSize: 14 }}>Sowohl Unternehmensname und E-Mail-Adresse können zum Login
                            benutzt werden</label>
                        <fieldset className="form-group">
                            <div className="row">
                                <legend className="col-form-legend col-4">Unternehmenstype</legend>
                                <div className="col-8 col-form-label">
                                    {Object.keys(translate.companyType()).map(key =>
                                        <div className="form-check" key={key}>
                                            <label className="form-check-label">
                                                <input className="form-check-input"
                                                       type="radio"
                                                       name="gridRadios"
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
                            <p className="text-info">Wenn Sie sich als <b>IBC Unternehmen</b> registrieren wollen,
                                müssen Sie bereits Mitglied des IBCs sein.</p>
                            }
                            {this.state.company_type === 'startup' &&
                            <div style={{ marginBottom: "16px" }}><p className="text-info"
                                                                     style={{ marginBottom: '5px' }}>
                                Wenn Sie sich als <b>Startup</b> registrieren wollen, müssen Sie folgende Kriterien
                                erfüllen:</p>
                                <li className="registrierungskriterien">Standort in München oder Umgebung</li>
                                <li className="registrierungskriterien">Weniger als 20 Mitarbeiter</li>
                                <li className="registrierungskriterien">Umsatz unter €10 Millionen im letzten Jahr</li>
                                <li className="registrierungskriterien">Kein Gewinn im letzten Jahr</li>
                                <li className="registrierungskriterien">Vorzugsweise digitales Hauptgeschäftsfeld
                                    (siehe <Link to={'/faq'} target={'_blank'}>FAQs</Link>)
                                </li>
                            </div>
                            }
                            {this.state.company_type === 'ngo' &&
                            <div style={{ marginBottom: "16px" }}><p className="text-info"
                                                                     style={{ marginBottom: '5px' }}>
                                Wenn Sie sich als <b>Gemeinnütziger Verein</b> registrieren wollen, müssen Sie folgende
                                Kriterien erfüllen:</p>
                                <li className="registrierungskriterien">Standort in München oder Umgebung</li>
                                <li className="registrierungskriterien">Sie sind ein gemeinnütziger Verein</li>
                                <li className="registrierungskriterien">Sie verfolgen keine wirtschaftlichen
                                    Tätigkeiten
                                </li>
                                <li className="registrierungskriterien">Vorzugsweise digitales Hauptgeschäftsfeld
                                    (siehe <Link to={'/faq'} target={'_blank'}>FAQs</Link>)
                                </li>
                            </div>
                            }

                            <div className="checkbox" style={{ marginTop: "10px" }}>
                                <label style={{ fontSize: "9px" }}><input required type="checkbox" value=""/> Hiermit
                                    versichere ich die oben genannten Voraussetzungen zu erfüllen.</label>
                            </div>
                        </fieldset>


                        <div className={'float-right'}>
                            <input className={'btn btn-primary'} type={'submit'} value={'Nächster Schritt'}/>
                        </div>
                    </form>
                )}
                {this.state.currentStep === 1 && (
                    <form onSubmit={(event) => this.handleSubmit(1, event)}>
                        <InputLabel
                            label={'Kontakt'}
                            className="form-control"
                            required
                            value={this.state.contact_name}
                            onChange={(contact_name) => this.setState({ contact_name })}/>

                        <InputLabel
                            label={'Telefon'}
                            className="form-control"
                            required
                            value={this.state.contact_phone}
                            onChange={(contact_phone) => this.setState({ contact_phone })}/>

                        <InputLabel
                            label={'Website'}
                            required
                            className="form-control"
                            value={this.state.website}
                            onChange={(website) => this.setState({ website })}/>

                        <div className='form-group row'>
                            <label htmlFor={'address'} className='col-4 col-form-label'>
                                Ihre Adresse in München und Umgebung
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
                            </div>
                        </div>

                        <div className={'float-right'}>
                            <input className={'btn btn-primary'} type={'submit'} value={'Registrierung abschließen'}/>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default SignUpBody;
