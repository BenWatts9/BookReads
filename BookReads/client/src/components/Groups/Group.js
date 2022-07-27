import React from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const Group = ( {group, user, book} ) => {
    const navigate = useNavigate()
    const params = useParams()
    return (
        <Card>
            <CardBody>
                <div>{group.name}</div>
                <Button onClick={()=> navigate(`/groups/${params.id}/AddBookToGroup`)}>Add Book</Button>
            </CardBody>
        </Card>
    )
}

export default Group