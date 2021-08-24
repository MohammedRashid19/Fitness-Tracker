const router = require("express").Router();
const mongoose = require('mongoose');
const db = require('../models');
const path = require('path');

// GET ROUTE FOR RENDERING ALL WORKOUTS
// SHOWING TOTAL DURATION OF ALL EXERCISES
router.get("/api/workouts", (req, res) => {
  // USE AGGREGATE TO SUM UP DURATION OF ALL EXERCISES FOR EACH WORKOUT
  // AND SET TO NEW PROPERTY OF TOTALDURATION
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } 
      }
    },
  ] )
    // Descending order - newest workouts to oldest
    .sort({ day: 1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET ROUTE FOR RENDERING EXERCISE PAGE
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// POST ROUTE FOR CREATING A NEW WORKOUT
router.post("/api/workouts", ( req, res) => {
  // Create a new workout document in the database
  db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT ROUTE FOR UPDATING A WORKOUT WITH NEW EXERCISES
router.put("/api/workouts/:id", ( req, res) => {
  // Find a workout document by id and add the new exercise to the array of exercises
  db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET ROUTE FOR RENDERING STATS DASHBOARD
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

// GET ROUTE FOR GETTING WORKOUT DATA FOR LAST 7 DAYS
router.get("/api/workouts/range", (req, res) => {
  // set a variable for six days ago (to filter for last 7 days of data, including today)
  const sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6))
  // a variable for filtering workouts where the day is greater than the date six days ago
  const filter = { day: { $gte: sixDaysAgo } };

  // Use aggregate method to get all workouts, filtered for last 7 days
  // and add a field of totalDuration, summing the exercise durations for each workout
  db.Workout.aggregate([
    { 
      $match: filter 
    },
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } }
    },
  ])
  // Descending order - newest workouts to oldest
  .sort({ day: -1 })
  .then(workouts => {
    res.json(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

module.exports = router;
