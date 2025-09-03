import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./User.scss";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { GetWithAuth } from "../../services/HttpService";
import { callWithAuth } from "../../utils/auth";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();


    const getUser = async () => {
        try {
            const response = await callWithAuth(GetWithAuth, { url: `/users/${userId}` });
            if (response.success && response.data) {
                setUser(response.data);
                console.log("User data:", response.data);
            } else if (response.error) {
                console.error("Error getting user:", response.error);
            }
        } catch (err) {
            console.error("Exception getting user:", err);
        }
    };

    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [userId]);

    return (
        <div className="user">
            {user && (
                <div className="avatar-container">
                    <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName}/>
                </div>
            )}

            {localStorage.getItem("currentUser") === userId ?  <div className="activity-container">
                <UserActivity userId={userId} />
            </div> : ""}
            
        </div>
    );
}

export default User;
