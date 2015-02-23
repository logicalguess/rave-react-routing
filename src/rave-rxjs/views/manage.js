var React = require('react');
var Router = require('../../../modules/index');
var { RouteHandler } = Router;

var ViewComponentMixin = require('../utils/viewComponentMixin');


var Header = require('./header.js');
var AddGroup = require('./addGroup.js');

var Manage = React.createClass({
    mixins: [ Router.State, ViewComponentMixin ],

    getGroupById: function (id) {
        for (var i = 0, c = this.state.groups.length; i < c; i++) {
            if (this.state.groups[i].id === id) return this.state.groups[i].name;
        }
        return 'Unknown';
    },

    DEFAULT_TITLE: 'My Groups',

    addGroup: function(groupName) {
        this.publish({eventName: 'addGroup', eventData: groupName});
    },

    openModal: function() {
        this.refs['dialog'].openModal();
    },

    render() {
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

module.exports = Manage;