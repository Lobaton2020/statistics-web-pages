const Tracking = require("../models/tracking")
const Joi = require("joi")
const joiValidation = require("../joiValidation")
const { ValidationError } = require("../joiValidation");

const idSchema = Joi.object({
    id: Joi.string()
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/)
        .required()
})

module.exports = async function(req, res){
    try{
        await joiValidation(idSchema, req.params)
        const record = await Tracking.findOne({ idOrigin: req.params.id })
        if(!record){
            res.status(404).json({ message: "Opps! record by domain: "+req.params.id+" doesn't exist" })
        }
        return res.status(404).json(record)
    }catch(err){
        console.error(err)
        if( err.whatClass == ValidationError.name){
            return res.status(400).json({err: err.message || "Bad Request"})
        }
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.idSchema = idSchema;