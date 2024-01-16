import  express  from "express"
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js"
import isValidId from "../../middlewares/isValidid.js";
import isEmptyFavorite from "../../middlewares/isEmpyFavorite.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:contactId',isValidId,  contactsController.getContact)

contactsRouter.post('/', isEmptyBody,  contactsController.add)

contactsRouter.delete('/:contactId',isValidId,  contactsController.remove)

contactsRouter.put('/:contactId', isEmptyBody,isValidId,  contactsController.updateStatusContact)

contactsRouter.patch('/:contactId/favorite', isEmptyFavorite, isValidId,  contactsController.updateStatusContact)

export default contactsRouter
