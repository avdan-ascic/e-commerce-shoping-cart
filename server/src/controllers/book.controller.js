import Book from '../models/book.model'


const create = (req, res, next) => {
  let book = new Book(JSON.parse(req.body.book))

  book.image.contentType = req.file.mimetype
  book.image.data = req.file.buffer

  book.save()
    .then(() => res.status(200).json({ message: 'Book added successfully.' }))
    .catch(err => {
      console.log(err)
      return res.status(400).json({ error: err.message })
    })
}

const readAll = (req, res, next) => {
  Book.find({}).sort({title: 'asc'})
    .then(books => res.status(200).json({ books: books }))
    .catch(err => {
      console.log(err)
      return res.status(400).json({ error: err.message })
    })
}

const readById = (req, res, next) => {
  const id = req.params.id

  Book.findById(id)
    .then(book => res.status(200).json({ book: book }))
    .catch(err => {
      console.log(err)
      return res.status(400).json({ error: err.message })
    })
}

const readByTitle = (req, res, next) => {
  const title = req.params.title
  Book.find({ title: { $regex: title, $options: 'i' } })
    .then(books => res.status(200).json({ books: books }))
    .catch(err => {
      console.log(err)
      return res.status(400).json({ error: err.message })
    })
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    let book = await Book.findById(id)

    const bookUpdate = JSON.parse(req.body.book)
    book.title = bookUpdate.title
    book.author = bookUpdate.author
    book.price = bookUpdate.price
    book.reorderThreshold = bookUpdate.reorderThreshold
    book.stopOrder = bookUpdate.stopOrder
    book.stock = bookUpdate.stock

    if (req.file !== undefined) {
      book.image.data = req.file.buffer
      book.image.contentType = req.file.mimetype
    }

    await book.save()
    return res.status(200).json({ message: 'Book updated successfully.' })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: err.message })
  }
}

const remove = (req, res, next) => {
  const id = req.params.id

  Book.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Book deleted successfully.' }))
    .catch(err => {
      console.log(err)
      return res.status(400).json({ error: err.message })
    })
}

export default { create, readAll, readById, readByTitle, update, remove }