exports.validateBallCountInput = (input) => {
    if (input >= 27 && input <= 127) {
        return true;
    }

    return false;
}