import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getBookStatusByBookId } from "../../modules/bookStatusManager";
import Review from "./Review";
import { Button } from "reactstrap";


const ReviewList = ({user}) => {
    const [reviews, setReviews] = useState([])
    const bookId = useParams();
    const navigate = useNavigate();

    const getReviews = () => {
        getBookStatusByBookId(bookId.id)
        .then((reviews) => setReviews(reviews)); 
    }


    useEffect(() => {
        getReviews()
    }, [])

    return (
        <>
        <p></p>
        <Button onClick={() => navigate("./CreateReview")}>Add a Review</Button>
        <p></p>
        <h3>Reviews</h3>
        <div className="reviewListContainer">
            {reviews.map((review)=> (
                <Review review={review} user={user} key={review.id} getReviews={getReviews}/>
                ))}
        </div>
        
            <Button onClick={()=>navigate('/books')}>Back to Books</Button>
        
        </>
    );
}

export default ReviewList;