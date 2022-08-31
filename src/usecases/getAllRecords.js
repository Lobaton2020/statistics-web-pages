const Tracking = require("../models/tracking")


module.exports = async function(req, res){
    try{
        const limit = 1000;
        const records = await Tracking.find().limit();
        return res.status(404).json({limit, records})
    }catch(err){
        console.error(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
