import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { addBookStatus } from "../../modules/bookStatusManager";

const CreateReviewForm = ({ user }) => {
    const bookId = useParams().id
    
    const emptyReview = {
        startedOnDate: "",
        finishedOnDate: "",
        content: "",
        rating: "",
        bookId: parseInt(bookId),
        userProfileId: user?.id
    };

    
    const [review, setReview]= useState(emptyReview);

    const navigate = useNavigate();

    const handleInputChange = (evt) => {
        const stateToChange = {...review};
        
        stateToChange[evt.target.id] = evt.target.value;
        setReview(stateToChange)
    }

    const handleSubmitReview = (evt) => {
        addBookStatus(review)
        .then(()=> navigate("/books"))
    }

   

    return (
        <Form>
            <FormGroup>
                <Label for="startedOnDate">started on:</Label>
                <Input
                type="date"
                name="startedOnDate"
                id="startedOnDate"
                value={review.startedOnDate}
                onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="finishedOnDate">Finished on:</Label>
                <Input
                type="date"
                name="finishedOnDate"
                id="finishedOnDate"
                value={review.finishedOnDate}
                onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                />
            </FormGroup>
            <Button onClick={handleSubmitReview}>Submit</Button>{' '}
            <Button onClick={() => navigate("/books")}>Cancel</Button>{' '}
        </Form>
    )

} 

export default CreateReviewForm;