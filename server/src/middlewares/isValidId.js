import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";

export const isValidId = (resourceName) => (req, _, next) => {
    if (!isValidObjectId(req.params.id)) {
        throw new ApiError(
            404,
            `The ID which you have trying access for ${resourceName} might be invalid or does not exist in database. If problem persist again you can connect with support team for feature guidance`
        )
    }
    next();
}

 