import { useState, useEffect } from "react";
import { getAllBooks } from "../../modules/bookManager";
import Book from "./Book";

const BookList = ({user}) => {
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
        <div className="book-container">
            <div className="row justify-content-left">
                {books.map((book) => (
                    <Book book={book} key={book.id} user={user}/>
                ))}
            </div>
        </div>
        </>
    )
}

export default BookList;