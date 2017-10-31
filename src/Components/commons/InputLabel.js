import React, { Component } from 'react';

class InputLabel extends Component {

    render() {
        return (
            <div>
                <label>
                    {this.props.label}:
                    <input
                        type={'text'}
                        value={this.props.value}
                        onChange={(event) => this.props.onChange(event.target.value)}/>
                </label>
            </div>
        );
    }
}

export default InputLabel;
