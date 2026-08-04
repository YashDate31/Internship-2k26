import React from "react";
import { useParams } from "react-router-dom";

function EditUser() {
    const { id } = useParams();

    return (
        <div>
            <h2>Edit User</h2>
            <p>Editing user with ID: {id}</p>
        </div>
    );
}

export default EditUser;
