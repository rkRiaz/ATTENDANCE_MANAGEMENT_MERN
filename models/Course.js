const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    semester: {
        type: String,
        required: true,
    },
    batch: {
        type: [],
        required: true,
    }
}, {
    timestamps: true
});

courseSchema.index({
    code: 'text',
    title: 'text'
}, {
    weights : {
        code: 10,
        title: 5
    }
})

const Course = model('Course', courseSchema);
module.exports = Course;