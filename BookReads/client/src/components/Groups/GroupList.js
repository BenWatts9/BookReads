import { useState, useEffect } from "react";
import { getAllUserGroups } from "../../modules/groupManager";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";

const GroupList = () => {
    const [groups, setGroups] = useState([])
    const navigate = useNavigate();
    const params = useParams()

    const getGroups = () => {
        getAllUserGroups(params.id)
        .then((res)=> setGroups(res))
    }


    useEffect(()=> {
        getGroups()
    }, [])
    
    return (
        <>
        <h3>Groups</h3>
        <div className="group-container">
            <div className="row justify-content-left">
                {groups.map((group) => (
                    <div>{group.name}</div>
                ))}
            </div>
        </div>
        
        </>
    )
}

export default GroupList