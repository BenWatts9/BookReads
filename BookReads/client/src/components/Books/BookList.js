import { useState, useEffect } from "react";
import { getAllBooks } from "../../modules/bookManager";
import Book from "./Book";

const BookList = () => {
    const [books, setBooks] = useState([]);

    const getBooks = () => {
        getAllBooks()
        .then(books => setBooks(books))
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
        <h3>Books</h3>
        <div className="tag-container">
            <div className="row justify-content-left">
                {books.map((book) => (
                    <Book book={book} key={book.id} />
                ))}
            </div>
        </div>
        </>
    )
}

export default BookList;