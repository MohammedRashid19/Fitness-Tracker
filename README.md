# Fitness-Tracker

A fitness tracker app that allows a user to view, create and track daily workouts using a Mongo database with a Mongoose schema and handle routes with Express.

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## DESCRIPTION

A fitness tracker application that allows a user to view, create, and track daily workouts. A user can log multiple exercises in a workout on a given day and create new workouts. There are fields for tracking the name, exercise type, weight, sets, reps, duration, and distance traveled (if applicable) for each exercise. The user can also view workout stats for the last 7 workouts, including the total weight lifted and duration of each workout.

## TABLE OF CONTENTS

- [DESCRIPTION](#description)
- [DEVELOPMENT CRITERIA](#development-criteria)
- [INSTALLATION](#installation)
- [USAGE](#usage)
- [LICENSE](#license)
- [CONTRIBUTING](#contributing)
- [TESTS](#tests)
- [TECHNOLOGIES USED](#technologies-used)
- [LINKS](#links)
- [QUESTIONS](#questions)

## DEVELOPMENT CRITERIA

The following acceptance criteria was used to guide the development of this project:

When the user loads the page, they should be given the option to create a new workout or continue with their last workout.

The user should be able to:

- Add exercises to the most recent workout plan.

- Add new exercises to a new workout plan.

- View the combined weight of multiple exercises from the past seven workouts on the `stats` page.

- View the total duration of each workout from the past seven workouts on the `stats` page.

## INSTALLATION

1. Fork the [repository](https://github.com/merewall/Fitness-Tracker) from [GitHub](https://github.com/) to your profile.
2. Clone the repository down to your local machine in command-line using: `git clone`.
3. Node.js is required to run this application. Click [here](#installing-nodejs) for instructions on installing Node.js.
4. Install the required dependices to your cloned directory in command-line using: `npm install`

   - Or install the packages individually...
     - Install [express](https://www.npmjs.com/package/express) to your cloned directory in command-line using: `npm install express`.
     - Install [mongoose](https://www.npmjs.com/package/mongoose) to your cloned directory in command-line using: `npm install mongoose`
     - Install [morgan](https://www.npmjs.com/package/morgan) to your cloned directory in command-line using: `npm install morgan`
     - Install [nodemon](https://www.npmjs.com/package/nodemon) to your cloned directory in command-line using: `npm install --save-dev nodemon`

   ###### Installing Nodejs

   1. Check if you already have Node.js in command-line by typing `node`.
   2. If you have Node.js on your machine, a message similar to `Welcome to Node.js` will appear.
   3. If you do not have Node.js, an error message will appear and you need to download it.
   4. To download Node.js, click [here](https://nodejs.org/en/download/).
   5. After download and installation is complete, restart your command-line terminal and redo step 1 to confirm a successful installation.
   6. After Node.js is on your local machine, return to the [installation](#installation) instructions for this project's application above.

## USAGE

_If cloned down to your computer..._

1. Navigate to the directory of the application in your terminal using `cd`, if not already there.
2. If you haven't already, be sure you followed all [installation](#installation) instructions to install node, express, mongoose, morgan, and nodemon dependencies.
3. Create, connect and seed your database in CLI using: `npm run seed`.
4. Initialize the application in CLI using: `npm start`.
5. Go to https://localhost:3000 to visit application

_If accessing deployed Heroku application..._

1. View the last saved workout on homepage with a workout summary and options to continue the workout or start a new workout.
2. From the homepage, click on "New Workout" to create a new workout in the database and be taken to an exercise input form.
3. From the homepage, click on "Continue Workout" to add more exercises to the latest workout.
4. To add exercises to a workout, first select your exercise type: Resistance or Cardio, then fill in exercise details.
5. After adding exercise details, select "Add Exercise" to add another exercise to your workout.
6. After adding exercise details, select "Complete Workout" to finish your workout and be taken to the homepage with a workout summary.
7. Click "Dashboard" in the nav bar to see stats for the last 7 days of workouts.

_Homepage:_

<img src="https://github.com/merewall/Fitness-Tracker/blob/main/public/assets/images/homepage.PNG" alt="desktop view of fitness tracker homepage" width="600px" height="300px">

_Mobile Homepage:_

<img src="https://github.com/merewall/Fitness-Tracker/blob/main/public/assets/images/mobile-homepage.jpg" alt="mobile view of fitness tracker homepage" width="300px" height="500px">

_Add Exercise - Cardio:_

<img src="https://github.com/merewall/Fitness-Tracker/blob/main/public/assets/images/cardio.PNG" alt="desktop view of adding cardio page" width="600px" height="300px">

_Add Exercise - Resistance:_

<img src="https://github.com/merewall/Fitness-Tracker/blob/main/public/assets/images/resistance.PNG" alt="desktop view of adding resistance page" width="600px" height="300px">

_Dashboard:_

<img src="https://github.com/merewall/Fitness-Tracker/blob/main/public/assets/images/stats.PNG" alt="desktop view of dashboard stats for last 7 days page" width="600px" height="300px">

## LICENSE

This application is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## CONTRIBUTING

If you'd like to contribute to the project, please create a pull request on a new branch of the [repository](https://github.com/merewall/Fitness-Tracker) for review.

## TESTS

No current tests for this application.

## TECHNOLOGIES USED

- [x] HTML
- [x] CSS
- [x] JavaScript
- [x] [Node.js](https://nodejs.org/en/)
- [x] [express](https://www.npmjs.com/package/express)
- [x] [mongoose](https://www.npmjs.com/package/mongoose)
- [x] [morgan](https://www.npmjs.com/package/morgan)
- [x] [nodemon](https://www.npmjs.com/package/nodemon)

## LINKS

- The [repository](https://github.com/merewall/Fitness-Tracker) for this application.
- The [deployed application](https://still-retreat-86254.herokuapp.com/).

## QUESTIONS

For any questions, please check out my GitHub profile or send me an email:

- GitHub: [merewall](https://github.com/merewall)
- Email: [mlwall@alumni.princeton.edu](mailto:mlwall@alumni.princeton.edu)
