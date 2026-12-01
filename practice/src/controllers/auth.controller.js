import userModel from '../models/user.model'

/**
 * @route POST auth/api/create-user
 * @description Create a new user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createTestUser(req, res, next) {
    try {
        const { username, email, password } = req.body
        const isUserAlreadyExists = await userModel.findOne({ email })
        if (isUserAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const user = await userModel.create({
            username,
            email,
            password
        })
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user
        })
    } catch (error) {
        next(error)
    }
}


/**
 * @route GET auth/api/:id
 * @description Get user by id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getUserById(req, res, next) {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        return res.status(200).json({
            success: true,
            message: 'User found',
            user
        })
    } catch (error) {
        next(error)
    }
}