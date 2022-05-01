const eventType = `
    type Event {
        _id: ID!
        userId: ID!
        title: String
        description: String
        eventDate: Date
        eventTimeRange: eventTimeRange
        notificationTime: Date
    }

    type eventTimeRange {
        start: Date
        end: Date
    }
`;

const eventInput = `
    input EventInput {
        title: String
        description: String
        eventTimeRange: inputEventTimeRange
        notificationTime: Date
    }

    input inputEventTimeRange {
        start: Date
        end: Date
    }
`;

module.exports = {eventInput, eventType};