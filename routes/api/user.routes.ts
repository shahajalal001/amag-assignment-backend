import userAuth from '../../auth';
import {Router} from 'express'
import {
    userLogin,
    userRegistration,
    userVerify,
} from "../../controllers/user.controller";

const userRoutes = Router()

userRoutes.post('/register', userRegistration)
userRoutes.post('/login', userLogin)
userRoutes.get('/verify', userAuth, userVerify)




export default userRoutes