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
        notificationTime: Notification
    }

    input InputEventTimeRange {
        start: Date
        end: Date
    }

    enum Notification {
        MIN
        MID
        MAX
    }
`;

module.exports = {eventInput, eventType};