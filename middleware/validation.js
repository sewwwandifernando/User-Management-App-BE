const { body, param, validationResult } = require('express-validator');

// Validation rules for user creation
const createUserValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name should only contain letters and spaces'),

    body('aboutYou')
        .trim()
        .notEmpty()
        .withMessage('About You is required')
        .isLength({ min: 10, max: 250 })
        .withMessage('About You must be between 10 and 250 characters'),

    body('birthday')
        .notEmpty()
        .withMessage('Birthday is required')
        .isDate()
        .withMessage('Birthday must be a valid date')
        .custom((value) => {
            const today = new Date();
            const birthday = new Date(value);
            if (birthday > today) {
                throw new Error('Birthday cannot be in the future');
            }
            const age = today.getFullYear() - birthday.getFullYear();
            if (age > 120) {
                throw new Error('Invalid age');
            }
            return true;
        }),

    body('mobileNumber')
        .trim()
        .notEmpty()
        .withMessage('Mobile number is required')
        .matches(/^[+]?[\d\s\-\(\)]{10,15}$/)
        .withMessage('Invalid mobile number format'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('country')
        .trim()
        .notEmpty()
        .withMessage('Country is required')
        .isLength({ min: 2, max: 20 })
        .withMessage('Country must be between 2 and 20 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Country should only contain letters and spaces')
];

// Validation rules for user update (similar to create but can be partial)
const updateUserValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name should only contain letters and spaces'),

    body('aboutYou')
        .optional()
        .trim()
        .isLength({ min: 10, max: 250 })
        .withMessage('About You must be between 10 and 250 characters'),

    body('birthday')
        .optional()
        .isDate()
        .withMessage('Birthday must be a valid date')
        .custom((value) => {
            if (value) {
                const today = new Date();
                const birthday = new Date(value);
                if (birthday > today) {
                    throw new Error('Birthday cannot be in the future');
                }
                const age = today.getFullYear() - birthday.getFullYear();
                if (age > 120) {
                    throw new Error('Invalid age');
                }
            }
            return true;
        }),

    body('mobileNumber')
        .optional()
        .trim()
        .matches(/^[+]?[\d\s\-\(\)]{10,15}$/)
        .withMessage('Invalid mobile number format'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('country')
        .optional()
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Country must be between 2 and 20 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Country should only contain letters and spaces')
];

// Validation for user ID parameter
const userIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            payload: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg,
                value: error.value
            }))
        });
    }
    next();
};

module.exports = {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
    handleValidationErrors
};