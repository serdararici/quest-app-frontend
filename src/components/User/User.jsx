import React from "react";
import { useParams } from "react-router-dom";
import "./User.scss";

function User() {
    const { userId } = useParams();
    return (
        <div className="user">
            <h1>User Details</h1>
            <p>This is the user page for user ID: {userId}</p>
            <p>Here you can display more information about the user.</p>
        </div>
    );
}

export default User;