import React, { useEffect, useInsertionEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { deleteBookStatus,} from "../../modules/bookStatusManager";
import { getUserById } from "../../modules/userProfileManager";
import { getAllUserGroups } from "../../modules/groupManager";
import { addGroupToBookStatus } from "../../modules/bookStatusManager";
import { getGroupByBookStatus } from "../../modules/groupManager";

const Review = ({ review, user, getReviews}) => {
    const navigate = useNavigate();
    const [author, setAuthor] = useState({})
    const [groups, setGroups] = useState([])
    const [addedGroups, setAddedGroups] = useState([])
    let valueCheck = false

    const handleDeleteClick = (reviewId) => {
        deleteBookStatus(reviewId)
        .then(() => {getReviews()
        })
    }

    const getUser = () => {
        getUserById(review.userProfileId)
        .then((res)=> setAuthor(res))
    }
    
    const getGroups = () => {
        getAllUserGroups(user.id)
        .then((res)=> setGroups(res))
    }

    const getAddedGroups = () => {
        getGroupByBookStatus(review.id)
        .then((res)=> setAddedGroups(res))
    }
    
    const handleChange = (evt) => {
        addGroupToBookStatus(review.id, evt.target.value)
        .then(() => {getAddedGroups()
        }) 
    } 
        
    useEffect(()=> {
        getUser()
        getGroups()
        getAddedGroups()
    },[])

    return (
        <Card className="Card" style={{background: '#e4dabb', width: '25rem', margin: '.8rem', boxShadow: "-1px 1px 5px #cac5b4"}}>
            <CardBody>
                <p>Author: {author.firstName} {author.lastName}</p>
                <p>{review.content}</p>
                
                <p>Rating: {review.rating}/5</p>

                {user?.id == review.userProfileId ? <div className="groupsContainer" style={{paddingBottom: "5px"}}>
                    <div className="fw-bold">Groups</div>
                    <ListGroup className>
                    {addedGroups.map((group)=> (
                        <ListGroupItem style={{background: '#e4dabb'}}>{group.name}</ListGroupItem>
                        ))}
                    </ListGroup>
                </div>:""}

                {user?.id == review.userProfileId ? <Button onClick={() => handleDeleteClick(review.id)}>Delete</Button>: ""}{' '}
                {user?.id == review.userProfileId ? <Button onClick={() => navigate(`./EditReview/${review.id}`)}>Edit</Button>: ""}{' '}
                <label>    
                {user?.id == review.userProfileId ? 
                    <select style={{background: '#e4dabb'}} onChange={handleChange}>
                        <option  value=''>
                            --Add to group--</option>
                        {groups.map((group)=>(
                            <>
                            <option value={group.id} key={group.id}>{group.name}</option>
                            </>
                        ))}
                    </select>
                :" "}
                </label>
            </CardBody>
        </Card>
    )
}

export default Review;