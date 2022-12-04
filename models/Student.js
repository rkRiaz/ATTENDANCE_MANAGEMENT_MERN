const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    student_id: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true 
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    }
}, {
    timestamps: true
});

studentSchema.index({
    batch: 1,
    student_id: 1,
    department: 1
})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
