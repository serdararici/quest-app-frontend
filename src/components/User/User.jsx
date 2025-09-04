import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./User.scss";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { GetWithAuth } from "../../services/HttpService";
import { callWithAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const getUser = async () => {
        try {
            const response = await callWithAuth(GetWithAuth, { url: `/users/${userId}` });
            if (response.success && response.data) {
                setUser(response.data);
                console.log("User data:", response.data);
            } else if (response.error) {
                console.error("Error getting user:", response.error);
                if (response.error.includes("Token") || response.error.includes("401")) {
                    navigate('/auth');
                }
            }
        } catch (err) {
            console.error("Exception getting user:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Token kontrolü yap
        const token = localStorage.getItem("tokenKey");
        const currentUser = localStorage.getItem("currentUser");
        
        if (!token || !currentUser) {
            console.log("Token bulunamadı, login'e yönlendiriliyor");
            navigate('/auth');
            return;
        }

        if (userId) {
            getUser();
        }
    }, [userId, navigate]);

    if (loading) {
        return (
            <div className="user">
                <div style={{textAlign: 'center', padding: '50px'}}>
                    Yükleniyor...
                </div>
            </div>
        );
    }
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
