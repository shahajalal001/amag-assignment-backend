import {Router} from 'express'
import userRoutes from "./api/user.routes";
import siteRoutes from "./api/site.routes";

import userAuth from "../auth"

const apiRoutes = Router()
apiRoutes.use('/user', userRoutes)
apiRoutes.use('/site', userAuth, siteRoutes)

export default apiRoutes