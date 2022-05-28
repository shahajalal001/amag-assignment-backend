import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const secret = process.env.SECRET

export const userRegistration = async (req, res) => {
    try {
        let {body} = req
        let user = new User({
            name: body.name,
            email: body.email.toLowerCase(),
            password: bcrypt.hashSync(body.password, 8),
        })
        await user.save()
        let token = jwt.sign({_id: user._id, role: user.role}, secret, {expiresIn: '8h'})
        return res.status(200).send({
            error: false,
            msg: 'Successfully registered',
            token,
        })
    } catch (e) {
        if (e?.code === 11000) {
            return res.status(406).send({
                error: true,
                msg: 'Email already exists',
            })
        }
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        let {body} = req
        const user = await User.findOne({email: body.email.toLowerCase()})
        if (user) {
            let auth = await bcrypt.compare(body.password, user.password)
            if (auth) {
                let token = jwt.sign({_id: user._id}, secret, {expiresIn: '8h'})
                return res.status(200).send({
                    error: false,
                    msg: 'Login successful',
                    token,
                })
            } else {
                return res.status(401).send({
                    error: true,
                    msg: 'Invalid password'
                })
            }
        }
        return res.status(404).json({
            error: true,
            msg: 'User not found'
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

export const userVerify = async (req, res) => {
    try {
        if (res.locals?.user?._id) {
            let user = await User.findById(res.locals?.user?._id, ['name', 'email'])
            if (user) {
                return res.status(200).send({
                    error: false,
                    msg: 'Successfully verified',
                    data: user,
                })
            }
        }
        res.status(404).json({
            error: true,
            msg: 'User not found'
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}