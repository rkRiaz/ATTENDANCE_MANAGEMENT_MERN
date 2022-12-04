const { check } = require("express-validator");
const Teacher = require("../models/Teacher");
const bcrypt = require('bcrypt') 


exports.registrationValidator = [
  check("id")
    .not()
    .isEmpty()
    .withMessage("id required")
    .custom(async (id) => {
      let teacher = await Teacher.findOne({ id });
      if (teacher) {
        throw new Error("Id already in use");
      }
      return true;
    }),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Password")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars long"),

  check("confirm_password")
    .not()
    .isEmpty()
    .withMessage("Please confirm your password")
    .custom((confirm_password, { req }) => {
      if (confirm_password !== req.body.password) {
        throw new Error("Password does not match");
      }
      return true;
    }),
];

exports.loginValidator = [
  check("id")
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async (id) => {
      let teacher = await Teacher.findOne({ id });
      if (!teacher) {
        return Promise.reject("This id is not registered yet");
      }
      return true;
    })
    .trim(),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Password")
    .custom(async (password, { req }) => {
      let teacher = await Teacher.findOne({ id: req.body.id });
      let match = await bcrypt.compare(password, teacher.password);
      if (!match) {
        return Promise.reject("Invalid Password");
      }
      return true;
    }),
];

