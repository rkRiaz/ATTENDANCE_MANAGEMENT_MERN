
const Attendance = require('../models/Attendance')

exports.allAttendances = async (req, res, next) => {
    try {
        const response = await Attendance.find().populate('course')
        return res.status(200).json({
            message: 'Successfully fetched all data',
            attendances: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.attendancesByTeacherId = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await Attendance.find({teacher: id}).populate('course')
        return res.status(200).json({
            message: 'Successfully fetched all data',
            attendances: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.filterAttendances = async (req, res, next) => {
    const { id } = req.params
    const {date, courseId} = req.query
    let response = []
    try {
        if(date && !courseId) {
            response = await Attendance.find({teacher: id, date}).populate('course')
        } 
        else if(courseId && !date) {
            response = await Attendance.find({teacher: id, course: courseId}).populate('course')
        } 
        else if(courseId && date) {
            response = await Attendance.find({teacher: id, date, course: courseId}).populate('course')
        } 
        else {
            response = await Attendance.find({teacher: id}).populate('course')
        }
        return res.status(200).json({
            message: 'Successfully fetched all data',
            attendances: response
        })
    }
    catch(err) {
        next(err)
    }
    

    // try {
    //     const response = await Attendance.find({teacher: id}).populate('course')
    //     return res.status(200).json({
    //         message: 'Successfully fetched all data',
    //         attendances: response
    //     })
    // }
    // catch(err) {
    //     next(err)
    // }
}




exports.getAttendance = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await Attendance.findOne({_id: id}).populate('course')
        return res.status(200).json({
            message: 'Successfully fetched single data',
            attendance: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.add = async (req, res, next) => {
   
    // let errors = validationResult(req).formatWith(errorFormatter)

    // if(!errors.isEmpty()) {
    //     return res.status(422).json(errors.mapped())
    // }
    try{
        const newAttendance = new Attendance(req.body)
        let response = await newAttendance.save() 
        res.status(200).json({
            message: "Successfully added",
            attendance: response
        })
    } catch (e) {
        next(e)
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
    // return console.log(updatedData)

        const response = await Attendance.findOneAndUpdate({ _id: id }, { $set: updatedData } , {new: true})
        return res.status(200).json({
            message: 'Successfully Updated',
            attendance: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.deleteAttendance = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await Attendance.findOneAndDelete({_id: id})
        return res.status(200).json({
            message: 'Deleted',
            attendance: response
        })
    }
    catch(err) {
        next(err)
    }
}