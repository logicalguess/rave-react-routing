var LogicalComponent = require('../utils/logicalComponent');


var _groups = [];
var _changeListeners = [];
var _initCalled = false;

var GroupStore = {
    init: function () {
        if (_initCalled) {
            return;
        }
        _initCalled = true;
        _groups = [
            {id: '34D', name: 'AM Classroom'},
            {id: 'A5C', name: 'PM Classroom'},
            {id: 'K3P', name: 'After School Care'}
        ];
        GroupComponent.notifyChange();
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener();
        });
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener);
    },

    removeChangeListener: function (listener) {
        _changeListeners = _changeListeners.filter(function (l) {
            return listener !== l;
        });
    },

    getGroups: function () {
        return _groups.slice();
    },

    getGroupById: function (id) {
        for (var i = 0, c = _groups.length; i < c; i++) {
            if (_groups[i].id === id) return _groups[i].name;
        }
        return 'Unknown';
    },

    addGroup: function(groupName, cb) {
        var group = {
            id : Math.random().toString( 36 ).substring( 3 ),
            name : groupName
        };
        _groups = _groups.concat(group);
        GroupStore.notifyChange();
        if (cb) cb(group);

    },

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
};

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