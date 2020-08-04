const {
    checkDate,
    checkTime
} = require('./regex');
const ifEmpty = require('./checkForEmpty');

module.exports = function checkRegistrationFields(diet) {
    //catches errors
    let error = {};

    let data = {
        ...diet
    }

    data.meal_category = ifEmpty(data.meal_category) ? data.meal_category : "";
    data.food_name = ifEmpty(data.food_name) ? data.food_name : "";
    data.meal_date = ifEmpty(data.meal_date) ? data.meal_date : "";
    data.food_quantity = ifEmpty(data.food_quantity) ? data.food_quantity : "";
    data.food_calories = ifEmpty(data.food_calories) ? data.food_calories : "";
    data.food_fat = ifEmpty(data.food_fat) ? data.food_fat : "";
    data.food_protein = ifEmpty(data.food_protein) ? data.food_protein : "";
    data.food_carbs = ifEmpty(data.food_carbs) ? data.food_carbs : "";
    data.food_fiber = ifEmpty(data.food_fiber) ? data.food_fiber : "";

    if (data.meal_category = "")
        error.meal_category = "A meal category is required";
    if (data.food_name = "")
        error.food_name = "A food name is required"
    if (!checkDate.test(data.meal_date))
        error.meal_date = "A valid date is required"
    if (data.food_quantity = "")
        error.food_quantity = "A valid quantity is required"
    if (data.food_calories = "")
        error.food_calories = "A valid calorie amount is required"
    if (data.food_fat = "")
        error.food_fat = "A valid fat amount is required";
    if (data.food_protein = "")
        error.food_protein = "A valid protein amount is required";
    if (data.food_carbs = "")
        error.food_carbs = "A valid carbohydrate amount is required";
    if (data.food_fiber = "")
        error.food_fiber = "A valid fiber amount is required";

    return {
        error,
        isValid: ifEmpty(error)
    };
};