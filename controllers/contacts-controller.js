import * as contactServies from '../models/contacts.js'
import HttpError from '../helpers/HttpError.js'
import {contactAddSchema, contactUpdateSchema} from "../schemas/contacts-schemas.js"
import { json } from 'express';


const getAll = async (req, res, next) => {
    try {
        const result = await contactServies.listContacts();
  res.json(result)
    } catch (error) {
       next(error)
    }
}
const getContact = async (req, res, next) => {
    try {
        const {contactId} = req.params
        const result = await contactServies.getContactById(contactId);
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
        const result = await contactServies.addContact(req.body);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactServies.removeContact(contactId);
        console.log(result)
        if (!result) {
            throw HttpError(404, 'Not found')
        }
        res.status(200).json({"message": "contact deleted"})
    } catch (error) {
        next(error);
    }
}
const update = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { contactId } = req.params
        const result = await contactServies.updateContact(contactId, req.body)
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
    update
}