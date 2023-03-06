import { Database } from 'bun:sqlite';

export interface Book {
    id?: number;
    name: string;
    author: string;
}

export class BooksDatabase {
    private db: Database;

    constructor() {
        this.db = new Database('books.db');
        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    // Get all books
    async getBooks() {
        return this.db.query('SELECT * FROM books').all();
    }

    // Get a single book by id
    async getBook(id: number) {
        return this.db.query(`SELECT * FROM books WHERE id = ${id}`).get();
    }

    // Add a book
    async addBook(book: Book) {
        // q: Get id type safely 
        return this.db.query(`INSERT INTO books (name, author) VALUES (?, ?) RETURNING id`).get(book.name, book.author) as Book;
    }

    // Update a book
    async updateBook(id: number, book: Book) {
        return this.db.run(`UPDATE books SET name = '${book.name}', author = '${book.author}' WHERE id = ${id}`)
    }

    // Delete a book
    async deleteBook(id: number) {
        return this.db.run(`DELETE FROM books WHERE id = ${id}`)
    }

    // Initialize the database
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT)');
    }
}
