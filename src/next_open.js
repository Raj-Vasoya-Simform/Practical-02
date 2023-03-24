const data = require("../data");
const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

const nextOpen = (input_day) => {
    // find current day index
    const index = weekdays.findIndex((day) => day === input_day);

    // shop status is next possible day shop open
    let i;
    let shop_status;
    for (i = 1; i < 8; i++) {
        shop_status = data.find((obj) => obj.day === weekdays[index + i]);
        if (shop_status) {
            break;
        }
    }

    // set date accordingly
    const next_date = new Date(
        `${"01" + "/" + (1 + i) + "/2001"} ${shop_status.open}`
    );

    return next_date.getTime();
};

module.exports = nextOpen;
