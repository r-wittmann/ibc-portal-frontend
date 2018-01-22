import React, { Component } from 'react';
import backendService from '../../../backendService';
import draftToHtml from "draftjs-to-html";
import Header from "../Header";
import translate from "../../../translationService";

class PublicCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: undefined,
        };
    }

    componentDidMount() {
        backendService.getPublicCompanyById(this.props.match.params.id)
            .then(company => this.setState({ company }));
    }

    render() {
        return (
            <div>
            <Header history={this.props.history}/>
            <div className={'container'}>
                {this.state.company && (
                    <div>
                    <table className={'table table-borderless'}>
                                <tbody>
                                <tr>
                                    <td>
                                        <div className={'preview-headline'}><h2>{this.state.company.company_name.toUpperCase()}</h2>
                                        </div>
                                    </td>
                                    <td>
                                      <div className={'preview-logo'}>
                                        {this.state.company.logo &&
                                        <img src={this.state.company.logo} alt={'logo'}/>
                                        }</div>
                                    </td>
                                </tr>
                                </tbody>
                    </table>
                      
                        <div className={'attributes'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td><span className={'fa fa-info-circle'}/> <a
                                        href={this.state.company.website}> {this.state.company.website}</a></td>
                                    <td><span className={'fa fa-users'}/> {translate.numberOfEmployees(this.state.company.employees)} Mitarbeiter
                                    </td>
                                    <td><span className={'fa fa-map-marker'}/> <span
                                        dangerouslySetInnerHTML={{ __html: this.props.company.munich_address.split('\n').join('<br>') }}/>
                                    </td>
                                </tr>
                                <tr>
                                    { this.state.company.field_of_activity ?
                                        <td><span className={'fa fa-search'}/> {this.state.company.field_of_activity}</td> : <td></td>
                                    }
                                    { this.state.company.kununu ?
                                        <td><span className={'fa fa-star'}/> <a
                                        href={this.state.company.kununu}> Bewertungen auf kununu</a></td> : <td></td>
                                    }
                                    { this.state.company.locations ?
                                        <td><span className={'fa fa-globe'}/> {this.state.company.locations}</td> : <td></td>
                                    }
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.state.company.company_description)) }}/>
                    </div>
                )}
                <div className='float-right'>
                    <button className={'btn btn-primary'}
                            onClick={() => this.props.history.goBack()}>
                        Zurück
                    </button>
                </div>
            </div>
            </div>
        );
    }
}

export default PublicCompany;
