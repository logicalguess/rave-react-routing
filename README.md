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

