// REQUIRE MONGOOSE MODULE & SCHEMA
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// CREATE NEW SCHEMA FOR WORKOUT
const WorkoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now
  },

  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
      },
      name: {
          type: String,
          trim: true,
          required: "Enter a name for the exercise"
      },
      duration: {
          type: Number,
          required: "Enter an exercise duration (in minutes)"
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
    }
  ],
});

// MAKE THE WORKOUT SCHEMA A MONGOOSE MODEL
const Workout = mongoose.model("Workout", WorkoutSchema);

// EXPORT THE WORKOUT MODEL
module.exports = Workout;
