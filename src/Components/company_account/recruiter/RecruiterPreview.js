import React, { Component } from 'react';

class RecruiterPreview extends Component {

    render() {
        return (
            <div>
                {this.props.recruiter && (
                    <div className={'row'}>
                        <div className={'col-4 col-sm-4 col-md-3 offset-4 offset-sm-0 mb-3'}>
                            {this.props.recruiter.photo &&
                            <img src={this.props.recruiter.photo} className={'rounded-circle img-fluid'}
                                 alt={'recruiter'}/>
                            }
                        </div>
                        <div className={'col-8 col-sm-8 col-md-9 offset-2 offset-sm-0'}>
                            <p><b>{this.props.recruiter.recruiter_name}</b></p>
                            {this.props.recruiter.position}{this.props.recruiter.location && ', ' + this.props.recruiter.location}<br/>

                            {this.props.recruiter.recruiter_email &&
                            <span>{this.props.recruiter.recruiter_email}<br/></span>}
                            {this.props.recruiter.phone && <span>Tel: {this.props.recruiter.phone}<br/></span>}
                            {this.props.recruiter.mobile &&
                            <span>Mobil: {this.props.recruiter.mobile}<br/></span>}
                            {this.props.recruiter.xing &&
                            <a href={this.props.recruiter.xing} target={'_blank'}>
                                            <span className={'fab fa-xing-square mx-2'}
                                                  style={{ fontSize: '150%', color: '#007575' }}/>
                            </a>
                            }
                            {this.props.recruiter.linked_in &&
                            <a href={this.props.recruiter.linked_in} target={'_blank'}>
                                            <span className={'fab fa-linkedin mx-2'}
                                                  style={{ fontSize: '150%', color: '#0084bf' }}/>
                            </a>
                            }
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
