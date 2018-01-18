import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import translate from '../../../translationService';

class CompanyPreview extends Component {

    render() {
        return (
            <div>
                <div className={'headline'}>
                    <h1>Vorschau</h1>
                </div>
                {this.props.company && (
                    <div>
                    <table className={'table table-borderless'}>
                                <tbody>
                                <tr>
                                    <td>
                        <div className={'preview-headline'}><h2>{this.props.company.company_name.toUpperCase()}</h2></div>
                        </td>
                        <td>
                        <div className={'preview-logo'}>{this.props.company.logo && <img src={this.props.company.logo} alt={'logo'}/>}</div>
                        </td>
                        </tr>
                                </tbody>
                    </table>


                        <div className={'attributes'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td><span className={'fa fa-info-circle'}/> <a href={this.props.company.website}> {this.props.company.website}</a></td>
                                    <td><span className={'fa fa-users'}/> {translate.numberOfEmployees(this.props.company.employees)} Mitarbeiter</td>
                                    <td><span className={'fa fa-map-marker'}/> <span dangerouslySetInnerHTML={{ __html: this.props.company.munich_address.replace('\n', '<br>') }}/></td>
                                </tr>
                                <tr>
                                { this.props.company.field_of_activity ?
                                    <td><span className={'fa fa-search'}/>  {this.props.company.field_of_activity}</td> : <td></td>
                                }
                                { this.props.company.kununu ?
                                    <td><span className={'fa fa-star'}/> <a href={this.props.company.kununu}> Bewertungen auf kununu</a></td> : <td></td>
                                }
                                { this.props.company.locations ?
                                    <td><span className={'fa fa-globe'}/> {this.props.company.locations}</td> : <td></td>
                                }
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <p dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.company.company_description)) }}/>
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

export default CompanyPreview;
