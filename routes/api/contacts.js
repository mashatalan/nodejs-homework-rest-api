const express = require('express');
const {
  getAllContacts,
  updateContact,
  getContact,
  deleteContact,
  createContact,
  updateContactFavorite,
} = require('../../controllers/contactController');

const {authenticate} = require('../../middlewares');


const router = express.Router();

router.use(authenticate);

router.get('/', getAllContacts);

router.get('/:contactId', getContact);

router.post('/', createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', updateContactFavorite);

module.exports = router;
