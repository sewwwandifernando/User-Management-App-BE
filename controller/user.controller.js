
const userService = require("../services/user.service");


//Register User 
async function createUser(req, res) {
    try {
        const {name,aboutYou,birthday, mobileNumber, email, country} = req.body;

        const result = await userService.createUser(name, aboutYou, birthday, mobileNumber, email, country);
        
        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get All Users
async function getAllUsers(req, res) {
    try {

        const listOfUsers = await userService.getAllUsers();

        return res.status(200).json({
            error: false,
            payload: listOfUsers
        });
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get User By ID
async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const result = await userService.getUserById(id);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        return res.status(500).json ({
            error: true,
            payload: error
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
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }   
    } catch (error) {
        return res.status(500).json ({
            error: true,
            payload: error
        })
    }
}

//Delete User
async function deleteUser(req, res) {
    try {
        const userID = req.params.id

        const result = await userService.deleteUser(userID);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            });
        }

    } catch (error) {
        return res.status(500).json ({
            error: true,
            payload: error
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