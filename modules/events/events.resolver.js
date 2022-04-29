const EventService = require('./events.service');

const eventsQuery = {
    getEventsByUserId: async (_, {userId}) => {
        try{
            return EventService.getEventsByUserId(userId);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
};

const eventsMutations = {
    createEvent: async (_, {event, userId}) => {
        try{
            return EventService.createEvent(event, userId);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    },
    deleteEvent: async (_, {id}) => {
        try{
            return EventService.deleteEvent(id);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    },
    updateEvent: async(_, {event, id}) => {
        try{
            return EventService.updateEvent(event, id);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
};

module.exports = {eventsQuery, eventsMutations};