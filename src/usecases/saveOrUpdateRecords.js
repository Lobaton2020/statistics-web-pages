const Joi = require("joi")
const joiValidation = require("../joiValidation")
const { ValidationError } = require("../joiValidation")
const Tracking = require("../models/tracking")
const { idSchema } = require("./getRecords")

const bodySchema = Joi.object({
    interactions: Joi.array().items({
        name: Joi.string()
    })
})

function buildVisitRecord(req) {
    return {
        ip: req.connection?.remoteAddress || '',
        browser: req.headers["user-agent"],
        count: 1,
        lastVisit: new Date(),
        firstVisit: new Date()
    }
}

async function processAlreadyRecordExists(record, body, req) {
    const handleMapVisitRecords = (item) => {
        if (item.ip == req.connection?.remoteAddress) {
            item.count++;
            item.lastVisit = new Date();
        }
        return item
    }
    const handleMapVisitItemsInteractions = (item, name) => {
        if (item.name == name) {
            item.count++;
        }
        return item
    }

    // parte de la ip
    const repeatedRecord = record.visits.find((item) => item.ip == req.connection?.remoteAddress);
    if (repeatedRecord) {
        record.visits = record.visits.map(handleMapVisitRecords)
    } else {
        record.visits.push(buildVisitRecord(req))
    }

    // parte de las interacciones
    if (Object.keys(body).length > 0) {
        body.interactions.forEach(({ name }) => {
            const repeatedItem = record.interactions.find(item => item.name == name)
            if (repeatedItem) {
                record.interactions = record.interactions.map((item) => handleMapVisitItemsInteractions(item, name))
            } else {
                record.interactions.push({ name, count: 1 })
            }
        })
    }
    delete record.idOrigin
    return record
}


module.exports = async function (req, res) {
    try {
        await joiValidation(idSchema, req.params)
        await joiValidation(bodySchema, req.body)
        const record = await Tracking.findOne({ idOrigin: req.params.id })
        if (!record) {
            const newTracking = new Tracking({
                idOrigin: req.params.id,
                visits: [buildVisitRecord(req)]
            });
            if (Object.keys(req.body).length > 0) {
                req.body.interactions = req.body.interactions.map(({ name }) => ({ name, count: 1 }))
                newTracking.interactions = req.body.interactions
            }
            await newTracking.save()
            return res.status(201).json(newTracking)
        }
        const updatedRecord = await processAlreadyRecordExists(record, req.body, req)
        await Tracking.findOneAndUpdate({ idOrigin: req.params.id }, updatedRecord)
        return res.status(404).json(record)
    } catch (err) {
        console.error(err)
        if (err.whatClass == ValidationError.name) {
            return res.status(400).json({ err: err.message || "Bad Request" })
        }
        return res.status(500).json({ message: "Internal Server Error" })
    }
}