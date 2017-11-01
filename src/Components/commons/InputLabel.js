import React, { Component } from 'react';

class InputLabel extends Component {

    render() {
        return (
            <div className='form-group row'>
                <label htmlFor={this.props.label} className='col-3 col-form-label'>
                    {this.props.label}
                </label>
                <div className='col-9'>
                    <input
                        id={this.props.label}
                        className={'form-control'}
                        type={this.props.type ? this.props.type : 'text'}
                        value={this.props.value}
                        onChange={(event) => this.props.onChange(event.target.value)}/>
                </div>

            </div>
        );
    }
}

export default InputLabel;
