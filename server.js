const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'student_tasks';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    const db = client.db(dbName);


    app.get('/courses/:courseId/tasks', (req, res) => {
        const courseId = req.params.courseId;
        const tasksCollection = db.collection('tasks');

        tasksCollection.find({ courseId: courseId }).toArray((err, tasks) => {
            if (err) {
                console.error('Error fetching tasks:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            if (tasks.length === 0) {
                res.status(404).json({ error: 'No tasks found for the specified course ID' });
                return;
            }
            res.json(tasks);
        });
    });


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});