import React from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";



const Book = ({ book, user }) => {
    const navigate = useNavigate();
    
    return (
        <>
        <Card style={{background: '#e4dabb', width: '20rem', margin: '.8rem', boxShadow: "-1px 1px 5px  #cac5b4"}}>
            <CardBody>
                <h4 className="text-left ">{book.title}</h4>
                <CardSubtitle className="mb-2 text-muted">Author: {book.author}</CardSubtitle>
            </CardBody>
                <img className="px-3" width="200px"  src={book.imageLocation} alt="Book Cover"/>
            <CardBody>
                <p className="text-left px-3">Genre: {book.genre}</p>
                
                    <Button onClick={()=>navigate(`/bookStatus/${book.id}`)}>Reviews </Button>{' '}
            </CardBody>
        </Card>
        </>
    )
}

export default Book;