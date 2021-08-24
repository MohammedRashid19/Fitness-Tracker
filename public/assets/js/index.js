// call function for homepage loading
init();

// function for homepage load
async function init() {
  // use URL to check for search parameter of workout id, and if undefined...
  if (location.search.split("=")[1] === undefined) {
    // use API request to get last workout from database
    const workout = await API.getLastWorkout();
    // if a last workout is found in database,
    if (workout) {
      // set the workout's id to the search parameter in URL
      location.search = "?id=" + workout._id;
    } // otherwise, if no workout in database, don't display "Continue Workout" button
      else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

