const { body } = require("express-validator");

exports.validateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),
  body("priority")
    .isInt({ min: 1, max: 5 })
    .withMessage("Priority must be an integer between 1 and 5"),
];
