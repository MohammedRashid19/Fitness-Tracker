const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// day
// exercises
const WorkoutSchema = new Schema({

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

  // totalDuration: Number
});

// WorkoutSchema.methods.setTotalDuration = function() {
//   this.fullName = `${this.firstName} ${this.lastName}`;
//   return this.fullName;
// };

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
