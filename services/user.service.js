const { Users } = require("../models");
const { Op, Sequelize } = require("sequelize");

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

//Get All Users with Filtering and Pagination
async function getAllUsers(filters = {}, pagination = {}) {
    try {
        const {
            name,
            email,
            country,
            fromDate,
            toDate,
            search
        } = filters;

        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'DESC'
        } = pagination;

        // Build where conditions
        const whereConditions = {};

        // Name filter (partial match, case insensitive using LOWER function)
        if (name) {
            whereConditions[Op.and] = whereConditions[Op.and] || [];
            whereConditions[Op.and].push(
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('name')),
                    'LIKE',
                    `%${name.toLowerCase()}%`
                )
            );
        }

        // Email filter (partial match, case insensitive using LOWER function)
        if (email) {
            whereConditions[Op.and] = whereConditions[Op.and] || [];
            whereConditions[Op.and].push(
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('email')),
                    'LIKE',
                    `%${email.toLowerCase()}%`
                )
            );
        }

        // Country filter (exact match, case insensitive using LOWER function)
        if (country) {
            whereConditions[Op.and] = whereConditions[Op.and] || [];
            whereConditions[Op.and].push(
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('country')),
                    'LIKE',
                    `${country.toLowerCase()}`
                )
            );
        }

        // Date range filter (created between dates)
        if (fromDate && toDate) {
            whereConditions.createdAt = {
                [Op.between]: [new Date(fromDate), new Date(toDate)]
            };
        } else if (fromDate) {
            whereConditions.createdAt = {
                [Op.gte]: new Date(fromDate)
            };
        } else if (toDate) {
            whereConditions.createdAt = {
                [Op.lte]: new Date(toDate)
            };
        }

        // Global search (searches in name, email, aboutYou, and country)
        if (search) {
            const searchLower = search.toLowerCase();
            whereConditions[Op.or] = [
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('name')),
                    'LIKE',
                    `%${searchLower}%`
                ),
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('email')),
                    'LIKE',
                    `%${searchLower}%`
                ),
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('aboutYou')),
                    'LIKE',
                    `%${searchLower}%`
                ),
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('country')),
                    'LIKE',
                    `%${searchLower}%`
                )
            ];
        }

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Valid sort columns
        const validSortColumns = ['id', 'name', 'email', 'country', 'createdAt', 'birthday'];
        const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'createdAt';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Get users with count
        const { count, rows: listOfUsers } = await Users.findAndCountAll({
            where: whereConditions,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortColumn, order]],
            distinct: true
        });

        // Format user response
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
        });

        // Calculate pagination info
        const totalPages = Math.ceil(count / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return {
            users: userResponse,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: count,
                itemsPerPage: parseInt(limit),
                hasNextPage,
                hasPrevPage,
                nextPage: hasNextPage ? parseInt(page) + 1 : null,
                prevPage: hasPrevPage ? parseInt(page) - 1 : null
            },
            filters: filters
        };

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
                email: updatedData.email,
                id: { [Op.ne]: id } // Exclude current user from check
            }
        });

        if (emailExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, a user already exists with that email address!"
            };
        }

        const mobileExist = await Users.findOne({
            where: {
                mobileNumber: updatedData.mobileNumber,
                id: { [Op.ne]: id } // Exclude current user from check
            }
        });

        if (mobileExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, a user already exists with that mobile number!"
            };
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