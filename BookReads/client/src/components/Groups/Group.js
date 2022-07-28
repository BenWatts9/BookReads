import React, {useState, useEffect} from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBooks } from "../../modules/bookManager";
import { addGroupToBookStatus, getBookStatusByUserProfileId,getBooksByGroup } from "../../modules/bookStatusManager";

const Group = ( {group} ) => {
    
    const [books, setBooks] = useState([])
    const [bookStatus, setBookStatus] = useState([])
    const [groupBooks, setGroupBooks] = useState([])
    const [addedBooks, setAddedBooks] = useState ([])
    const params = useParams()
    const userId = parseInt(params.id)
    let valueCheck = false
    
    const getBooks = () => {
        getAllBooks().then((res)=> setBooks(res))
    }

    const getGroupBooks = () => {
        getBooksByGroup(parseInt(group.id))
        .then((res)=> setGroupBooks(res))
        .then((res)=> setAddedBooks(res))
    }

    const getBookStatus = () => {
        getBookStatusByUserProfileId(params.id).then((res)=> setBookStatus(res))
    }
    
    const handleChange = (evt) => {
        let i = 0
        while(!valueCheck)
        {
            
            if(parseInt(evt.target.value) === bookStatus[i].bookId && bookStatus[i].userProfileId === userId)
            {

                    addGroupToBookStatus(bookStatus[i].id, group.id)
                    valueCheck = true
                    getGroupBooks()
            }
            i++
        } 
        valueCheck = false
    }

    
    useEffect(()=> {
        getBooks()
        getBookStatus()
        getGroupBooks()
    }, [])
    

    return (
        <Card>
            <CardBody>
                <h4>{group.name}</h4>
                <div>
                    {groupBooks.map((groupBook)=>(
                        <p key={groupBook.id}>{groupBook.title}</p>
                    ))}
                </div>
                <div>
            <label>
            
                <select onChange={handleChange}>
                    <option  value=''>
                        --Choose a book--</option>
                {books.map((book)=>(
                    <>
                    <option value={book.id} key={book.id}>{book.title}</option>
                    </>
                ))}
                </select>
            </label>
        </div>
            </CardBody>
        </Card>
    )
}

export default Group