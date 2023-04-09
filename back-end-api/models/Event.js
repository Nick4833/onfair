const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    apply: {
        type: String,
        required: true
    },
    aim: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
    

})

module.exports = mongoose.model("Event", eventSchema)