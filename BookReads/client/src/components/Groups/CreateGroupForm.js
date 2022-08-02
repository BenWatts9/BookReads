import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { addGroup } from "../../modules/groupManager";

const CreateGroupForm = ({user}) => {
    
    const [group, setGroup]=useState({
        name:"",
        userProfileId: user?.id
    })
    const navigate = useNavigate()

    const handleFieldChange = (evt) => {
        const newGroup = {...group}
        let selectedVal = evt.target.value
        newGroup[evt.target.id] = selectedVal
        setGroup(newGroup)
    }

    const handleSaveClick = (evt) => {
        evt.preventDefault();
        addGroup(group)
        .then(()=> navigate(`/books`))
    }
    
    return (
        <div className="groupFormContainer">
            <Form className="groupForm">
                <h3>Add a Group!</h3>
                <FormGroup>
                <Label for="name">Group Name:</Label>
                <Input 
                    type="text"
                    name="name"
                    id="name"
                    value={group.name}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <Button onClick={handleSaveClick}>Submit</Button>{' '}
            <Button onClick={() => navigate("/books")}>Cancel</Button>{' '}
            </Form>
        </div>
    )
}

export default CreateGroupForm