
const Course = require('../models/Course')

exports.allCourses = async (req, res, next) => {
    try {
        const response = await Course.find()
        return res.status(200).json({
            message: 'Successfully fetched all courses',
            courses: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getCourse = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await Course.findOne({_id: id})
        return res.status(200).json({
            message: 'Successfully fetched course',
            course: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getCoursesByTeacherId = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await Course.find({teacher: id})
        return res.status(200).json({
            message: 'Successfully fetched all data',
            courses: response
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
        const newCourse = new Course(req.body)
        let response = await newCourse.save() 
        res.status(200).json({
            message: "Successfully added",
            course: response
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
        const response = await Course.findOneAndUpdate({ _id: id }, { $set: updatedData } , {new: true})
        return res.status(200).json({
            message: 'Successfully Updated',
            course: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await Course.findOneAndDelete({_id: id})
        return res.status(200).json({
            message: 'Deleted',
            course: response
        })
    }
    catch(err) {
        next(err)
    }
}