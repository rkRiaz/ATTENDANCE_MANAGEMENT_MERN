const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,  
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    department: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
