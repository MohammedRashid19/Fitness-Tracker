// object for all API request functions
const API = {
  // GETTING LAST WORKOUT FOR HOMEPAGE
  async getLastWorkout() {
    let res;
    try {
      // fetch GET request at given route for all workouts
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    // save response as json and a variable
    const json = await res.json();
    // return the last workout in the json response
    return json[json.length - 1];
  },
  // UPDATING A WORKOUT WITH A NEW EXERCISE
  async addExercise(data) {
    // use url to grab workout id
    const id = location.search.split("=")[1];
    // PUT request to update a workout by ID
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    // save response as json and a variable
    const json = await res.json();
    // return the json
    return json;
  },
  // CREATING A NEW WORKOUT
  async createWorkout(data = {}) {
    // POST request to the API endpoint to make a new workout in database
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    // save response as json and a variable
    const json = await res.json();
    // return the json
    return json;
  },
  // GETTING WORKOUT DATA FROM LAST 7 DAYS
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
