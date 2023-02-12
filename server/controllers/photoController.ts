import { Request, Response } from "express";
import download from 'image-downloader'
import path from 'path'
import fs from 'fs'

export const uploadPhotoByLink = async (req: Request, res: Response) => {
    // get the photo link from req
    const { photoLink } = req.body

    // create name for photo
    const newName = Date.now() + '.jpg';

    const rootPath = path.join(__dirname, '..')

    // download given image from link and add to uploads dir
    const downloadedPhoto = await download.image({
        url: photoLink,
        dest: rootPath + "/uploads" + "/" + newName
    });

    // send new photo url back to client
    res.status(200).json(newName)
}

export const uploadPhotoByFile = async (req: Request, res: Response) => {
    let file;

    if (req.files && req.files.length as number > 0) {
        /* @ts-ignore */
        file = req.files[0];
        const { path, originalname } = file
        const extension = originalname?.split('.')[1];
        file = path.replace('uploads\\', '') + '.' + extension
        fs.renameSync(path, path + '.' + extension)
    }
    res.status(200).json(file)
}