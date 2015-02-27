var React = require('react');
var Router = require('../../../modules/index');
var { Link } = Router;

var ViewComponentMixin = require('../utils/viewComponentMixin');

var ManageMembers = React.createClass({
    mixins: [ Router.State, ViewComponentMixin ],

    render () {
        var links = this.state.getMembersForGroup(this.getParams()['id']).map(function (member) {
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

module.exports = ManageMembers