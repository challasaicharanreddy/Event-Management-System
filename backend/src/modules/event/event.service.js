import Event from "../../models/Event.js";
import slugify from "slugify";
import ApiError from "../../utils/ApiError.js";

export const createEvent = async (data, userId) => {

    if(new Date(data.endDateTime) <= new Date(data.startDateTime)){
        throw new ApiError(400,"End time must be after start time");
    }

    const slug = slugify(data.title,{
        lower:true,
        strict:true
    });

    const event = await Event.create({
        ...data,
        slug,
        createdBy:userId
    });

    return event;
};

export const getAllEvents = async () => {
    return await Event.find().populate("createdBy","name email");
};

export const getEventById = async(id)=>{
    const event=await Event.findById(id).populate("createdBy","name");

    if(!event){
        throw new ApiError(404,"Event not found");
    }

    return event;
};

export const updateEvent=async(id,data)=>{

    const event=await Event.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true
    });

    if(!event){
        throw new ApiError(404,"Event not found");
    }

    return event;
};

export const deleteEvent=async(id)=>{

    const event=await Event.findByIdAndDelete(id);

    if(!event){
        throw new ApiError(404,"Event not found");
    }
};