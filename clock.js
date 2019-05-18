const Track = require('./track');
const Ball = require('./ball');

class Clock {
    constructor() {
        this.minuteTrack = new Track(4);
        this.fiveMinuteTrack = new Track(11);
        this.hourTrack = new Track(11);
        this.bottomTrack = [];
        this.originalState = null;
        this.dayCount = 0;
        this.firstHalfCycle = true;
    }

    loadClock(totalBallCount) {
        for (let i = 0; i < totalBallCount; i++) {
            this.bottomTrack.push(new Ball(i + 1));
        }
    }

    run() {
        //set the original state for comparison
        this.originalState = [...this.bottomTrack];

        //add the first ball before the loop or the original comparison will cause the loop to exit immediately
        let ball = this.bottomTrack.shift();
        this.addBall(ball);

        while (!this.compareState()) {
            ball = this.bottomTrack.shift();
            this.addBall(ball);
        }

        console.log(`It took ${this.dayCount} days to return to original state with ${this.originalState.length} balls`);
    }

    addBall(ball) {
        //add ball to minutes
        if (!this.addToMinuteTrack(ball, this.minuteTrack)) {
            //if the minute track is full, return the balls to the bottom track
            this.returnToBottomTrackFrom(this.minuteTrack);
            //then try the five minute
            if (!this.addToMinuteTrack(ball, this.fiveMinuteTrack)) {
                //return to bottom track if full then add ball to hours
                this.returnToBottomTrackFrom(this.fiveMinuteTrack);
                this.addToHours(ball);
            }
        }
    }

    addToMinuteTrack(ball, minuteTrack) {
        //there are two tracks that handle minute values and overflow produces similar results
        //so this is used to add to one of those tracks

        if (minuteTrack.isAbleToInsert()) {
            minuteTrack.addBall(ball);
            return true;
        }
        else {
            this.returnToBottomTrackFrom(minuteTrack);
            return false;
        }
    }

    addToHours(ball) {
        //overflow on the hour clock produces slightly different results, so the hour track gets it's own method

        if (this.hourTrack.isAbleToInsert()) {
            this.hourTrack.addBall(ball);
        }
        else {
            this.returnToBottomTrackFrom(this.hourTrack);
            this.bottomTrack.push(ball);
            this.updateDay();
            this.updateHalfCycle();
        }
    }

    updateDay() {
        if (!this.firstHalfCycle) {
            this.dayCount++;
        }
    }

    updateHalfCycle() {
        if (this.firstHalfCycle) {
            this.firstHalfCycle = false;
        }
        else {
            this.firstHalfCycle = true;
        }
    }

    returnToBottomTrackFrom(track) {
        this.bottomTrack.push(...track.tiltTrack());
    }

    compareState() {
        //JS doesn't allow for opperator overloading so in order to compare the array values we'll need to loop over them
        for (let i = 0; i < this.originalState.length; i++) {
            if (this.originalState[i].ballNumber != this.bottomTrack[i].ballNumber) {
                return false;
            }
        }

        return true;
    }

    diplayTime() {
        console.clear();
        console.log(this.dayCount);
        console.log(`${this.hourTrack.track.length}: ${this.fiveMinuteTrack.track.length} : ${this.minuteTrack.track.length}`);
    }
}

module.exports = Clock;