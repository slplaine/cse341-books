import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists,
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const createBookHandler = async (req, res) => {
  const { id, authorId, title, publicationDate } = req.body;

  try {
    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'Missing required book fields',
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'Book id already exists',
      });
    }

    const authorFound = await authorExists(authorId);

    if (!authorFound) {
      return res.status(400).json({
        message: 'Invalid authorId',
      });
    }

    const book = await createBook({
      id,
      authorId,
      title,
      publicationDate,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
const updateBookHandler = async (req, res) => {
  const { id } = req.params;
  const { authorId, title, publicationDate } = req.body;

  try {
    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'Missing required book fields',
      });
    }

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    const authorFound = await authorExists(authorId);

    if (!authorFound) {
      return res.status(400).json({
        message: 'Invalid authorId',
      });
    }

    const updatedBook = await updateBook(id, {
      authorId,
      title,
      publicationDate,
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
const deleteBookHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    await deleteBook(id);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export { 
  getBooksHandler, 
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};