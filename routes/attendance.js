const router = require("express").Router();

const {
  add,
  edit,
  deleteAttendance,
  allAttendances,
  getAttendance,
  filterAttendances
  
} = require("../controllers/attendance");

router.post("/add", add);
router.get("/get-attendance/:id", getAttendance); //id=attendanceId
router.get("/all", allAttendances);
router.put("/edit/:id", edit); //id=attendanceId
router.delete("/delete/:id", deleteAttendance);//id=attendanceId

router.get("/get-filter-attendances/:id", filterAttendances);  //id=teacherId

module.exports = router;
