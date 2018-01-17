import React, { Component } from 'react';

class AnalyticsListItem extends Component {
    render() {
        return (
            <tr key={this.props.account.id}>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.companyCount}</td>
                <td>{this.props.account.recruiterCount}</td>
                <td>{this.props.account.postingCount}</td>
                <td>{this.props.account.activePostingCount || 0}</td>
            </tr>
        );
    }
}

export default AnalyticsListItem;
