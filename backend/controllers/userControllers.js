
const User = require('../models/user');
const utils = require('../lib/utils');

/**
 * Controllers for user route
 * @module user-controllers
 */

/**
 * -------------- POST /users --------------
 */
/**
 * Create a new user
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 * @returns {Promise<Object>} - Store a new user object in the database
 */
const createUser = async (req, res) => {
    const { firstName, lastName, email, role, password } = req.body;

    const registeredEmail = await User.findOne({ email: email });
    if (registeredEmail) return res.status(400).json({ message: 'This email is already registered!' });

    const hashedPassword = await utils.genPassword(password);

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        password: hashedPassword
    });

    try {
        newUser.save()
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * -------------- GET /users/:id --------------
 */
/**
 * Get a user by id
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const getUserById = async (req, res) => {
    const userToFind = await User.findById(req.params.id).select('-password');
    const userLoggedIn = req.user._id.toString();

    try {
        // Managers can view all users
        const manager = req.user.role === 'manager';
        if (manager) return res.status(200).json(userToFind);

        // Users can only view their own profile
        if (userToFind.id !== userLoggedIn) return res.status(401).json({ message: 'Unauthorized' })
        res.status(200).json(userToFind);
    } catch (error) {
        res.status(500).json({ message: error });
    }

    try {
        return res.status(200).send(userToFind);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * -------------- GET /users --------------
 */
/**
 * Get all users
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * -------------- PUT /users/:id --------------
 */
/**
 * Update a user by id
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const updateUserById = async (req, res) => {

    try {
        // Managers can edit all user field exept password
        const manager = req.user.role === 'manager';

        const user = await User.findById(req.params.id);
        const { firstName, lastName, role, email } = req.body;

        if (manager) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.role = role;

            await user.save();
            res.status(200).json(`${user.firstName} have been updated!`);
        } else {
            user.firstName = firstName;
            user.lastName = lastName;

            await user.save();
            res.status(200).json(`${user.firstName} have been updated!`);
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * -------------- DELETE /users/:id --------------
 */
/**
 * Delete a user by id
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const deleteUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    try {
        user.remove();
        res.status(200).json({ message: `${user.firstName} ${user.lastName} has been deleted!` })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById
};