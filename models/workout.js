const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// day
// exercises
const workoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now
  },

  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],

  totalDuration: Number
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
