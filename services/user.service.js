
const { Users } = require("../models");

//Register User
async function createUser(name, aboutYou, birthday, mobileNumber, email, country) {
    try { 
        // Check if email already exists
        const emailExist = await Users.findOne({
            where: { email: email }
        });

        if (emailExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, a user already exists with that email address!"
            };
        }

        const newUser = await Users.create({
            name: name,
            aboutYou: aboutYou,
            birthday: birthday,
            mobileNumber: mobileNumber,
            email: email,
            country: country,          
          });

          return {            
            error: false,
            status: 200,
                payload: "User Successfully Created"
        }

    } catch (error) {
        console.error('Error Creating User Service : ',error);
        throw error;
    }
}

//Get All Users
async function getAllUsers(){
    try {
        const listOfUsers = await Users.findAll();

        const userResponse = listOfUsers.map((user) => {
            return {
                id: user.id,
                name: user.name,
                aboutYou: user.aboutYou,
                birthday: user.birthday,
                mobileNumber: user.mobileNumber,
                email: user.email,
                country: user.country,
                createdAt: user.createdAt,
             
            }
        })
        return userResponse;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//Get User By ID
async function getUserById(id) {
    try {
        const user = await Users.findByPk(id);

        if(!user){
            return {
                error : true,
                status: 404,
                payload: "User not Found."
            }
        }

        const response = {
            id: user.id,
            name: user.name,
            aboutYou: user.aboutYou,
            birthday: user.birthday,
            mobileNumber: user.mobileNumber,
            email: user.email,
            country: user.country,
            createdAt: user.createdAt,
        }

        return {
            error: false,
            status: 200,
            payload: response
        };

    } catch (error) {
        throw error;
    }
}

//Update User Details
async function editUser(id, updatedData) {
    try {
        const user = await Users.findByPk(id);

        if(!user){
            return {
                error : true,
                status: 404,
                payload: "User not Found."
            }
        }

        const emailExist = await Users.findOne({
            where: {
                email: updatedData.email
            }
        })

        const mobileExist = await Users.findOne({
            where: {
                mobileNumber: updatedData.mobileNumber
            }
        })


        if(emailExist && emailExist.email != user.email) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, a user already exists with that email address!"
            }
        }

        if(mobileExist && mobileExist.mobileNumber != user.mobileNumber) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, that mobile number already exists!"
            }
        }
        
        await user.update(updatedData);


        return {
            error: false,
            status: 200,
            payload: "User Successfully Updated."
        }

    } catch (error) {
        console.log(error)
        throw error;
    }
}

//Delete User 
async function deleteUser(userID) {
    try {

        const user = await Users.findByPk(userID);

        if(!user){
            return {
                error : true,
                status: 404,
                payload: "User not Found."
            }
        }
        await Users.destroy({
            where: {
                id: userID
            }
        })

        return {
            error: false,
            status: 200,
            payload: "User Successfully Deleted."
        }

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser, 
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,   
}
