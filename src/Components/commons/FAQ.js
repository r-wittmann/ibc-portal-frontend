import React, { Component } from 'react';
import Header from "../student_account/Header";

class FAQ extends Component {
    render() {
        return (
	        <div>
				<Header history={this.props.history}/>
	            <div className={'container'}>
		            <div className={'headline'}>
	                    <h1>FAQs</h1>
	                </div>
	            </div>
	         </div>
        );
    }
}

export default FAQ;
