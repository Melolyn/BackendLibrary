import Book from '../BookModel.js';

// Get all books
export async function getBooks(req, res) {
    try {
        const { query } = req; // Example of using the query parameter from req
        const books = await Book.find(query);  // Use query parameters to filter books if needed
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Add a new book
export async function addBook(req, res) {
    const { title, author, price, rentalPrice, type } = req.body;
    try {
        const newBook = new Book({ title, author, price, rentalPrice, type });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Update a book
export async function updateBook(req, res) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete a book
export async function deleteBook(req, res) {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
