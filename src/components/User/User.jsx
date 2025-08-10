import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./User.scss";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();

    const getUser = () => {
        fetch("/users/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("HTTP error! status: " + res.status);
            }
            return res.json();
        })
        .then((data) => {
            console.log("User data:", data);
            setUser(data);
        })
        .catch((error) => {
            console.log("Error getting user:", error);
        });
    }

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

            <div className="activity-container">
                <UserActivity userId={userId} />
            </div>
        </div>
    );
}

export default User;
