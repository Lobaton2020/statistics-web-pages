const { default: mongoose } = require("mongoose")

module.exports = async function(){
    try{
        const config = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        await mongoose.connect(process.env.MONGODB_URI,config)
        console.log("Mongoose connected!")
    }catch(err){
        console.error(err,"MONGOOSE-ERROR")
    }
}