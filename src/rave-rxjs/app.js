var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, RouteHandler } = Router;

var Start = require('./views/start.js');
var Manage = require('./views/manage.js');
var ManageGroups = require('./views/manageGroups.js');
var ManageMembers = require('./views/manageMembers.js');

var App = React.createClass({

    render () {
        return (
            <div className="row page-main">
                <RouteHandler/>
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
