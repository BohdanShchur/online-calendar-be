const Events = require('./events.model');
const {BAD_REQUEST, NOT_FOUND} = require('../../consts/statusCodes');

class EventService {
    async getEventsByUserId (userId) {
        const events = await Events.find({userId}).exec();
        return events;
    }
    async createEvent (event, userId) {
        const newEvent = await new Events({
            ...event,
            userId
        }).save();
        console.log(newEvent);
        return newEvent;
    }
    async deleteEvent (id) {
        const foundEvent = await Events.findById(id).lean().exec();

        if (!foundEvent) {
             throw new RuleError("Event does not exist", NOT_FOUND);
        }

        return Events.findByIdAndDelete(id);
    }
    async updateEvent (event, id) {
        const foundEvent = await Events.findById(id).lean().exec();

        if (!foundEvent) {
             throw new RuleError("Event does not exist", NOT_FOUND);
        }
        
        return Events.findByIdAndUpdate(id, event)
    }
}

module.exports = new EventService();