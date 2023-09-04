import { CustomError } from '../models/custom-error.model'


export const shortUrlGenerator = async (size : number = 7) : Promise<string> =>{
    try {
        const shortURL = "await nanoid(";
        return shortURL;
    } catch (error) {
        throw new CustomError("Error creating Short URL",500, 'Server Error', null);
    }
}