var React = require('react');
var Router = require('../../../modules/index');

var Header = React.createClass({
    mixins: [Router.Navigation],

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

module.exports = Header