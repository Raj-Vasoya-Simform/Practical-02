const inquirer = require("inquirer");
const validateTime = require("./src/validate_time");
const findStatusPhase1 = require('./src/phase_1')
const findStatusPhase2 = require("./src/phase_2");
const findStatusPhase3 = require("./src/phase_3");


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
let input_weekday, input_time, phase;

(async function () {
    try {
        let answers = await inquirer.prompt([
            {
                type: "list",
                name: "weekday",
                message: "Choose weekday : ",
                choices: weekdays,
            },
            {
                type: "input",
                name: "time",
                message: `Enter time in format of 'HH:MM AM/PM' :`,
                default: "10:00 AM",
                validate: function (input) {
                    if (!validateTime(input)) {
                        return `Please enter correct time in format of 'HH:MM AM/PM'`;
                    }
                    return true;
                },
            },
            {
                type: "list",
                name: "phase",
                message: "Choose Phase : ",
                choices: ["phase1", "phase2", "phase3"],
            },
        ]);

        input_weekday = answers.weekday;
        input_time = answers.time;
        phase = answers.phase;

        if (!validateTime(input_time)) {
            throw new Error(
                `Please enter correct time in format of 'HH:MM AM/PM'`
            );
        }

        let shop_status;

        if (phase === "phase1")
            shop_status = findStatusPhase1(input_time, input_weekday);
        else if (phase === "phase2")
            shop_status = findStatusPhase2(input_time, input_weekday);
        else shop_status = findStatusPhase3(input_time, input_weekday);

        console.log(shop_status);
    } catch (error) {
        console.error(error.message);
        process.exit();
    }
})();
