const moment = require('moment');

const createNotificationTime = ({start},time) => {
    const notificationTime = moment(start);
    notificationTime.subtract(time, 'minutes');
    return notificationTime.toDate();
}

module.exports = {createNotificationTime};