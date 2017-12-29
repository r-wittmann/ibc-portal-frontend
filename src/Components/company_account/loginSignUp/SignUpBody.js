import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';

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
                    .then(() => this.props.history.push('/home'));
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
            mother_company: '',
            address: '',
            contact_name: '',
            contact_email: '',
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
                        <InputLabel
                            label={'Benutzername'}
                            type={'name'}
                            value={this.state.name}
                            onChange={(name) => {
                                this.setState({ name });
                                backendService.checkUsername(name)
                                    .then(() => console.log('username ok'))
                                    .catch(() => console.log('username taken'));
                            }}/>
                        <InputLabel
                            label={'Email'}
                            type={'email'}
                            value={this.state.email}
                            onChange={(email) => this.setState({ email })}/>
                        <fieldset className="form-group">
                            <div className="row">
                                <legend className="col-form-legend col-4">Unternehmenstype</legend>
                                <div className="col-8 col-form-label">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name="gridRadios"
                                                   value="ibc"
                                                   checked={this.state.company_type === 'ibc'}

                                                   onChange={() => this.setState({ company_type: 'ibc'})}/>
                                            IBC-Unternehmen
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name="gridRadios"
                                                   value="startup"
                                                   checked={this.state.company_type === 'startup'}
                                                   onChange={() => this.setState({ company_type: 'startup' })}/>
                                            Startup
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name="gridRadios"
                                                   value="ngo"
                                                   checked={this.state.company_type === 'ngo'}
                                                   onChange={() => this.setState({ company_type: 'ngo' })}/>
                                            Gemeinnütziger Verein
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {this.state.company_type === 'ibc' &&
                         <p className= "text-primary">Wenn Sie sich als <b>IBC Unternehmen</b> registrieren wollen, müssen Sie bereits Mitglied des IBCs sein.</p>
                        }
                        {this.state.company_type === 'startup' &&
                        <div><p className= "text-primary" style = {{marginBottom: '5px'}}>Wenn Sie sich als <b >Startup</b> registrieren wollen, müssen Sie folgende Kriterien erfüllen:</p>
                        <li>Standort in München oder Umgebung</li>
                        <li>Weniger als 20 Mitarbeiter</li>
                        <li>Umsatz unter €10 Millionen im letzten Jahr </li>
                        <li>Kein Gewinn im letzten Jahr</li>
                        </div>
                        }
                        {this.state.company_type === 'ngo' &&
                        <div className= "text-primary">Wenn Sie sich als Gemeinnütziger Verein registrieren wollen, müssen Sie folgende Kriterien erfüllen:</div>
                        }
                        </fieldset>
                        
                                                

                        <div className={'float-right'}>
                            <input className={'btn btn-primary'} type={'submit'} value={'Nächster Schritt'}/>
                        </div>
                    </form>
                )}
                {this.state.currentStep === 1 && (
                    <form onSubmit={(event) => this.handleSubmit(1, event)}>
                        <InputLabel
                            label={'Unternehmen'}
                            value={this.state.mother_company}
                            onChange={(mother_company) => this.setState({ mother_company })}/>
                       <div className='form-group row'>
                            <label htmlFor={'address'} className='col-4 col-form-label'>
                                Ihre Adresse in München und Umgebung
                            </label>
                            <div className='col-8'>
                                <textarea
                                    id={'address'}
                                    className={'form-control'}
                                    rows='3'
                                    value={this.props.value}
                                    onChange={(event) => this.setState({address: event.target.value})}/>
                            </div>
                        </div>


                        <InputLabel
                            label={'Ansprechpartner'}
                            value={this.state.contact_name}
                            onChange={(contact_name) => this.setState({ contact_name })}/>
                        <InputLabel
                            label={'Email'}
                            value={this.state.contact_email}
                            onChange={(contact_email) => this.setState({ contact_email })}/>
                        <InputLabel
                            label={'Telefon'}
                            value={this.state.contact_phone}
                            onChange={(contact_phone) => this.setState({ contact_phone })}/>
                        <InputLabel
                            label={'Website'}
                            value={this.state.website}
                            onChange={(website) => this.setState({ website })}/>
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
