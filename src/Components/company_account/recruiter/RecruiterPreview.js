import React, { Component } from 'react';

class RecruiterPreview extends Component {

    render() {
        return (
            <div className={'container'}>
                {this.props.recruiter && (
                    <div>
                        <p>Recruiter Name: {this.props.recruiter.recruiter_name}</p>
                        <p>Recruiter Email: {this.props.recruiter.recruiter_email}</p>
                        <p>Recruiter Phone: {this.props.recruiter.phone}</p>
                        <p>Recruiter Mobile: {this.props.recruiter.mobile}</p>
                        <p>Recruiter Position: {this.props.recruiter.position}</p>
                        <p>Recruiter Location: {this.props.recruiter.location}</p>
                        <p>Recruiter Xing: {this.props.recruiter.xing}</p>
                        <p>Recruiter LinkedIn: {this.props.recruiter.linked_in}</p>
                        {this.props.recruiter.photo && <p><img src={this.props.recruiter.photo} alt={'recruiter'}/></p>}
                    </div>
                )}
                <div className='float-right'>
                    <button className={'btn btn-danger buttons-form'}
                            onClick={this.props.endPreview}>
                        Zurück
                    </button>
                </div>
            </div>
        );
    }
}

export default RecruiterPreview;
