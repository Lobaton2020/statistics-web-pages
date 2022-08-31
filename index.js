const connectMongoose = require("./src/connectMongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/router");

function startApp() {
    return new Promise(resolve => {
        const app = express();
        app.use(express.json())
        app.use(cors())
        app.use(router)
        app.use('', (req, res) => {
            res.json({
                message: "Welcome to this API, for more info check GiTHIB Lobaton2020"
            })
        })
        app.listen(8080, () => {
            resolve(true)
            console.log("App running in port: 8080")
        })
    })
}




async function bootstrap() {
    await connectMongoose()
    await startApp()
}

bootstrap()