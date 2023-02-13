import { Request, Response } from "express";
import { Place } from "../model/PlaceModel";
import { AuthRequest } from "../middleware/authenticateUserMiddleware";
import CustomError, { HttpCode } from "../errors/CustomError";

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

export const getSinglePlace = async (req: Request, res: Response) => {
    const { id } = req.params;

    //find place
    const foundPlace = await Place.findById(id);

    //throw error if no place was found
    if (!foundPlace) throw new CustomError({ message: 'Place does not exist', httpCode: HttpCode.NOT_FOUND })

    res.status(200).json(foundPlace)
}

export const editPlace = async (req: Request, res: Response) => {
    const data = req.body;

    // rename to match model property name
    const { addedPhotos: photos } = data;

    // edit place
    const editedPlace = await Place.findByIdAndUpdate(data._id, { photos, ...data })

    res.status(200).json("edited place!")
}

export const getAllPlaces = async (req: Request, res: Response) => {
    const allPlaces = await Place.find();
    res.status(200).json(allPlaces)
}