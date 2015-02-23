var React = require('react');
var Router = require('../../../modules/index');
var { Link } = Router;

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

module.exports = ManageGroups