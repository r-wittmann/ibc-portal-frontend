import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';

class CompanyPreview extends Component {

    render() {
        return (
            <div className={'container'}>
                <div className={'headline'}>
                    <h1>Vorschau</h1>
                </div>
                {this.props.company && (
                    <div>
                        <h2>{this.props.company.company_name.toUpperCase()}</h2>
                        <div className={'attributes'}>
                            <table className={'table table-bordered'}>
                                <tbody>
                                <tr>
                                    <td><span className={'fa fa-info-circle'}/> <a href={this.props.company.website}> {this.props.company.website}</a></td>
                                    <td><span className={'fa fa-users'}/> {this.props.company.employees} Mitarbeiter</td>
                                    <td><span className={'fa fa-map-marker'}/> <span dangerouslySetInnerHTML={{ __html: this.props.company.munich_address.replace('\n', '<br>') }}/></td>
                                    <td><span className={'fa fa-search'}/>  {this.props.company.field_of_activity}</td>
                                </tr>
                                <tr>
                                    <td><span className={'fa fa-star'}/> <a href={this.props.company.kununu}> Bewertungen auf kununu</a></td>
                                    <td><span className={'fa fa-globe'}/> {this.props.company.locations}</td>
                                    <td><p><span className={'fa fa-user'}/> {this.props.company.contact_name}</p></td>
                                    <td><p><span className={'fa fa-envelope'}/> {this.props.company.contact_email}</p>
                                        <p><span className={'fa fa-phone'}/> {this.props.company.contact_phone}</p></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        {this.props.company.logo && <p><img src={this.props.company.logo} alt={'logo'}/></p>}
                        <p dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.company.company_description)) }}/>
                    </div>
                )}
                <div className='float-right'>
                    <button className={'btn btn-warning buttons-form'}
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
