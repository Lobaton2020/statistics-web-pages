const { default: mongoose } = require("mongoose");

const trackingchema = new mongoose.Schema({
    idOrigin: {
        type: String,
        require: true,
        unique: true
    },
    visits:[
        {
            ip: {
                type: String,
                require: true
            },
            browser: {
                type: String,
                require: true
            },
            count:
            {
                type: Number,
                require: true
            },
            lastVisit: {
                type: Date,
                require: true
            },
            firstVisit: {
                type: Date,
                require: true
            }
        }
    ],
    interactions:[
        {
            name: String,
            count: Number
        }
    ]
});

module.exports = mongoose.model('Tracking', trackingchema);