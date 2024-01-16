import HttpError from '../helpers/HttpError.js'
import {contactAddSchema, contactUpdateSchema, favoriteUpdateSchema} from "../models/Contact.js"
import Contact from '../models/Contact.js';

const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find({}, "name email phone favorite");
  res.json(result)
    } catch (error) {
       next(error)
    }
}
const getContact = async (req, res, next) => {
    try {
        const {contactId} = req.params
        const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, `Not found`)
        }

    res.json(result)
    } catch (error) {
        next(error)
    }
}
const add = async (req, res, next) => {
    try {
        const {error} = contactAddSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const result = await Contact.create(req.body);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw HttpError(404, 'Not found')
        }
        res.status(200).json({"message": "contact deleted"})
    } catch (error) {
        next(error);
    }
}
const updateStatusContact = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { contactId } = req.params
        const result = await Contact.findByIdAndUpdate(contactId, req.body)
         if (!result) {
            throw HttpError(404, 'Not found')
        }
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}
export default {
    getAll,
    getContact,
    add,
    remove,
    updateStatusContact
}