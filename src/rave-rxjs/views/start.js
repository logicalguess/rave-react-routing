var React = require('react');
var Router = require('../../../modules/index');
var { Link } = Router;

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

module.exports = Start