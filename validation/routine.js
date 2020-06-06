const { checkDate, checkTime } = require('./regex');
const ifEmpty = require('./checkForEmpty');

module.exports = function checkRegistrationFields(routine) {
    //catches errors
    let error = {};

    /*expected data 
        workout_category
        workout_title
        workout_date
        workout_start_time
        workout_end_time
        workout_description
        completed
    */

    let data = {
        ...routine
    }

    data.routine_title = ifEmpty(data.workout_category) ? data.workout_category : "";

    if (data.routine_title = "")
        error.routine_title = "title is required";

    return {
        error,
        isValid: ifEmpty(error)
    };
};