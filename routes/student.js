const router = require('express').Router()
const {add, edit, getStudentById, getStudentsByBatch, deleteStudent, allStudents} = require('../controllers/student')

router.post('/add', add)
router.get('/all', allStudents)
router.get('/get-student-by-id/:id', getStudentById)
router.get('/get-students-by-batch/:batch', getStudentsByBatch)
router.put('/edit/:id', edit)
router.delete('/delete/:id', deleteStudent)

module.exports = router