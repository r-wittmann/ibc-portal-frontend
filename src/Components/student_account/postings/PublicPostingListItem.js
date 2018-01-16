import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import translate from "../../../translationService";

class PublicPostingListItem extends Component {

    

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/postings/${this.props.posting.id}`}>{this.props.posting.title}</Link>
                </td>
                {/* no expiry date yet */}
                {/*<td>{this.props.posting.expiry_date}</td>*/}
                <td>{translate.contractType(this.props.posting.contract_type)}</td>
                <td>{translate.entryLevel(this.props.posting.entry_level)}</td>
                <td><Link to={'/companies/' + this.props.posting.company_id}>{this.props.posting.company_name}</Link></td>
                <td> </td>
            </tr>
        );
    }
}

export default PublicPostingListItem;
