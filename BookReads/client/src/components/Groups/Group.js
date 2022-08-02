import React, {useState, useEffect} from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBooks } from "../../modules/bookManager";
import { addGroupToBookStatus, getBookStatusByUserProfileId,getBooksByGroup } from "../../modules/bookStatusManager";
import { deleteGroup } from "../../modules/groupManager";

const Group = ( {group, getGroups} ) => {
    
    const [books, setBooks] = useState([])

    const params = useParams()
    const userId = parseInt(params.id)
    let valueCheck = false
    
   

    const handleDeleteClick = (groupId) => {
        deleteGroup(groupId)
        .then(() => {getGroups()
        })
    }
 

    return (
        <Card className="Card" style={{background: '#e4dabb', width: '20rem', margin: '.8rem', boxShadow: "-1px 1px 5px #cac5b4"}}>
            <CardBody>
                <h5>{group.name}</h5>
        <p></p>
        <Button onClick={() => handleDeleteClick(group.id)}>Delete</Button>{' '}
            </CardBody>
        </Card>
    )
}

export default Group