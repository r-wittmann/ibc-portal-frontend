import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import translate from "../../../translationService";

class PublicPostingListItem extends Component {

    

    render() {
        return (

            <div className={"col-sm-4"}>
                <div className={"card"} style={{marginBottom: 15}}>
                { this.props.posting.logo ?
                    <img className={"card-img-top"} src={this.props.posting.logo} alt={"Card image cap"}/> : <img/>
                }
                    <div className={"card-body"}>
                        <h5 className={"card-title"}><Link to={`/postings/${this.props.posting.id}`}>{this.props.posting.title}</Link></h5>
                        <h6 className={"card-subtitle mb-2 text-muted"}> <span className={'fa fa-map-marker'}/> {this.props.posting.place_of_employment} &nbsp; <span className={'fa fa-calendar-alt'}/> {translate.startOfEmployment(this.props.posting.start_of_employment)} </h6>
                        <p className={"card-text"}> 
                            <a href={`/postings/${this.props.posting.id}`} className={"btn btn-primary"}>Mehr Details</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicPostingListItem;
