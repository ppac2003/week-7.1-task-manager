document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const additionalDetails = document.getElementById('additionalDetails').value;

    const response = await fetch(`/courses/${courseId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskName, dueDate, additionalDetails })
    });

    const data = await response.json();
    console.log(data); // Do something with the response
});