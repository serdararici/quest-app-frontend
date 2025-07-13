import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our application.</p>
            <Link to="/posts">View Posts</Link>
        </div>
    );
}

export default Home;