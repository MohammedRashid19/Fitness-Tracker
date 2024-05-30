const apiKey = '26e4f9c4bfmshd11bb418d8ceb02p1ca91cjsn5b0432740202';
const apiHost = 'exercisedb.p.rapidapi.com';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getExercises = async () => {
    const response = await fetch(`https://${apiHost}/exercises`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': apiHost,
            'x-rapidapi-key': apiKey
        }
    });
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
    }
    const exercises = await response.json();
    return exercises.slice(0, 5); // Limit to 5 exercises for simplicity
};

const displayWorkouts = async () => {
    const container = document.getElementById('workout-container');

    for (const day of daysOfWeek) {
        const exercises = await getExercises();
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<h2>${day}</h2>`;

        exercises.forEach(exercise => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise';
            exerciseDiv.innerHTML = `
                <h3>${exercise.name}</h3>
                <p><strong>Type:</strong> ${exercise.bodyPart}</p>
                <p><strong>Muscle:</strong> ${exercise.target}</p>
                <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                <p><strong>Difficulty:</strong> N/A</p>
                <p><strong>Instructions:</strong> ${exercise.instructions}</p>
            `;
            dayDiv.appendChild(exerciseDiv);
        });

        container.appendChild(dayDiv);
    }
};

displayWorkouts().catch(error => {
    console.error('Error fetching workout routines:', error);
    const container = document.getElementById('workout-container');
    container.innerHTML = '<p>Sorry, there was an error loading the workout routines. Please try again later.</p>';
});


