
const Teacher = require('../models/Teacher')

const { validationResult } = require('express-validator')
const {errorFormatter} = require('../utils/errorFormatter')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 

exports.registration = async (req, res, next) => {
    const { id, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()) {
        return res.status(422).json(errors.mapped())
    }
    try{
        const hashed_password = await bcrypt.hash(password, 11)
        const teacher = new Teacher({
            id, 
            password: hashed_password 
        })
        let newTeacher = await teacher.save() 
        res.status(200).json({
            message: "Successfully Registered",
            newTeacher
        })
    } catch (e) {
        next(e)
    }
}


exports.login = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }
    try{
        const findTeacher = await Teacher.findOne({id: req.body.id})
        let token = jwt.sign({
            _id: findTeacher._id,
        }, 'TEACHER_SECRET', {expiresIn: '24h'})

        res.status(200).json({
            message: 'Login Success',
            token: token,
            expiresIn: 86400 
        })
    } catch(e) {
        next(e)
    }

}

exports.getTeacherById = async (req, res, next) => {
    try{
        let {id} = req.params
        let response = await Teacher.findOne({_id: id})
        res.status(200).json({
            teacher: response,
            message: "Fetch teacher by id"
        });
    }
    catch(err) {
        next(err)
    }
}

exports.edit = async (req, res, next) => {
    // let errors = validationResult(req).formatWith(errorFormatter)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json(errors.mapped())
    // }
    try {
        const { id } = req.params
        const updatedData = req.body;
        const response = await Teacher.findOneAndUpdate({ _id: id }, { $set: updatedData } , {new: true})
        return res.status(200).json({
            message: 'Teacher Successfully Updated',
            teacher: response
        })
    }
    catch(err) {
        next(err)
    }
}


exports.changePassword = async(req, res, next) => {
    let{ oldPassword, newPassword, confirmPassword } = req.body
    const loginAdminId = req.adminId;
    try {
        let findAdmin = await Admin.findById(loginAdminId)
        if(findAdmin) {
            if(newPassword !== confirmPassword) {
               return res.status(200).json({
                   message: "Confirm password does not match"
               })
            }

            if(oldPassword && newPassword && confirmPassword !== "" || null) {
                let match = await bcrypt.compare(oldPassword, findAdmin.password)
                if(match) {
                    let hash = await bcrypt.hash(newPassword, 11)
                    await Admin.findOneAndUpdate(
                        {_id: loginAdminId},
                        {$set: {password: hash}},
                        {new: true},
                    )
                    return res.status(200).json({
                        message: "Successfully changed password"
                    }) 
                } else {
                    return res.status(200).json({
                        message: 'Old password does not match'
                    }) 
                }
             } else {
                 return res.status(200).json({
                    message: "Must Fillup All Fields"
                })
             }
        }
    }catch(e) {
        next(e)
    }

}