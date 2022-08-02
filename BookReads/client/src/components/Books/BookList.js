import { useState, useEffect } from "react";
import { getAllBooks } from "../../modules/bookManager";
import Book from "./Book";
import "./SearchBar.css"

const BookList = ({user}) => {
    const [books, setBooks] = useState([]);
    const [inputText, setInputText] = useState("");

    const getBooks = () => {
        getAllBooks()
        .then(books => setBooks(books))
    }

    const searchBooks = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase)
    }
        
    const SearchList = (props) => {
        const filteredData = books.filter((el) => {
            if (props.input === '')
            {
                return el;
            }
            else {
                return el.title.toLowerCase().includes(props.input)
            }
        })
        
        return (
            
            <div className="row justify-content-left">
                {filteredData.map((book) => (
                    <Book book={book} key={book.id} user={user}/>
                ))}
            </div>
        )
    }
    

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
        <h3 style={{marginLeft: "19px", padding:"10px"}}>Books</h3>
        <div className="search">
            <input className="searchBar" 
                    id="outlined-basic"
                    variant="outlined"
                    label="Search Books" 
                    placeholder="Search Books"
                    onChange={searchBooks}/>
        </div>
        <div>
            <SearchList input={inputText} />
        </div>
        </>
    )
}

export default BookList;