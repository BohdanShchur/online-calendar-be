const mongoose = require ("mongoose");

const eventSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    eventTimeRange: {
        start: Date,
        end: Date,
    },
    notificationTime: Number,
});

module.exports = mongoose.model("Events", eventSchema);