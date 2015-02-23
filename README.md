Rave React Routing
==================

React implementation of the Blame Rave app showcased at the local ng-meetup: https://github.com/Transcordia/ng-meetup .
The React router [react-router](https://github.com/rackt/react-router) is used instead of the Angular ui-router.

There are 2 versions of the code, one using stores (like Flux does), and one using RxJs for pushing data to the React
components when needed.

To run:

1. Clone this repo
2. Run `npm install`
3. Start the development server with `npm run server`
4. Point your browser to http://localhost:8080 or http://localhost:8080/webpack-dev-server/

Important Points
----------------
* The React router works at the (view) component level
* Components can pass configuration to their children in props (similar to Angular directives attributes)
* Components can hold references to their children to call methods on them when needed
* (View) Components handle only view state, and they notify and get notified by data stores/components when data changes

The routes are defined as follows:

    var routes = (
        <Route name="app" path="/" handler={App}>
            <DefaultRoute handler={Start}/>
            <Route name="manage" path="/manage" handler={Manage}>
                <Route name="groups" path="/manage" handler={ManageGroups}/>
                <Route name="members" path=":id" handler={ManageMembers}/>
            </Route>
        </Route>
    );

Sample Code
-------------

`components/GroupComponent.js` (logical reactive component that maintains state and publishes it as an RxObservable that is
subscribed to by configured view components):

    var LogicalComponent = require('../utils/logicalComponent');

    var GroupComponent = {
        initialState: {
            groups: [
                {id: '34D', name: 'AM Classroom'},
                {id: 'A5C', name: 'PM Classroom'},
                {id: 'K3P', name: 'After School Care'}
            ],

            getMembersForGroup: function(id) {
                return [
                    {id : '101', name : 'Amy Adams'},
                    {id : '102', name : 'Bill Bixby'},
                    {id : '103', name : 'Chevy Chase'},
                    {id : '103', name : 'Danny Devito'},
                    {id : '103', name : 'Emilio Estevez'},
                    {id : '103', name : 'Farah Fawcett'},
                    {id : '103', name : 'Gordon Gecko'},
                    {id : '103', name : 'Helen Hunt'}
                ]
            }
        },
        eventProcessor: function (state, event) {
            if (event.eventName == 'addGroup') {
                var group = {
                    id : Math.random().toString( 36 ).substring( 3 ),
                    name : event.eventData
                };
                state.groups = state.groups.concat(group);

            }
            return state;
        },
        publishedStateMapper: function (state) {
            return state;
        }
    }

    module.exports = LogicalComponent('GroupComponent', GroupComponent)

`views/manage.js` (React component):

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

`config.js`:

var GroupComponent = require('./components/GroupComponent');

    settings = {
        logicalComponents: {
            'Manage': GroupComponent,
            'ManageMembers': GroupComponent
        }
    }

    module.exports = settings

