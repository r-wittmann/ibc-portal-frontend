import React, { Component } from 'react';

class InputLabel extends Component {

    render() {
        return (
            <div className='form-group row'>
                <label htmlFor={this.props.label} className='col-4 col-form-label'>
                    {this.props.label}
                </label>
                <div className='col-8'>
                    <input
                        id={this.props.label}
                        className={'form-control'}
                        type={this.props.type ? this.props.type : 'text'}
                        required={this.props.required}
                        value={this.props.value}
                        onChange={(event) => this.props.onChange(event.target.value)}
                        onBlur={this.props.onBlur ? (event) => this.props.onBlur(event.target.value) : null}
                    />
                </div>

            </div>
        );
    }
}

export default InputLabel;
