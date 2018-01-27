import React, { Component } from 'react';
import { toast } from 'react-toastify';

class UploadFileModal extends Component {

    handleFileChange = (event) => {
        let file = event.target.files[0];
        if (file.size / 1048576 <= 2) {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.props.returnFile(reader.result);

                let modal = document.getElementById('uploadFile');
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                let backdrop = document.getElementsByClassName('modal-backdrop')[0];
                backdrop.parentNode.removeChild(backdrop);
            };
            reader.readAsDataURL(file);
        } else {
            toast('Die Datei ist größer als 2 MB. Bitte wählen Sie eine kleinere Datei aus', { type: 'error' })
        }
    };

    render() {
        return (
            <div className='modal fade'
                 id='uploadFile'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{this.props.title}</h5>
                        </div>
                        <div className='modal-body'>
                            <input
                                type={'file'}
                                accept={this.props.accept}
                                onChange={this.handleFileChange}/>
                        </div>
                        <div className='modal-footer'>
                            <button type='button'
                                    onClick={this.handleClose}
                                    className='btn btn-secondary'
                                    data-dismiss='modal'>Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFileModal;
