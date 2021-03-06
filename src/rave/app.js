var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, RouteHandler, Link, Navigation } = Router;

var GroupStore = require('./GroupStore');

var Modal = require('../../modal/index');
Modal.setAppElement(document.getElementById('content'));
Modal.injectCSS();

var App = React.createClass({

    render () {
        return (
            <div className="row page-main">
                <RouteHandler/>
            </div>
        );
    }
});

var Header = React.createClass({
    mixins: [Navigation],

    render () {
        return (
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="left">
                        <a className="btn btn-default navbar-btn" onClick={this.goBack}><i className="fa fa-angle-left"></i> Back</a>
                    </div>
                    <div className="center navbar-brand">{this.props.title}</div>
                    <div className="right">
                        <a className="btn btn-default navbar-btn" onClick={this.props.addFunc}><i className="fa fa-plus"></i></a>
                    </div>
                </nav>
        );
    }
});

var Start = React.createClass({
    mixins: [ Router.State ],

    getInitialState: function () {
        return {fullname: 'Fred Flintstone'};
    },

    render () {
        return (
            <div className="row page-main">
                <img src="../shared/images/BlameRave%20Logo.svg" />
                <h4>Welcome {this.state.fullname}</h4>
                <p>
                    <Link to="groups" className="btn btn-default btn-lg btn-block">Manage</Link>
                    <small>(Teachers, babysitters, coaches, doggy day care, ...)</small>
                </p>
                <p>
                    <a className="btn btn-default btn-lg btn-block">Monitor</a>
                    <small>(Parents of kids and the furry types of kids)</small>
                </p>
            </div>
        );
    }
});

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

var Manage = React.createClass({
    mixins: [ Router.State ],

    getInitialState: function () {
        return {
            groups: GroupStore.getGroups(),
            loading: true
        };
    },

    componentWillMount: function () {
        GroupStore.addChangeListener(this.updateGroups);
    },

    componentDidMount: function () {
        GroupStore.init();
    },

    componentWillUnmount: function () {
        GroupStore.removeChangeListener(this.updateGroups);
    },

    updateGroups: function () {
        if (!this.isMounted())
            return;

        this.setState({
            groups: GroupStore.getGroups(),
            loading: false
        });
    },

    getGroupById: function(id) {
        return GroupStore.getGroupById(id);
    },

    DEFAULT_TITLE: 'My Groups',

    addGroup: function(groupName) {
        GroupStore.addGroup(groupName);
    },

    openModal: function() {
        this.refs['dialog'].openModal();
    },

    render () {
        var groupId = this.getParams()['id'];
        var title = groupId ? this.getGroupById(groupId) : this.DEFAULT_TITLE;
        var addFunc = groupId ? '' : this.openModal;

        return (
            <div className="page-groups">

                <AddGroup addGroup={this.addGroup} ref="dialog"/>
                <Header title={title} addFunc={addFunc}/>

                <div className="row">
                    <div className="col-xs-12">
                        <RouteHandler groups={this.state.groups}/>
                    </div>
                </div>
            </div>
        );
    }
});

var ManageGroups = React.createClass({
    mixins: [ Router.State ],

    render () {
        var links = this.props.groups.map(function (group) {
            return (
                <Link to="members" params={{id: group.id}} className="list-group-item" key={group.id}>
                    <span className="pull-right"><i className="fa fa-angle-right"></i></span>
                    {group.name}
                </Link>
            );
        });

        return (
            <div className="list-group">
                {links}
            </div>
        );
    }
});

var ManageMembers = React.createClass({
    mixins: [ Router.State ],

    getInitialState: function () {
        return { members: GroupStore.getMembersForGroup()};
    },

    render () {
        var links = this.state.members.map(function (member) {
            return (
                <Link to="/" className="list-group-item" key={member.name}>
                    <span className="pull-right"><i className="fa fa-angle-right"></i></span>
                    {member.name}
                </Link>
            );
        });

        return (
            <div className="list-group">
                {links}
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Start}/>
        <Route name="manage" path="/manage" handler={Manage}>
            <Route name="groups" path="/manage" handler={ManageGroups}/>
            <Route name="members" path=":id" handler={ManageMembers}/>
        </Route>
    </Route>
);

Router.run(routes, function (Handler, state) {
    console.log('Rendering', state);
    React.render(<Handler/>, document.getElementById('content'));
});
