const userService = require("../services/user.service");

//Register User 
async function createUser(req, res) {
    try {
        const {name, aboutYou, birthday, mobileNumber, email, country} = req.body;

        const result = await userService.createUser(name, aboutYou, birthday, mobileNumber, email, country);
        
        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message || "Internal server error"
        })
    }
}

//Get All Users with Filtering and Pagination
async function getAllUsers(req, res) {
    try {
        // Extract query parameters for filtering
        const filters = {
            name: req.query.name,
            email: req.query.email,
            country: req.query.country,
            fromDate: req.query.fromDate,
            toDate: req.query.toDate,
            search: req.query.search
        };

        // Extract query parameters for pagination
        const pagination = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'DESC'
        };

        // Validate pagination parameters
        if (isNaN(pagination.page) || pagination.page < 1) {
            return res.status(400).json({
                error: true,
                payload: "Invalid page number. Page must be a positive integer."
            });
        }

        if (isNaN(pagination.limit) || pagination.limit < 1 || pagination.limit > 100) {
            return res.status(400).json({
                error: true,
                payload: "Invalid limit. Limit must be between 1 and 100."
            });
        }

        // Validate date format 
        if (filters.fromDate && isNaN(new Date(filters.fromDate))) {
            return res.status(400).json({
                error: true,
                payload: "Invalid fromDate format. Use YYYY-MM-DD format."
            });
        }

        if (filters.toDate && isNaN(new Date(filters.toDate))) {
            return res.status(400).json({
                error: true,
                payload: "Invalid toDate format. Use YYYY-MM-DD format."
            });
        }

        const result = await userService.getAllUsers(filters, pagination);

        return res.status(200).json({
            error: false,
            payload: result
        });
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message || "Internal server error"
        })
    }
}

//Get User By ID
async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const result = await userService.getUserById(id);

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message || "Internal server error"
        })
    }
}

//Edit User
async function editUser(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const result = await userService.editUser(id, updatedData)

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            })
        }   
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message || "Internal server error"
        })
    }
}

//Delete User
async function deleteUser(req, res) {
    try {
        const userID = req.params.id

        const result = await userService.deleteUser(userID);

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }

    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message || "Internal server error"
        })
    }
}

module.exports = {
    createUser, 
    getAllUsers,
    getUserById,
    editUser,
    deleteUser
}