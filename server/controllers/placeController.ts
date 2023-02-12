import { Request, Response } from "express";
import { Place } from "../model/PlaceModel";
import { AuthRequest } from "../middleware/authenticateUserMiddleware";

export const createPlace = async (req: AuthRequest, res: Response) => {
    // grab form data
    const data = req.body;

    // grab authenticated user info
    const user = req.userInfo

    // create new place
    const newPlace = await Place.create({ owner: user.id, ...data });

    res.status(200).json(`${newPlace.title} created!`);
}