class Track {
    constructor(clockSize) {
        this.track = [];
        this.clockSize = clockSize;
    }

    addBall(ball) {
        this.isAbleToInsert() ? this.track.push(ball) : null;
    }

    isAbleToInsert() {
        return this.track.length < this.clockSize;
    }

    tiltTrack() {
        let ballReturn = this.track.reverse();
        this.track = [];
        return ballReturn;
    }

    print() {
        console.log(this.track);
    }
}

module.exports = Track;