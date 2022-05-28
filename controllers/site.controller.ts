import Site from '../models/site.model'
import AuditLog from '../models/audit_log.model'
import mongoose from 'mongoose'

export const addSite = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        let {body} = req
        let site = new Site({
            name: body.name,
            city: body.city,
            description: body.description,
            lat: +body.lat,
            lng: +body.lng,
            created_by: res.locals.user._id,
        })
        let newSite = await site.save({session})

        let auditLog = new AuditLog({
            action: 'add',
            site: newSite._id,
            new_data: body,
            user: res.locals.user._id
        })
        await auditLog.save({session})
        
        await session.commitTransaction();

        return res.status(200).send({
            error: false,
            msg: 'Successfully added',
            data: newSite
        })
    } catch (e) {
        await session.abortTransaction()
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    } finally {
        await session.endSession()
    }
}

export const updateSite = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let {body} = req
        let previousData = await Site.findById(body._id)
        await Site.updateOne({_id: body._id}, body, {session})
        let auditLog = new AuditLog({
            action: 'update',
            site: body._id,
            old_data: previousData,
            new_data: body,
            user: res.locals.user._id
        })
        await auditLog.save({session})
        
        await session.commitTransaction();

        return res.status(200).send({
            error: false,
            msg: 'Successfully updated',
        })
    } catch (e) {
        await session.abortTransaction()
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    } finally {
        await session.endSession()
    }
}

export const getSite = async (req, res) => {

    try {
        let {query} = req
        let site = await Site.findById(query._id)
        let logs = await AuditLog.find({site: query._id}).populate('user').sort({createdAt: 1})
        return res.status(200).send({
            error: false,
            msg: 'Successfully get site',
            data: {
                ...site._doc,
                logs
            }
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

export const getSites = async (req, res) => {

    try {
        let sites = await Site.find()
        return res.status(200).send({
            error: false,
            msg: 'Successfully get sites',
            data: sites
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}
