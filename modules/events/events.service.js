const Events = require('./events.model');
const { BAD_REQUEST, NOT_FOUND } = require('../../consts/statusCodes');
const { validateEvent } = require('../../validators/event.validator');
const { createNotificationTime } = require('../../utils/dateHelper');
const { sendNotification } = require('../../utils/email');

class EventService {
    async getEventsByUserId(userId) {
        const events = await Events.find({ userId }).exec();
        return events;
    }
    async createEvent(event, userId, email) {
        const invalid = validateEvent(event);
        if (invalid) {
            throw invalid;
        }
        const { eventTimeRange, notificationTime: notification } = event;
        const notificationTime = createNotificationTime(eventTimeRange, notification);
        const newEvent = await new Events({
            ...event,
            notificationTime,
            userId
        }).save();
        sendNotification(notificationTime, email);
        return newEvent;
    }
    async deleteEvent(id) {
        const foundEvent = await Events.findById(id).lean().exec();

        if (!foundEvent) {
            throw new RuleError("Event does not exist", NOT_FOUND);
        }

        return Events.findByIdAndDelete(id);
    }
    async updateEvent(event, id) {
        const invalid = validateEvent(event);
        if (invalid) {
            throw invalid;
        }
        const foundEvent = await Events.findById(id).lean().exec();

        if (!foundEvent) {
            throw new RuleError("Event does not exist", NOT_FOUND);
        }

        const { eventTimeRange, notificationTime: notification } = event;
        const notificationTime = createNotificationTime(eventTimeRange, notification);
        const updatedEvent = await Events.findByIdAndUpdate(id, event);
        sendNotification(notificationTime, email);
        return updatedEvent;
    }
    async getEventById(id) {
        const foundEvent = await Events.findById(id).lean().exec();

        if (!foundEvent) {
            throw new RuleError("Event does not exist", NOT_FOUND);
        }

        return foundEvent;
    }
}

module.exports = new EventService();