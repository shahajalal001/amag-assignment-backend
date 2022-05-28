import jwt from 'jsonwebtoken'
const secret = process.env.SECRET

const userAuth = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        res.locals.user = jwt.verify(token, secret)
        next()
    } catch (err) {
        return res.status(404).json({
            error: true,
            msg: 'User not found'
        })
    }
}
export default userAuth