import express from "express";

import {
createEvent,
getAllEvents,
getEventById,
updateEvent,
deleteEvent
} from "./event.controller.js";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";

import {
createEventValidator,
validate
} from "./event.validator.js";

import upload from "../../middleware/upload.middleware.js";

const router=express.Router();

router
.route("/")
.get(getAllEvents)
.post(
    protect,
    authorize("admin","organizer"),
    upload.single("banner"),
    createEventValidator,
    validate,
    createEvent
    );

router
.route("/:id")
.get(getEventById)
.put(
    protect,
    authorize("admin","organizer"),
    upload.single("banner"),
    updateEvent
    )
.delete(
protect,
authorize("admin"),
deleteEvent
);

export default router;