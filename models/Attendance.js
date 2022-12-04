const { Schema, model } = require("mongoose");

const attendanceSchema = new Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    date: String,
    present: [],
    absent: [],
    late: [],
  },
  {
    timestamps: true,
  }
);
attendanceSchema.index({
  teacher: 1,
  semester: 1,
  date: 1,
  course: 1,
});

const Attendance = model("Attendance", attendanceSchema);
module.exports = Attendance;
