import  express  from "express"
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js"
import isValidid from "../../middlewares/isValidid.js";
import isEmptyFavorite from "../../middlewares/isEmpyFavorite.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:contactId', isValidid,  contactsController.getContact)

contactsRouter.post('/', isEmptyBody,  contactsController.add)

contactsRouter.delete('/:contactId', isValidid,  contactsController.remove)

contactsRouter.put('/:contactId', isEmptyBody, isValidid,  contactsController.updateStatusContact)

contactsRouter.patch('/:contactId/favorite', isEmptyFavorite, isValidid,  contactsController.updateStatusContact)

export default contactsRouter
