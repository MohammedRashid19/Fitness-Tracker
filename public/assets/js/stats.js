// function for calculating total weights for last 7 days of workouts
function calculateTotalWeight(data) {
  // create empty array to push weights to
  const totals = [];

  // for each workout in last 7 days...
  data.forEach((workout) => {
    // use reduce method to 
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      // sum of total weights from each resistance workout
      if (type === 'resistance') {
        return total + weight;
      }
      // but not for cardio workouts (default 0)
      return total;
    }, 0);
    // push the total weights for each workout from the past 7 days into the "totals" array
    totals.push(workoutTotal);
  });
  // return the array of total weights for the past 7 days of workouts
  return totals;
}

// function to create charts for page using database data of last 7 days of workouts
function populateChart(data) {
  // variables for workout durations and weights
  const durations = data.map(({ totalDuration }) => totalDuration);
  const pounds = calculateTotalWeight(data);
  // select html elements for charts
  const line = document.querySelector('#canvas').getContext('2d');
  const bar = document.querySelector('#canvas2').getContext('2d');
  // labels for the chart (the last 7 days)
  const labels = data.map(({ day }) => {
    const date = new Date(day);

    // Use JavaScript's `Intl` object to help format dates
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  });

  // Creating duration chart for last 7 days
  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      // using formatted day labels
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          // duration data pulled from database
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Time Spent Working Out (Last 7 days)',
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Creating bar chart for total weights over last 7 days
  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          // use total weight data pulled and summed from database
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted (Last 7 days)',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// get all workout data from back-end
// and use data to create chart
API.getWorkoutsInRange().then(populateChart);
