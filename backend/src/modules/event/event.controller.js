import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as eventService from "./event.service.js";

export const createEvent=asyncHandler(async(req,res)=>{

    const event = await eventService.createEvent(
        req.body,
        req.user._id,
        req.file
    );

    res.status(201).json(
        new ApiResponse(201,"Event created successfully",event)
    );
});

export const getAllEvents=asyncHandler(async(req,res)=>{

    const events=await eventService.getAllEvents();

    res.json(
        new ApiResponse(200,"Events fetched",events)
    );
});

export const getEventById=asyncHandler(async(req,res)=>{

    const event=await eventService.getEventById(req.params.id);

    res.json(
        new ApiResponse(200,"Event fetched",event)
    );
});

export const updateEvent=asyncHandler(async(req,res)=>{

    const event = await eventService.updateEvent(
        req.params.id,
        req.body,
        req.file
    );

    res.json(
        new ApiResponse(200,"Event updated",event)
    );
});

export const deleteEvent=asyncHandler(async(req,res)=>{

    await eventService.deleteEvent(req.params.id);

    res.json(
        new ApiResponse(200,"Event deleted")
    );
});