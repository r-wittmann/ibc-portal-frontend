import React, { Component } from 'react';

class RecruiterPreview extends Component {

    render() {
        return (
            <div>
                <div className={'headline'}>
                    <h1>Vorschau</h1>
                </div>
                {this.props.recruiter && (
                    <div>
                        <div className={'attributes'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td className={'logo-table'}>
                                        <div className={'recruiter-logo'}>{this.props.recruiter.photo &&
                                        <img src={this.props.recruiter.photo} alt={'recruiter'}/>}</div>
                                    </td>
                                    <td>
                                        <p><b>{this.props.recruiter.recruiter_name}</b></p>
                                        <p>{this.props.recruiter.position}, {this.props.recruiter.location}</p>
                                        <p>Festnetz: {this.props.recruiter.phone}</p>
                                        <p>Mobil: {this.props.recruiter.mobile}</p>
                                        <p>Xing: {this.props.recruiter.xing}</p>
                                        <p>LinkedIn: {this.props.recruiter.linked_in}</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}
                <div className='float-right'>
                    <button type={'button'} className={'btn btn-warning buttons-form'}
                            onClick={this.props.endPreview}>
                        Zurück
                    </button>
                    <button className={'btn btn-success buttons-form'}
                            onClick={this.props.primaryAction}>
                        {this.props.primaryActionText}
                    </button>
                </div>
            </div>
        );
    }
}

export default RecruiterPreview;
