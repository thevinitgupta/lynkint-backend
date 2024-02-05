import { CustomError } from "../models/custom-error.model";
import {nanoid} from "nanoid/async"


interface urlGenInterface {
  shortLynk : string,
  shortId : string
}


export const shortUrlGenerator = async (size: number = 7): Promise<urlGenInterface> => {
  try {
    const baseUrl = process.env.BASE_URL;
    const shortId = await nanoid(size);
    const shortLynk = `${baseUrl}/t?o=${shortId}`
   return {
    shortLynk,
    shortId
   };
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
