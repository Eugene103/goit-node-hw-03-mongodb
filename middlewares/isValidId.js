import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError";

const isValidId = (req, res, next) => {
    const { contactId } = req.params
    if (!isValidObjectId(contactId)) {
        return next(HttpError(404, `${id} not valid id`))
    }
    next()
};

export default isValidId