const eventType = `
    type Event {
        _id: ID!
        userId: ID!
        title: String
        description: String
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
        eventTimeRange: InputEventTimeRange
        notificationTime: Int
    }

    input InputEventTimeRange {
        start: Date
        end: Date
    }

    input EventFilterInput {
        start: Date
        end: Date
    }
`;

module.exports = {eventInput, eventType};