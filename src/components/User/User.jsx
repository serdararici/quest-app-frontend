import React from "react";
import { useParams } from "react-router-dom";
import "./User.scss";
import Avatar from "../Avatar/Avatar"; 

function User() {
    const { userId } = useParams();
    return (
        <div className="user">
            <h1>User Details</h1>
            <p>This is the user page for user ID: {userId}</p>
            <Avatar />
        </div>
    );
}

export default User;