// RESISTANCE
// type
// name
// duration
// weight
// reps
// sets

// CARDIO
// type
// name
// duration
// distance
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Enter a type of workout"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter a name for transaction"
    },
    duration: {
        type: Number,
        required: "Enter a duration (in minutes)"
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    distance: {
        type: Number,
    },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;