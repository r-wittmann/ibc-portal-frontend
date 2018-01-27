import React, { Component } from 'react';

class ConfirmModal extends Component {

    render() {
        return (
            <div className='modal fade'
                 id={this.props.id}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            {this.props.message}
                        </div>
                        <div className='modal-footer'>
                            {this.props.negativeAction &&
                            <button type='button'
                                    onClick={this.props.negativeAction}
                                    className='btn btn-secondary'
                                    data-dismiss='modal'>{this.props.negativeText}
                            </button>
                            }
                            {this.props.positiveAction &&
                            <button type='button'
                                    onClick={this.props.positiveAction}
                                    className='btn btn-primary'
                                    data-dismiss='modal'>{this.props.positiveText}
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmModal;
