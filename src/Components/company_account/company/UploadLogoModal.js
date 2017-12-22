import React, { Component } from 'react';

class UploadLogoModal extends Component {

    handleFileChange = (event) => {
        let file = event.target.files[0];
        if (file.size / 1048576 <= 2) {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.props.returnFile(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // TODO: display error for to big a file
        }
    };

    render() {
        return (
            <div className="modal fade"
                 id="uploadLogo">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Logo ändern/hochladen</h5>
                        </div>
                        <div className="modal-body">
                            <input
                                type={'file'}
                                accept={'image/*'}
                                onChange={this.handleFileChange}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    onClick={this.handleClose}
                                    className="btn btn-secondary"
                                    data-dismiss="modal">Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadLogoModal;
