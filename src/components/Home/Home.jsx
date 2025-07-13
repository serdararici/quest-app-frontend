import React, { useState, useEffect } from 'react'
import './Home.scss';
import Navbar from '../Navbar/Navbar';      
import { Link } from "react-router-dom";
import Post from "../Post/Post";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setPostList(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, []);

    if(error) {
        return <div>Error: {error.message}</div>;
    } else if(!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

            <div className="home">
                <h1>Welcome to Home Page</h1>

                <h2>Posts</h2>
                
                <div className="container">
                    <div>
                        {postList.map(post => (
                            <Post title={post.title} text={post.text} key={post.id}></Post>
                        ))}
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default Home;