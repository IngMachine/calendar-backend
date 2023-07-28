/*
    Rutas de Usuarios / Events
    host + /api/events
 */

const { Router } = require('express');
const {check} = require("express-validator");

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/events");

const {validateJwt} = require("../middleware/validate-jwt");
const {fieldsValidators} = require("../middleware/fields-validators");

const {isDate} = require("../helpers/isDate");

const router = Router();

// All requests must go through validateJwt
router.use( validateJwt );

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'The title is require').not().isEmpty(),
        check('start', "The start date does not comply with the format").custom( isDate ),
        check('end', "The end date does not comply with the format").custom( isDate ),
        // check('end', "The end date does not comply with the format").isISO8601().toDate(),
        fieldsValidators
    ],
    createEvent
);

router.put(
    '/:id',
    [
        check('title', 'The title is require').not().isEmpty(),
        check('start', "The start date does not comply with the format").custom( isDate ),
        check('end', "The end date does not comply with the format").custom( isDate ),
        // check('end', "The end date does not comply with the format").isISO8601().toDate(),
        fieldsValidators
    ],
    updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;