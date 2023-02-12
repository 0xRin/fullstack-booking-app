import { Request, Response } from "express";
import { Place } from "../model/PlaceModel";
import { AuthRequest } from "../middleware/authenticateUserMiddleware";

export const createPlace = async (req: AuthRequest, res: Response) => {
    // grab form data
    const data = req.body;
    // rename to match model property name
    const { addedPhotos: photos } = data;

    // grab authenticated user info
    const user = req.userInfo

    // create new place
    const newPlace = await Place.create({ owner: user.id, photos, ...data });

    res.status(200).json(`${newPlace.title} created!`);
}

export const getUserPlaces = async (req: AuthRequest, res: Response) => {
    // grab authenticated user info
    const user = req.userInfo

    // get all places that were made by given owner
    const myPlaces = await Place.find({ owner: user.id })

    res.status(200).json(myPlaces);
}