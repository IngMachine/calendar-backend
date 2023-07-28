const {request, response, json} = require('express');
const Event = require('../models/Event');

const getEvents = async(req = request, res = response) => {

    const events = await Event.find()
                                .populate('user', 'name');

    return res.json({
        ok: true,
        msg: events
    })
}

const createEvent = async(req = request, res = response) => {

    const event = new Event( req.body );

    try {
        event.user = req.uid;
        const eventSave =await event.save();

        res.status(200).json({
            ok: true,
            event: eventSave
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }
}

const updateEvent = async(req = request, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found for these id'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have editing privileges for this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate( eventId, newEvent,{
            new: true
        } );

        return res.status(200).json({
            ok: true,
            event: eventUpdate
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }
}
const deleteEvent = async(req = request, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found for these id'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have editing privileges for this event'
            })
        }

        const eventDelete = await Event.findByIdAndRemove( eventId );

        return res.status(200).json({
            ok: true,
            eventDelete
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}