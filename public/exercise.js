// variables for selecting HTML elements on /exercise page
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

// function for /exercise page load
async function initExercise() {
  let workout;
  // if this is a new workout
  if (location.search.split("=")[1] === undefined) {
    // send API request to create a new workout
    workout = await API.createWorkout()
    console.log(workout)
  }
  // using newly created workout or existing workout, 
  // set url with workout id as search parameter
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}

initExercise();

// function for changing workout type
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;
  // changing the display: none class (d-none) depending on which chosen type of workout
  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }
  // make sure inputs are valid using function below
  validateInputs();
}

// function to validate user's chosen inputs
function validateInputs() {
  let isValid = true;

  // validation for resistance workouts
  if (workoutType === "resistance") {
    // name of workout is required (cannot be empty string)
    if (nameInput.value.trim() === "") {
      isValid = false;
    }
    // weights are required
    if (weightInput.value.trim() === "") {
      isValid = false;
    }
    // sets are required
    if (setsInput.value.trim() === "") {
      isValid = false;
    }
    // reps are required
    if (repsInput.value.trim() === "") {
      isValid = false;
    }
    // duration is required
    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } // validation for cardio workouts
    else if (workoutType === "cardio") {
    // name is required input
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }
    // duration is required input 
    if (durationInput.value.trim() === "") {
      isValid = false;
    }
    // distance is required input
    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }
  // if all inputs for workout are valid,
  // enable buttons to "complete" the workout or "add exercise"
  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

// function for handling exercise/workout form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // empty object to hold workout stats
  let workoutData = {};

  // setting stats for cardio workout from user inputs
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } // setting stats for resistance workout from user inputs
    else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  // send API request using exercise stats input by user
  await API.addExercise(workoutData);
  // clear form inputs
  clearInputs();
  toast.classList.add("success");
}

// 
function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

// helper function to clear all form inputs
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

// event listener for changing the workout type & initiate function for handling
if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
// event listener for complete workout button
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    // allows navigation back to home page via handleToastAnimationEnd function
    shouldNavigateAway = true;
    // process all form data using helper function
    handleFormSubmit(event);
  });
}
// event listener for adding another exercise, capturing form data
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
// event listener to navigate back to homepage after "Workout Added Successfully!" animation is over
toast.addEventListener("animationend", handleToastAnimationEnd);

// validate all the inputs on the page user helper function
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
