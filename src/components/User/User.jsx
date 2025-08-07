import React from "react";
import { useParams } from "react-router-dom";
import "./User.scss";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";

function User() {
    const { userId } = useParams();

    return (
        <div className="user">
            <div className="avatar-container">
                <Avatar avatarId={0} />
            </div>
            <div className="activity-container">
                <UserActivity userId={userId} />
            </div>
        </div>
    );
}

export default User;
