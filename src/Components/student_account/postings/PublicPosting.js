import React, { Component } from 'react';
import backendService from '../../../backendService';
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";
import Header from "../Header";
import translate from "../../../translationService";

class PublicPosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posting: undefined,
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        backendService.getPublicPostingById(this.props.match.params.id)
            .then(posting => this.setState({ posting, loading: false }));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className={'student-background'}>
                    <div className={'container'}>
                        {this.state.loading
                            ? <div className={'loader'}/>
                            :
                            <div className={'row'}>

                            <div className={"col-sm-8"}>

                                <div className={'preview-headline'}>
                                    <h2>{this.state.posting.title.toUpperCase()}</h2>
                                </div>

                                {this.state.posting.pdf
                                    ? <div style={{ width: '100%', textAlign: 'center' }}>
                                        <embed style={{ width: '100%', maxWidth: 820, height: 1024 }}
                                               src={this.state.posting.description} type={'application/pdf'}/>
                                    </div>
                                    : <p><span
                                        dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.state.posting.description)) }}/>
                                    </p>
                                }


                                    <div className='float-right'>
                                        <button className={'btn btn-primary buttons-form'}
                                                onClick={() => this.props.history.goBack()}>
                                            Zurück
                                        </button>
                                        <a className={'btn btn-primary buttons-form'}
                                           href={this.state.posting.application_link} target={'_blank'}>
                                            Bewerben
                                        </a>
                                    </div>

                            </div>


                            <div className={"col-sm-4"}>

                                <div className={'preview-logo'}>{this.state.posting.logo &&
                                    <a className={'navbar-brand'} onClick={() => this.props.history.push('/companies/' + this.state.posting.company_id)}>
                                        <img src={this.state.posting.logo} alt={'logo'}/>
                                    </a>}
                                </div>

                                <a className={'btn btn-primary'} style={{marginBottom:20}}
                                       href={this.state.posting.application_link} target={'_blank'}>
                                        Bewerben
                                </a>
                                <br/>
                                <span className={'fa fa-home'}/>&nbsp;&nbsp;<Link to={'/companies/' + this.state.posting.company_id}>&nbsp;{this.state.posting.company_name}</Link><br/>
                                <span className={'fa fa-map-marker'}/>&nbsp;&nbsp;<span dangerouslySetInnerHTML={{ __html: this.state.posting.munich_address.replace('\n', '<br>') }}/><br/>
                                <span className={'fa fa-calendar'}/>&nbsp;&nbsp;{translate.startOfEmployment(this.state.posting.start_of_employment)}<br/>
                                <span className={'fa fa-desktop'}/>&nbsp;&nbsp;{translate.fieldOfEmployment(this.state.posting.field_of_employment)}<br/> 
                                <span className={'fa fa-arrow-right'}/>&nbsp;&nbsp;{translate.contractDuration(this.state.posting.contract_duration)}<br/>
                                <span className={'fa fa-clock'}/>&nbsp;&nbsp;{this.state.posting.working_hours}<br/>
                                <span className={'fa fa-edit'}/>&nbsp;&nbsp;{translate.contractType(this.state.posting.contract_type)}<br/>
                                <span className={'fa fa-user'}/>&nbsp;&nbsp;{translate.entryLevel(this.state.posting.entry_level)}<br/><br/>
                            
                                <div className={'recruiter-logo'}>{this.state.posting.photo &&
                                    <img src={this.state.posting.photo} alt={'recruiter'}/>}</div>
                                    <p><b>{this.state.posting.recruiter_name}</b></p>
                                    <div className={'recruiter-info'}>

                                        {this.state.posting.location ?
                                            <p>{this.state.posting.position}, {this.state.posting.location}</p> :
                                            <p>{this.state.posting.position}</p>
                                        }
                                        {this.state.posting.recruiter_email ?
                                            <p>E-Mail: {this.state.posting.recruiter_email}</p> : <p></p>
                                        }
                                        {this.state.posting.phone ?
                                            <p>Festnetz: {this.state.posting.phone}</p> : <p></p>
                                        }
                                        {this.state.posting.mobile ?
                                            <p>Mobil: {this.state.posting.mobile}</p> : <p></p>
                                        }
                                        {this.state.posting.xing ?
                                            <p>Xing: {this.state.posting.xing}</p> : <p></p>
                                        }
                                        {this.state.posting.linked_in ?
                                            <p>LinkedIn: {this.state.posting.linked_in}</p> : <p></p>
                                        }
                                    </div>
                                 
                            </div>

                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default PublicPosting;
