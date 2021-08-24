const router = require("express").Router();
const mongoose = require('mongoose');
const db = require('../models');

// router.post("/api/transaction", ({ body }, res) => {
//   Transaction.create(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// GET ROUTE FOR RENDERING ALL WORKOUTS
// SHOWING TOTAL DURATION OF ALL EXERCISES
router.get("/api/workouts", (req, res) => {
  // USE AGGREGATE TO SUM UP DURATION OF ALL EXERCISES FOR EACH WORKOUT
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } 
      }
    },
  ] )
    // 
    .sort({ date: -1 })
    .then(dbWorkout => {
      // console.log(dbWorkout[0].exercises[0].duration);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
