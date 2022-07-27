import React, {useState, useEffect} from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addGroupToBookStatus } from "../../modules/bookStatusManager";
import { getAllBooks } from "../../modules/bookManager";
import { getBookStatusByUserProfileId } from "../../modules/bookStatusManager";


const AddGroupToBookStatus = () => {
    
    const [books, setBooks] = useState([])
    const [value, setValue] = useState()
    const [bookStatus, setBookStatus] = useState([])
    const [selectedBook, setSelectedBook] = useState()
    const [valueCheck, setValueCheck] = (false)

    const getBooks = () => {
        getAllBooks().then((res)=> setBooks(res))
    }

    const getBookStatus = () => {
        getBookStatusByUserProfileId().then((res)=> setBookStatus(res))
    }

    const handleChange = (evt) => {
        setValue(evt.target.value)
    }
    //Check if current selected books id is equal to bookStatusId 
    //if equal find the book id
    //add BookStatusGroup that equals the selected values

    useEffect(()=> {
        getBooks()
        getBookStatus()
    }, [])
    
    return (
        <div>
            <label>
            Choose a book
                <select value={value} onChange={handleChange}> 
                {books.map((book)=>(
                    <>
                    <option value={book.id} key={book.id}>{book.title}</option>
                    </>
                ))}
                </select>
            </label>
        </div>
        
    )
}

export default AddGroupToBookStatus