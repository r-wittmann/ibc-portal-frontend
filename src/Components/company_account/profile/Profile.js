import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";

class Company extends Component {
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
            .then(response => this.setState({ profile: response.profile }));
    };

    render() {
        return (
            <div>
                <div>Profile</div>
                {this.state.profile && (
                    <form onSubmit={this.handleSubmit}>
                        <InputLabel
                            label={'Email'}
                            value={this.state.profile.email}
                            onChange={(email) => this.setState({
                                profile: Object.assign({}, this.state.profile, { email })
                            })}/>
                        <InputLabel
                            label={'Firma'}
                            value={this.state.profile.company}
                            onChange={(company) => this.setState({
                                profile: Object.assign({}, this.state.profile, { company })
                            })}/>
                        <InputLabel
                            label={'Straße'}
                            value={this.state.profile.street}
                            onChange={(street) => this.setState({
                                profile: Object.assign({}, this.state.profile, { street })
                            })}/>
                        <InputLabel
                            label={'Ort'}
                            value={this.state.profile.city}
                            onChange={(city) => this.setState({
                                profile: Object.assign({}, this.state.profile, { city })
                            })}/>
                        <div className={'form-row'}>
                            <label htmlFor={'paymentDropdown'} className='col-form-label col-sm-4'>
                                Bezahlmethode
                            </label>
                            <div className="form-group col-sm-8">
                                <select id={'paymentDropdown'} value={this.state.profile.payment} className="form-control"
                                        onChange={(event) => this.setState({
                                                profile:Object.assign({}, this.state.profile, { payment: event.target.value })
                                        })}>
                                    <option value={'paypal'}>PayPal</option>
                                    <option value={'transfer'}>Überweisung</option>
                                    <option value={'credit'}>Kreditkarte</option>
                                </select>
                            </div>
                        </div>
                        <InputLabel
                            label={'Steuernummer'}
                            value={this.state.profile.vat}
                            onChange={(vat) => this.setState({
                                profile: Object.assign({}, this.state.profile, { vat })
                            })}/>
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

export default Company;
