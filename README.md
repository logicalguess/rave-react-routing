Rave React Routing
==================

React implementation of the Blame Rave app showcased at the local ng-meetup: https://github.com/Transcordia/ng-meetup .
[react-router](https://github.com/rackt/react-router) is used instead of the Angular ui-router.

To run:

1. Clone this repo
2. Run `npm install`
3. Start the development server with `npm run server`
4. Point your browser to http://localhost:8080 or http://localhost:8080/webpack-dev-server/

Important Points
----------------
* The React router works at the component level
* Component can pass configuration to their children in props (similar to Angular directives attributes)
* Components can hold references to their children to extract data when needed

