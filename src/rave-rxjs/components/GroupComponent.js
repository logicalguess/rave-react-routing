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