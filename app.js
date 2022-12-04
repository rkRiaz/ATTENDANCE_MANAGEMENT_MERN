const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')
const uploadRoute = require('./routes/upload')
const teacherRoute = require('./routes/teacher')
const courserRoute = require('./routes/course')
const attendanceRoute = require('./routes/attendance')
const studentRoute = require('./routes/student')
const path = require('path')

// Custom Error Hanndler..
const errorHandler = require('./middlewares/error-handler');


const app = express()

const middlewares = [
    express.static('public'),  //make the public directory public
    express.json(),
    express.urlencoded({extended: true}),
    cors(),
    errorHandler.extra
]
app.use(middlewares)


//Router Request Handeler..
app.use('/api/upload', uploadRoute)
app.use('/api/teacher', teacherRoute)
app.use('/api/course', courserRoute)
app.use('/api/attendance', attendanceRoute)
app.use('/api/student', studentRoute)


// this code are for serving the static front end 
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.get('/', (req, res) => {
    res.send('<h1>Welcome to attendance management system</h1>')
})

const PORT = process.env.PORT || 8080
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p4dm8.mongodb.net/attendance_management?retryWrites=true&w=majority`
// const MONGODB_URI = 'mongodb://localhost:27017/attendance_management'
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => {
    console.log(`Database Connected`)
    app.listen(PORT, () => {
        console.log(`Listening PORT: ${PORT}`)
    })
})
.catch(e => {
    console.log(e)
})
