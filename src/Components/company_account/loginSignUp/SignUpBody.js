import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';

class SignUpBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            company: '',
            street: '',
            city: '',
            payment: 'paypal',
            vat: '',
            currentStep: 0
        };
    }

    handleSubmit = (step, event) => {
        event.preventDefault();
        switch (step) {
            case 0:
                this.setState({ currentStep: 1 });
                break;
            case 1:
                this.setState({ currentStep: 2 });
                break;
            case 2:
                backendService.register({
                    email: this.state.email,
                    password: this.state.password,
                    company: this.state.company,
                    street: this.state.street,
                    city: this.state.city,
                    payment: this.state.payment,
                    vat: this.state.vat
                })
                    .then(() => this.props.history.push('/'));
                break;
            default:
                return false;
        }

    };

    render() {
        return (
            <div style={{ margin: 20 }}>
                {this.state.currentStep === 0 && (
                    <form onSubmit={(event) => this.handleSubmit(0, event)}>
                        <InputLabel
                            label={'Email'}
                            type={'email'}
                            value={this.state.email}
                            onChange={(email) => this.setState({ email })}/>
                        <InputLabel
                            label={'Passwort'}
                            type={'password'}
                            value={this.state.password}
                            onChange={(password) => this.setState({ password })}/>
                        <InputLabel
                            label={'Bestätigen'}
                            type={'password'}
                            value={this.state.confirmPassword}
                            onChange={(confirmPassword) => this.setState({ confirmPassword })}/>
                        <div className={''}>
                            <input className={'btn btn-primary'} type={'submit'} value={'Nächster Schritt'}/>
                        </div>
                    </form>
                )}
                {this.state.currentStep === 1 && (
                    <form onSubmit={(event) => this.handleSubmit(1, event)}>
                        <InputLabel
                            label={'Firma'}
                            value={this.state.company}
                            onChange={(company) => this.setState({ company })}/>
                        <InputLabel
                            label={'Straße'}
                            value={this.state.street}
                            onChange={(street) => this.setState({ street })}/>
                        <InputLabel
                            label={'Ort'}
                            value={this.state.city}
                            onChange={(city) => this.setState({ city })}/>
                        <div className={'float-right'}>
                            <input className={'btn btn-primary'} type={'submit'} value={'Nächster Schritt'}/>
                        </div>
                    </form>
                )}
                {this.state.currentStep === 2 && (
                    <form onSubmit={(event) => this.handleSubmit(2, event)}>
                        <div className={'form-row'}>
                            <label htmlFor={'paymentDropdown'} className='col-form-label col-sm-4'>
                                Bezahlmethode
                            </label>
                            <div className="form-group col-sm-8">
                                <select id={'paymentDropdown'} value={this.state.payment} className="form-control"
                                        onChange={(event) => this.setState({ payment: event.target.value })}>
                                    <option value={'paypal'}>PayPal</option>
                                    <option value={'transfer'}>Überweisung</option>
                                    <option value={'credit'}>Kreditkarte</option>
                                </select>
                            </div>
                        </div>
                        <InputLabel
                            label={'Steuernummer'}
                            value={this.state.vat}
                            onChange={(vat) => this.setState({ vat })}/>
                        <div className={'float-right'}>
                            <input className={'btn btn-primary'} type={'submit'} value={'Registrieren'}/>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default SignUpBody;
