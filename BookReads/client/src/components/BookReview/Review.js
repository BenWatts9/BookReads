import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { deleteBookStatus,} from "../../modules/bookStatusManager";


const Review = ({ review, user, getReviews}) => {
    const navigate = useNavigate();

    const handleDeleteClick = (reviewId) => {
        deleteBookStatus(reviewId)
        .then(() => {getReviews();
        })
    }

    return (
        <Card>
            <CardBody>
                {/* needs a getAuthor by Id function */}
                <p>Review By: AUTHOR</p>
                <p>{review.content}</p>
                {/* needs a way to convert int into stars */}
                <p>Rating: {review.rating}/5</p>

                {user?.id == review.userProfileId ? <Button onClick={() => handleDeleteClick(review.id)}>Delete</Button>: ""}
            </CardBody>
        </Card>
    )
}

export default Review;