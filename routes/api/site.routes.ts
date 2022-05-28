import {Router} from 'express'
import {
    addSite, getSite, getSites, updateSite
} from "../../controllers/site.controller"


const siteRoutes = Router()

siteRoutes.get('/', getSite)
siteRoutes.get('/all', getSites)
siteRoutes.post('/', addSite)
siteRoutes.put('/', updateSite)

export default siteRoutes