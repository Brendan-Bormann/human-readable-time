function formatDuration(totalSeconds) {

    let secondsBin = totalSeconds;
    let responseArray = [];
    let response = '';

    class Unit {
        constructor(name, value, text) {
            this.name  = name;
            this.value = value;
            this.text  = text;
        }
    }

    let years = new Unit('year', 0, '');
    let days = new Unit('day', 0, '');
    let hours = new Unit('hour', 0, '');
    let minutes = new Unit('minute', 0, '');
    let seconds = new Unit('second', 0, '');

    let formatArray = [];

    // Here we check if 0 otherwise we start increasing our specificity values
    if (totalSeconds === 0) {
        return "now";
    } else {
        console.log(" ┌──────────────────┐");
        console.log(" │  Parsing time... │");
        console.log(" ├──────────────────┘");
        console.log(" │");
        console.log(" ├ " + totalSeconds + " seconds");
        console.log(" │");
        do {
            switch(true) {
                case (secondsBin >= 31536000):
                    secondsBin -= 31536000;
                    years.value++;
                    break;

                case (secondsBin >= 86400):
                    secondsBin -= 86400;
                    days.value++;
                    break;

                case (secondsBin >= 3600):
                    secondsBin -= 3600;
                    hours.value++;
                    break;

                case (secondsBin >= 60):
                    secondsBin -= 60;
                    minutes.value++;
                    break;

                case (secondsBin >= 1):
                    secondsBin -= 1;
                    seconds.value++;
                    break;
            }
        }
        while (secondsBin > 0)
    }

    // This block finds how many values we have and pushes them to an array to be formatted
    words(years, formatArray);
    words(days, formatArray);
    words(hours, formatArray);
    words(minutes, formatArray);
    words(seconds, formatArray);

    // This block is hard coded to format the response with the correct commas and 'and's
    if (formatArray.length === 1) {
        response = formatArray[0];
    } else if (formatArray.length === 2) {
        response = formatArray[0] + " and " + formatArray[1];
    } else if (formatArray.length === 3) {
        response = formatArray[0] + ", " + formatArray[1] + " and " + formatArray[2];
    } else if (formatArray.length === 4) {
        response = formatArray[0] + ", " + formatArray[1] + ", " + formatArray[2] + " and " + formatArray[3];
    } else if (formatArray.length === 5) {
        response = formatArray[0] + ", " + formatArray[1] + ", " + formatArray[2] + ", " + formatArray[3] + " and " + formatArray[4];
    }

    console.log(" ├ " + response.trim());
    console.log(" │");
    return (response.trim());
}

// Simple function to find if we need a plural
function multi(x) {
    if (x > 1) {
        return "s";
    } else {
        return "";
    }
}

// converts values to words, and pushes them to array
function words(unit, formatArray) {
    if (unit.value > 0) {
        unit.text += unit.value + " " + unit.name + multi(unit.value);
        formatArray.push(unit.text);
    }
}

function test(attempt, answer) {
    if (attempt === answer) {
        console.log(" ├──────────────────┐");
        console.log(" │   Test Passed.   │");
        console.log(" └──────────────────┘");
        console.log('\n');
    } else {
        console.log(" ├──────────────────┐");
        console.log(" │   Test Failed.   │");
        console.log(" └──────────────────┘");
        console.log('\n');
    }
}

test(formatDuration(1), "1 second");
test(formatDuration(62), "1 minute and 2 seconds");
test(formatDuration(120), "2 minutes");
test(formatDuration(3600), "1 hour");
test(formatDuration(3662), "1 hour, 1 minute and 2 seconds");
test(formatDuration(76643333), "2 years, 157 days, 1 hour, 48 minutes and 53 seconds");
test(formatDuration(157680000), "5 years");
test(formatDuration(666), "11 minutes and 6 seconds");
test(formatDuration(6666666), "77 days, 3 hours, 51 minutes and 6 seconds");
