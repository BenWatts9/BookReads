import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { updateBookStatus,getBookStatusById } from "../../modules/bookStatusManager";

const EditReviewForm = ({ user }) => {
    const bookStatusId = useParams().id
    const [review, setReview] = useState({
        startedOnDate: "",
        finishedOnDate: "",
        content: "",
        rating: ""
        
    })


    const navigate = useNavigate();

    useEffect(() => {
        getBookStatusById(bookStatusId)
        .then((res)=> setReview(res))
    },[])

    const handleFieldChange = (evt) => {
        const stateToChange = {...review};
        stateToChange[evt.target.id] = evt.target.value
        setReview(stateToChange)
    }

    const handleEditReview = () => {
        if(review.content !== "" && review.rating !==null)
        {
            updateBookStatus(review)
            .then(()=> {
                navigate(`/books`)
            })
        }
        else
        {
            alert("Please enter review info")
        }
    }

    return(
        <Form>
            <FormGroup>
                <Label for="startedOnDate">Started on:</Label>
                <Input
                type="date"
                name="startedOnDate"
                id="startedOnDate"
                value={review.startedOnDate}
                onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="finishedOnDate">Finished on:</Label>
                <Input
                type="date"
                name="finishedOnDate"
                id="finishedOnDate"
                value={review.finishedOnDate}
                onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content:</Label>
                <Input 
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Your review here"
                    value={review.content}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="rating">Rating:</Label>
                <Input 
                    type="text"
                    name="rating"
                    id="rating"
                    placeholder ="Number from 1-5"
                    pattern="[0-5]*"
                    value={review.rating}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <Button onClick={handleEditReview}>Submit</Button>{' '}
            <Button onClick={() => navigate("/books")}>Cancel</Button>{' '}
        </Form>
    )
}

export default EditReviewForm;