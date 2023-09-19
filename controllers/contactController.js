const {contactsAddSchema} = require('../schemas');
const {HttpError} = require('../helpers');
const {
  updateContactById,
  addContact,
  listContacts,
  getContactById,
  updateStatusContact,
} = require('../repositories');


const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      return next(HttpError(404, `Contact with id ${contactId} not found`));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const {error} = contactsAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    const {contactId} = req.params;
    const result = await updateContactById(contactId, req.body);
    if (!result) {
      return next(HttpError(404, `Contact with id ${contactId} not found`));
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const {error} = contactsAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    const {name, email, phone, favorite} = req.body;
    const {_id: owner} = req.user;
    const result = await addContact(name, email, phone, favorite, owner);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);
    console.log('result', contact);
    if (!contact) {
      return next(HttpError(404, `Contact with id ${contactId} not found`));
    }
    await contact.deleteOne();
    res.json({
      message: 'Delete success',
    });
  } catch (error) {
    next(error);
  }
};

const updateContactFavorite = async (req, res, next) => {
  const {contactId} = req.params;
  const {favorite = null} = req.body || {};

  if (favorite === null) {
    return res.status(400).json({message: 'missing field favorite'});
  }

  try {
    const updatedContact = await updateStatusContact(contactId, favorite);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
};
