import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';

class CompanyPreview extends Component {

    render() {
        return (
            <div className={'container'}>
                {this.props.company && (
                    <div>
                        <p>Company Name: {this.props.company.company_name}</p>
                        <p>Contact Name: {this.props.company.contact_name}</p>
                        <p>Contact Email: {this.props.company.contact_email}</p>
                        <p>Contact Phone: {this.props.company.contact_phone}</p>
                        <p>Munich Address:
                            <span
                                dangerouslySetInnerHTML={{ __html: this.props.company.munich_address.replace('\n', '<br>') }}/>
                        </p>
                        <p>Locations: {this.props.company.locations}</p>
                        <p>Employees: {this.props.company.employees}</p>
                        <p>Website: {this.props.company.website}</p>
                        <p>kununu: {this.props.company.kununu}</p>
                        <p>Field of Activity: {this.props.company.field_of_activity}</p>
                        {this.props.company.logo && <p><img src={this.props.company.logo} alt={'logo'}/></p>}
                        <p dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.company.company_description)) }}/>
                    </div>
                )}
                <div className='float-right'>
                    <button className={'btn btn-danger buttons-form'}
                            onClick={this.props.endPreview}>
                        Zurück
                    </button>
                    <button className={'btn btn-primary buttons-form'}
                            onClick={this.props.primaryAction}>
                        {this.props.primaryActionText}
                    </button>
                </div>
            </div>
        );
    }
}

export default CompanyPreview;
