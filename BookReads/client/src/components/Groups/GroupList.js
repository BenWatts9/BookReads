import { useState, useEffect } from "react";
import { getAllUserGroups } from "../../modules/groupManager";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Group from "./Group";


const GroupList = ( user, book ) => {
    const [groups, setGroups] = useState([])
    const navigate = useNavigate();
    const params = useParams()



    const getGroups = () => {
        getAllUserGroups(params.id)
        .then((groups)=> setGroups(groups))
    }

    useEffect(()=> {
        getGroups()
    }, [])
    
    return (
        <>
        <Button>Add a group</Button>
        <h3>Groups</h3>
        <div className="group-container">
            <div className="row justify-content-left">
                {groups.map((group) => (
                    <Group group={group} key={group.id} user={user} book={book}/>
                ))}
            </div>
        </div>
        
        </>
    )
}

export default GroupList