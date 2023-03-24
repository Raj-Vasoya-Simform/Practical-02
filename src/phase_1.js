const data = require("../data");

/**
 *
 * @param {string} input_time
 * @param {string} input_weekday
 * @returns string
 */
const findStatusPhase1 = (input_time, input_weekday) => {
    const shop_status = data.find((obj) => obj.day === input_weekday);

    // Scenario 1 : User come to shop when shop is close on that day
    if (!shop_status) {
        return "CLOSE";
    }

    date = "01/01/2001";

    const user_come_date = new Date(`${date} ${input_time}`);
    const shop_open_date = new Date(`${date} ${shop_status.open}`);
    const shop_close_date = new Date(`${date} ${shop_status.close}`);

    // this is the important
    const user_come = user_come_date.getTime();
    const shop_open_from = shop_open_date.getTime();
    const shop_open_till = shop_close_date.getTime();

    // Scenario 2 : User come to shop when shop is open

    if (user_come >= shop_open_from && user_come <= shop_open_till) {
        return "OPEN";
    }

    // Scenario 3 : User come to shop either before shop opening or after shop closing
    return "CLOSE";
};

module.exports = findStatusPhase1;
