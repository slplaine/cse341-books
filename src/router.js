import express from 'express';

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from './controllers/books.js';

import {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/books/:id', getBookByIdHandler);

router.post('/books', createBookHandler);
router.put('/books/:id', updateBookHandler);
router.delete('/books/:id', deleteBookHandler);

router.get('/authors', getAuthorsHandler);
router.get('/authors/:id', getAuthorByIdHandler);

router.post('/authors', createAuthorHandler);
router.put('/authors/:id', updateAuthorHandler);
router.delete('/authors/:id', deleteAuthorHandler);

export default router;