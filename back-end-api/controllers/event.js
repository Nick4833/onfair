const Event = require("../models/Event");
const User = require("../models/User");

exports.createEvent = async(req, res) => {
    const imageName = req.file.filename;
    const {userId, name, date, link, desc, apply, aim} = req.body;

    const newEvent = new Event ({
        name : name,
        image: imageName,
        date: date,
        link: link,
        desc: desc,
        apply: apply,
        aim: aim,
        creator: userId
    })

    newEvent.save()
    return res.status(200).json({
        success: true,
        event: newEvent,
    });
}

exports.showEvents = async(req, res) => {
    const events = await Event.find({})
    return res.status(200).json({
        success: true,
        events: events,
    });
}

exports.eventDetail = async(req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);
    return res.status(200).json({
        success: true,
        event: event,
    });
}

exports.getJoinedEvents = async(req, res) => {
    const ids = req.body.ids;
    const events = await Event.find({ '_id': { $in: ids } });
    return res.status(200).json({
        success: true,
        events: events,
    });
}

exports.createdEvents = async(req, res) => {
    const userId = req.body.userId;
    console.log(userId)
    if(userId){
    const events = await Event.find({creator: userId});
    return res.status(200).json({
        success: true,
        events: events,
    });
} else {
    return res.status(500).json({
        error: "User not found"
    })
}
}


exports.searchEvents = async(req, res) => {
    const name = req.body.name;
    const events = await Event.find({name: new RegExp('^'+name+'$', "i")})
    return res.status(200).json({
        success: true,
        events: events,
    });
}

exports.updateEventUser = async(req, res) => {
    const {event_id, user_id} = req.body;
    try{
    const found = await User.findById(user_id);
    const foundEvent = await Event.findById(event_id);
    found.fairs.push(event_id);
    found.save()
    return res.status(200).json({
        success: true,
        message: "Event added to user"
    });
} catch(error) {
    return res.status(500).json({
        success: false,
        error: error
    });
}
}

exports.decreaseEventUser = async(req, res) => {
    const {event_id, user_id} = req.body;
    const found = await User.findById(user_id);
    const index = found.fairs.indexOf(event_id)
    if(index > -1) {
        found.fairs.splice(index, 1)
    }
    found.save()
    return res.status(200).json({
        success: true,
        message: "Event removed to user"
    });
}