
const Clock = require('./clock');
const readline = require('readline');
const validation = require('./validation');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let clock = new Clock;

const getInput = () => {
    input.question('Please enter the number of balls to be added to the clock: ', (response) => {
        if (validation.validateBallCountInput(response)) {
            totalBallCount = response;
            console.log(`Thank you. Testing clock with ${totalBallCount} balls. Please wait...`);

            clock.loadClock(totalBallCount);
            clock.run();
            input.close();
        }
        else {
            console.log('Sorry, the clock can only accept a numer of balls between 27 and 127');
            getInput();
        }
    })
}

console.log('This program is to test the calculation time of a ball clock. The ball clock can take a number of balls within the range of 27 - 127');
getInput();