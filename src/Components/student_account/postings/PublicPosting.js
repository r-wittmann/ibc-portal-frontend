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
        };
    }

    componentDidMount() {
        backendService.getPublicPostingById(this.props.match.params.id)
            .then(posting => this.setState({ posting }));
    }

    render() {

            console.log(this.state.posting);
        return (
            <div>
            <Header history={this.props.history}/>
            <div className={'container'}>
                {this.state.posting &&
                <div>
                <div className={'table-responsive'}>
                <table className={'table table-borderless'}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className={'preview-headline'}><h2>{this.state.posting.title.toUpperCase()}</h2></div>
                                        </td>
                                        <td>
                                            <div className={'preview-logo'}>{this.state.posting.logo &&
                                            <img src={this.state.posting.logo} alt={'logo'}/>}</div>
                                        </td>
                                    </tr>
                                </tbody>
                    </table>
                    </div>
                    <div className={'table-responsive'}>
                        <table className={'table table-borderless preview-table'}>
                            <tbody>
                            <tr>
                                <td><span className={'fa fa-home'}/>
                                    <Link to={'/companies/' + this.state.posting.company_id}>
                                        &nbsp;{this.state.posting.company_name}
                                    </Link>
                                </td>
                                <td><span className={'fa fa-map-marker'}/> <span
                                    dangerouslySetInnerHTML={{ __html: this.state.posting.munich_address.replace('\n', '<br>') }}/>
                                </td>
                                <td><span className={'fa fa-calendar'}/> {this.state.posting.start_of_employment}</td>
                                <td><span className={'fa fa-desktop'}/> {this.state.posting.field_of_activity}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    <p><span
                        dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.state.posting.description)) }}/>
                    </p>
                    <div className={'table-responsive'}>
                        <table className={'table table-borderless preview-table'}>
                            <tbody>
                            <tr>
                                <td className={'logo-table'}>
                                    <div className={'recruiter-logo'}>{this.state.posting.photo &&
                                    <img src={this.state.posting.photo} alt={'recruiter'}/>}</div>
                                </td>
                                <td>
                                        <p><b>{this.state.posting.recruiter_name}</b></p>
                                        { this.state.posting.location ?
                                            <p>{this.state.posting.position}, {this.state.posting.location}</p> : <p>{this.state.posting.position}</p>
                                        }
                                        { this.state.posting.recruiter_email ?
                                            <p>E-Mail: {this.state.posting.recruiter_email}</p> : <p></p>
                                        }
                                        { this.state.posting.phone ?
                                            <p>Festnetz: {this.state.posting.phone}</p> : <p></p>
                                        }
                                        { this.state.posting.mobile ?
                                            <p>Mobil: {this.state.posting.mobile}</p> : <p></p>
                                        }
                                        { this.state.posting.xing ? 
                                            <p>Xing: {this.state.posting.xing}</p> : <p></p>
                                        }
                                        { this.state.posting.linked_in ? 
                                            <p>LinkedIn: {this.state.posting.linked_in}</p> : <p></p>
                                        }
                                    </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className={'table-responsive'}>
                        <table className={'table table-borderless preview-table-posting'}>
                            <tbody>
                            <tr>
                                <td><span
                                    className={'fa fa-arrow-right'}/> {translate.contractDuration(this.state.posting.contract_duration)}
                                </td>
                                <td><span className={'fa fa-clock'}/> {this.state.posting.working_hours}</td>
                                <td><span className={'fa fa-edit'}/> {translate.contractType(this.state.posting.contract_type)}</td>
                                <td><span className={'fa fa-user'}/> {translate.entryLevel(this.state.posting.entry_level)}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                
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
                }
            
            </div>
            </div>
        );
    }
}

export default PublicPosting;
