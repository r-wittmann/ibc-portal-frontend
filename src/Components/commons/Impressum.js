import React, { Component } from 'react';
import Header from "../student_account/Header";

class Impressum extends Component {
    render() {
        return (
            <div>
                <Header history={this.props.history}/>
	            <div className={'container'}>
		            <div className={'headline'}>
	                    <h1>Impressum</h1>
	                </div>
	            </div>
            </div>
        );
    }
}

export default Impressum;
