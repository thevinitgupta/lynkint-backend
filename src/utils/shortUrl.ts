import { CustomError } from "../models/custom-error.model";
import {nanoid} from "nanoid/async"


export const shortUrlGenerator = async (size: number = 7): Promise<string> => {
  try {
    const baseUrl = process.env.BASE_URL;
    const shortUrl = await nanoid(size);
   return `${baseUrl}/${shortUrl}`;
  } catch (error) {
    console.log(error);
    throw new CustomError(
      "Error creating Short URL",
      500,
      "Server Error",
      null
    );
  }
};
