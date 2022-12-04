const router = require('express').Router()
const { registrationValidator, loginValidator } = require('../validators/teacher')
const {registration, login, getTeacherById, edit} = require('../controllers/teacher')

router.post('/registration',registrationValidator, registration)
router.post('/login',loginValidator, login)
router.get('/get-teacher-by-id/:id', getTeacherById)
router.put('/edit/:id', edit)



module.exports = router