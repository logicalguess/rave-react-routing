var React = require('react');

var Modal = require('../../../modal/index');
Modal.setAppElement(document.getElementById('content'));
Modal.injectCSS();

var AddGroup = React.createClass({

    getInitialState: function () {
        return {modalIsOpen: false};
    },

    openModal: function() {
        this.setState({modalIsOpen: true});
    },

    save: function() {
        var groupName = this.refs.groupName.getDOMNode().value;
        //validate
        if (groupName) {
            this.props.addGroup(groupName);
        }

        this.setState({modalIsOpen: false});
    },

    cancel: function() {
        this.setState({modalIsOpen: false});
    },

    handleModalCloseRequest: function() {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpen: false});
    },


    handleChange: function(event) {
        //this.setState({groupName: event.target.value});
        //validation ?
    },

    render() {
        return(
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add New Group</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <input autofocus type="text" className="form-control" value={this.groupName} onChange={this.handleChange} ref="groupName" placeholder="Group name"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.cancel}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={this.save}>Save changes</button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = AddGroup