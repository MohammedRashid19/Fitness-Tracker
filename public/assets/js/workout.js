async function initWorkout() {
  // use API route to get the last saved workout
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  // if there is a saved workout...
  if (lastWorkout) {
    // set "Continue Workout" button to clickable link to the last workout
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    // use last workout data to render to page
    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      // this will render total weights, sets, and reps for resistance
      // or total distance for cardio
      ...tallyExercises(lastWorkout.exercises)
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    // if no workout found, render the no workout text
    renderNoWorkoutText()
  }
}

// function to add up exercise stats to display in workout summary
function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    // If exercises are resistance ones, use accumulator to add up weights, sets, and reps
    // If exercises are cardio, use accumulator to add up the distance
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

// helper function to format dates
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

// function to render a workout summary to page
function renderWorkoutSummary(summary) {
  // selecting div to render stats into
  const container = document.querySelector(".workout-stats");

  // object holding stat labels for rendering them to page
  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  // Create a p tag for each of the stat labels, make them bold,
  // set the stat label to the specified text in the object above,
  // and fill in the stats with corresponding key data for that workout
  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

// Function for when there is no saved last workout
function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

// Calling function on page load to grab and render last workout (or no workout)
initWorkout();
