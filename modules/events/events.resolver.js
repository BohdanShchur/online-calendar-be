const EventService = require('./events.service');

const eventsQuery = {
    getEventsByUserId: async (_, {filter}, {userId} ) => {
        try{
            return EventService.getEventsByUserId(userId, filter);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
};

const eventsMutations = {
    createEvent: async (_, {event}, {userId, email}) => {
        try{
            return EventService.createEvent(event, userId, email);
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
    updateEvent: async(_, {event, id}, {email}) => {
        try{
            return EventService.updateEvent(event, id, email);
        } catch(e) {
            return {
                message: e.message,
                statusCode: e.statusCode
            }
        }
    }
};

module.exports = {eventsQuery, eventsMutations};