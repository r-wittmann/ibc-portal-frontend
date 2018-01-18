import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import translate from "../../../translationService";

class PublicPostingListItem extends Component {

    

    render() {
        var date = this.props.posting.created_at;
        var date_split = date.split('-');
        var year = date_split[0];
        var month = date_split[1];
        var monthText;
        switch (month){
            case '01': monthText = "JAN"; break;
            case '02': monthText = "FEB"; break;
            case '03': monthText = "MÄR"; break;
            case '04': monthText = "APR"; break;
            case '05': monthText = "MAI"; break;
            case '06': monthText = "JUN"; break;
            case '07': monthText = "JUL"; break;
            case '08': monthText = "AUG"; break;
            case '09': monthText = "SEP"; break;
            case '10': monthText = "OKT"; break;
            case '11': monthText = "NOV"; break;
            case '12': monthText = "DEZ"; break;
            default: monthText = "JAN"; break;

        }
        var days = date_split[2].split('T');
        var day = days['0'];
        return (
            <tr>
                <td>{monthText}<div style={{fontSize:30}}>{day}</div>{year}</td>
                 <td>
                { this.props.posting.logo ?
                   <div className={'posting-logo'}><img src={this.props.posting.logo} alt={'logo'}/></div> : <div></div>
                }
                </td>
                <td>
                    <Link to={`/postings/${this.props.posting.id}`}>{this.props.posting.title}</Link>
                </td>
                <td>{this.props.posting.place_of_employment}</td>
                <td>{this.props.posting.start_of_employment}</td>
                <td>{translate.contractType(this.props.posting.contract_type)}</td>
                <td>{translate.fieldOfEmployment(this.props.posting.field_of_employment)}</td>
                <td>{translate.entryLevel(this.props.posting.entry_level)}</td>
                <td><Link to={'/companies/' + this.props.posting.company_id}>{this.props.posting.company_name}</Link></td>
                <td> </td>
            </tr>
        );
    }
}

export default PublicPostingListItem;
