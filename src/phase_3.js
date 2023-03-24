const data = require("../data");
const nextOpen = require("./next_open");

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

/**
 *
 * @param {string} input_time
 * @param {string} input_weekday
 * @returns string
 */

const findStatusPhase3 = (input_time, input_weekday) => {
    const shop_status = data.find((obj) => obj.day === input_weekday);

    const date = "01/01/2001";

    const user_come_date = new Date(`${date} ${input_time}`);
    const user_come = user_come_date.getTime();

    // Scenario 1 : User come to shop when shop is close on that day
    if (!shop_status) {
        const next_open = nextOpen(input_weekday);

        let hours = (next_open - user_come) / (60 * 60 * 1000);

        let days = parseInt(hours / 24);
        let remain_hours = hours - days * 24;
        return `Closed. The shop will be open after${
            days === 0 ? "" : " " + days + (days === 1 ? " day" : " days")
        } ${remain_hours} Hrs`;
    }

    const shop_open_date = new Date(`${date} ${shop_status.open}`);
    const shop_close_date = new Date(`${date} ${shop_status.close}`);

    const shop_open_from = shop_open_date.getTime();
    const shop_open_till = shop_close_date.getTime();

    // Scenario 2 : User come to shop when shop open and will be closed within few hours

    if (user_come >= shop_open_from && user_come <= shop_open_till) {
        let hours = (shop_open_till - user_come) / (60 * 60 * 1000);
        let days = parseInt(hours / 24);
        let remain_hours = hours - days * 24;
        return `OPEN. The shop will be closed within${
            days === 0 ? "" : " " + days + (days === 1 ? " day" : " days")
        } ${remain_hours} Hrs`;
    }

    // Scenario 3 : User come to shop before shop open
    if (user_come < shop_open_from) {
        let hours = (shop_open_from - user_come) / (60 * 60 * 1000);
        let days = parseInt(hours / 24);
        let remain_hours = hours - days * 24;
        return `Closed. The shop will be open after${
            days === 0 ? "" : " " + days + (days === 1 ? " day" : " days")
        } ${remain_hours} Hrs`;
    }

    // Scenario 4 : User come to shop after shop closed

    const next_open = nextOpen(input_weekday);
    let hours = (next_open - user_come) / (60 * 60 * 1000);

    let days = parseInt(hours / 24);
    let remain_hours = hours - days * 24;
    return `Closed. The shop will be open after${
        days === 0 ? "" : " " + days + (days === 1 ? " day" : " days")
    } ${remain_hours} Hrs`;
};

module.exports = findStatusPhase3;
