import React, { useState, useEffect } from 'react';
import './Home.scss';
import Navbar from '../Navbar/Navbar';      
import Post from "../Post/Post";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="home">
                <h1>Welcome to Home Page</h1>
                <h2>Posts</h2>

                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className="container">
                        {postList.map(post => (
                            <Post title={post.title} text={post.text} key={post.id} />
                        ))}
                    </Container>
                </React.Fragment>
            </div>
        );
    }
}

export default Home;
// Note: The Home component fetches posts from the backend and displays them using the Post component.