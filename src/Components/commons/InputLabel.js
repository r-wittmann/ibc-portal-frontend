import React, { Component } from 'react';

class InputLabel extends Component {
    // creates a label and input with specified props
    // can be used in every context
    render() {
        return (
            <div className='form-group row'>
                <label htmlFor={this.props.label} className='col-4 col-form-label'>
                    {this.props.label}
                </label>
                <div className={'col-8'}>
                    <input
                        id={this.props.label}
                        className={'form-control'}
                        type={this.props.type ? this.props.type : 'text'}
                        required={this.props.required}
                        value={this.props.value}
                        onChange={(event) => this.props.onChange(event.target.value)}
                        onBlur={this.props.onBlur ? (event) => this.props.onBlur(event) : null}
                    />
                    {this.props.errorMessage &&
                    <div className={'invalid-feedback'}>{this.props.errorMessage}</div>
                    }
                </div>


            </div>
        );
    }
}

export default InputLabel;
